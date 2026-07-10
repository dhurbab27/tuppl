import { prisma } from "@/lib/prisma";
import { CareersListing } from "@/components/organisms/CareersListing";

export const metadata = { title: "Careers" };
export const dynamic = "force-dynamic";

export default async function CareersPage() {
  const jobs = await prisma.job.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <CareersListing
      jobs={jobs.map((job) => ({
        title: job.title,
        slug: job.slug,
        jobId: job.jobId,
        description: job.description,
        department: job.department,
        location: job.location,
        type: job.type,
      }))}
    />
  );
}
