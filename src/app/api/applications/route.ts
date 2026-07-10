import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mail";

const ALLOWED = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

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
    if (!(resume instanceof File)) {
      return NextResponse.json({ error: "Resume is required" }, { status: 400 });
    }
    if (resume.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Resume must be under 5MB" },
        { status: 400 },
      );
    }
    if (resume.type && !ALLOWED.has(resume.type)) {
      return NextResponse.json(
        { error: "Resume must be PDF or Word document" },
        { status: 400 },
      );
    }

    const job = await prisma.job.findFirst({
      where: { slug: jobSlug, isActive: true },
    });
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    const ext = path.extname(resume.name) || ".pdf";
    const filename = `${randomUUID()}${ext}`;
    const uploadDir = path.join(process.cwd(), "uploads", "resumes");
    await mkdir(uploadDir, { recursive: true });
    const buffer = Buffer.from(await resume.arrayBuffer());
    await writeFile(path.join(uploadDir, filename), buffer);
    const resumePath = path.join("uploads", "resumes", filename);

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

    await sendMail({
      to: process.env.CONTACT_TO || "info@tuppl.com",
      subject: `New application: ${job.title} (${job.jobId})`,
      text: `${name} (${email}) applied for ${job.title}.\nPhone: ${phone}\n\n${coverLetter}`,
    });

    return NextResponse.json({ id: application.id }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to submit application" },
      { status: 500 },
    );
  }
}
