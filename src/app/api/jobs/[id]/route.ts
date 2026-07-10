import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { JobType } from "@/generated/prisma/client";

type Ctx = { params: Promise<{ id: string }> };

async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== "ADMIN") return null;
  return session;
}

export async function PATCH(request: Request, context: Ctx) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  try {
    const body = await request.json();
    const job = await prisma.job.update({
      where: { id },
      data: {
        ...(body.title !== undefined ? { title: body.title } : {}),
        ...(body.slug !== undefined ? { slug: body.slug } : {}),
        ...(body.jobId !== undefined ? { jobId: body.jobId } : {}),
        ...(body.description !== undefined
          ? { description: body.description }
          : {}),
        ...(body.responsibilities !== undefined
          ? { responsibilities: body.responsibilities }
          : {}),
        ...(body.qualifications !== undefined
          ? { qualifications: body.qualifications }
          : {}),
        ...(body.department !== undefined
          ? { department: body.department }
          : {}),
        ...(body.location !== undefined ? { location: body.location } : {}),
        ...(body.type !== undefined ? { type: body.type as JobType } : {}),
        ...(body.isActive !== undefined ? { isActive: body.isActive } : {}),
      },
    });
    return NextResponse.json(job);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Unable to update job" }, { status: 400 });
  }
}

export async function DELETE(_request: Request, context: Ctx) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  await prisma.job.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
