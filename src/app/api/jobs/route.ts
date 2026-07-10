import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { JobType } from "@/generated/prisma/client";

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") {
    return null;
  }
  return session;
}

export async function GET() {
  const jobs = await prisma.job.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(jobs);
}

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const job = await prisma.job.create({
      data: {
        title: body.title,
        slug: body.slug,
        jobId: body.jobId,
        description: body.description,
        responsibilities: body.responsibilities,
        qualifications: body.qualifications,
        department: body.department,
        location: body.location,
        type: body.type as JobType,
        isActive: body.isActive ?? true,
      },
    });
    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to create job" }, { status: 400 });
  }
}
