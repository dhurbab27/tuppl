import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mail";

const ALLOWED_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/octet-stream",
]);

const ALLOWED_EXT = new Set([".pdf", ".doc", ".docx"]);

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: "Login required" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const jobSlug = String(form.get("jobSlug") || "");
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim().toLowerCase();
    const phone = String(form.get("phone") || "").trim();
    const coverLetter = String(form.get("coverLetter") || "").trim();
    const resume = form.get("resume");

    if (!jobSlug || !name || !email || !phone || !coverLetter) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const resumeFile =
      resume && typeof resume === "object" && "arrayBuffer" in resume
        ? (resume as File | Blob)
        : null;
    if (!resumeFile) {
      return NextResponse.json({ error: "Resume is required" }, { status: 400 });
    }
    if (resumeFile.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Resume must be under 5MB" },
        { status: 400 },
      );
    }

    const resumeName =
      "name" in resumeFile && typeof resumeFile.name === "string"
        ? resumeFile.name
        : "resume.pdf";
    const ext = path.extname(resumeName).toLowerCase() || ".pdf";
    const mime = resumeFile.type || "";
    if (
      !ALLOWED_EXT.has(ext) ||
      (mime && !ALLOWED_TYPES.has(mime) && mime !== "")
    ) {
      // Allow empty MIME (common in some browsers); still require known extension.
      if (!ALLOWED_EXT.has(ext)) {
        return NextResponse.json(
          { error: "Resume must be PDF or Word document" },
          { status: 400 },
        );
      }
    }

    const job = await prisma.job.findFirst({
      where: { slug: jobSlug, isActive: true },
    });
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const filename = `${randomUUID()}${ext}`;
    const uploadDir = path.join(process.cwd(), "uploads", "resumes");
    try {
      await mkdir(uploadDir, { recursive: true });
      const buffer = Buffer.from(await resumeFile.arrayBuffer());
      await writeFile(path.join(uploadDir, filename), buffer);
    } catch (fsError) {
      console.error("Resume upload failed:", fsError);
      return NextResponse.json(
        {
          error:
            "Unable to save resume. Check that the uploads volume is writable.",
        },
        { status: 500 },
      );
    }
    const resumePath = path.posix.join("uploads", "resumes", filename);

    const application = await prisma.application.create({
      data: {
        jobId: job.id,
        userId: session.user.id,
        name,
        email,
        phone,
        coverLetter,
        resumePath,
      },
    });

    try {
      await sendMail({
        to: process.env.CONTACT_TO || "info@tuppl.com",
        subject: `New application: ${job.title} (${job.jobId})`,
        text: `${name} (${email}) applied for ${job.title}.\nPhone: ${phone}\n\n${coverLetter}`,
      });
    } catch (mailError) {
      // Don't fail the application if mail is misconfigured.
      console.error("Application mail failed:", mailError);
    }

    return NextResponse.json({ id: application.id }, { status: 201 });
  } catch (error) {
    console.error("Application submit failed:", error);
    const message =
      error instanceof Error ? error.message : "Unable to submit application";
    return NextResponse.json(
      {
        error: "Unable to submit application",
        detail: process.env.NODE_ENV === "production" ? undefined : message,
      },
      { status: 500 },
    );
  }
}
