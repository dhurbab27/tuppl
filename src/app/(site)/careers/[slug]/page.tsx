import { notFound } from "next/navigation";
import { FadeIn } from "@/components/atoms/FadeIn";
import { Badge } from "@/components/atoms/Badge";
import { AppLink } from "@/components/atoms/Link";
import { Button } from "@/components/atoms/Button";
import { JobApplyForm } from "@/components/organisms/JobApplyForm";
import { GetInTouch } from "@/components/organisms/GetInTouch";
import { prisma } from "@/lib/prisma";
import { site } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const job = await prisma.job.findUnique({ where: { slug } });
  return { title: job?.title ?? "Job" };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = await prisma.job.findFirst({
    where: { slug, isActive: true },
  });
  if (!job) notFound();

  return (
    <>
      <section className="py-14">
        <div className="mx-auto max-w-4xl px-4">
          <AppLink href="/careers" className="mb-6 inline-block">
            <Button variant="outline">← Back to Careers</Button>
          </AppLink>

          <FadeIn>
            <div className="modal-style mb-4 border-l-4 border-brand bg-white p-6">
              <h1 className="mb-3 text-3xl font-extrabold text-brand">
                {job.title}
              </h1>
              <div className="mb-3 flex flex-wrap gap-2">
                <Badge>Job ID: {job.jobId}</Badge>
                <Badge className="bg-brand-blue/10 text-brand-blue">
                  {job.department}
                </Badge>
                <Badge className="bg-surface text-ink">{job.location}</Badge>
                <Badge className="bg-surface text-ink">
                  {job.type.replaceAll("_", " ")}
                </Badge>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="modal-style mb-4 border-l-4 border-brand bg-white p-6">
              <h3 className="mb-3 text-xl font-bold text-brand">Job Description</h3>
              <p className="leading-relaxed text-body">{job.description}</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="modal-style mb-4 border-l-4 border-brand bg-white p-6">
              <h3 className="mb-3 text-xl font-bold text-brand">
                Key Responsibilities
              </h3>
              <p className="whitespace-pre-line leading-relaxed text-body">
                {job.responsibilities}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="modal-style mb-4 border-l-4 border-brand bg-white p-6">
              <h3 className="mb-3 text-xl font-bold text-brand">
                Required Qualifications
              </h3>
              <p className="whitespace-pre-line leading-relaxed text-body">
                {job.qualifications}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="modal-style mb-8 border-l-4 border-brand bg-white p-6 text-center">
              <h3 className="mb-3 text-xl font-bold text-brand">
                Interested in this position?
              </h3>
              <p className="mb-4 text-body">
                Submit your application below or email{" "}
                <a
                  className="text-brand"
                  href={`mailto:${site.email}?subject=${encodeURIComponent(`Application for ${job.title} - Job ID: ${job.jobId}`)}`}
                >
                  {site.email}
                </a>
                .
              </p>
            </div>
          </FadeIn>

          <JobApplyForm jobSlug={job.slug} jobTitle={job.title} />
        </div>
      </section>
      <GetInTouch title="Hiring questions?" subtitle="Contact our team" />
    </>
  );
}
