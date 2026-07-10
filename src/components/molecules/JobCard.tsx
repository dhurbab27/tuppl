import { AppLink } from "@/components/atoms/Link";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";

export type JobCardData = {
  title: string;
  slug: string;
  jobId: string;
  description: string;
  department: string;
  location: string;
  type: string;
};

function excerpt(text: string, words = 20) {
  const parts = text.split(/\s+/);
  if (parts.length <= words) return text;
  return `${parts.slice(0, words).join(" ")}…`;
}

function formatType(type: string) {
  return type.replaceAll("_", " ");
}

export function JobCard({ job, index = 0 }: { job: JobCardData; index?: number }) {
  return (
    <article
      className="job-card modal-style flex h-full flex-col border-l-4 border-brand bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="mb-3 flex flex-wrap gap-2">
        <Badge>{job.jobId}</Badge>
        <Badge className="bg-brand-blue/10 text-brand-blue">{job.department}</Badge>
      </div>
      <h3 className="mb-2 text-xl font-bold text-brand">{job.title}</h3>
      <p className="mb-2 text-sm text-muted">
        {job.location} · {formatType(job.type)}
      </p>
      <p className="mb-6 flex-1 text-sm leading-relaxed text-body">
        {excerpt(job.description)}
      </p>
      <AppLink href={`/careers/${job.slug}`}>
        <Button className="w-full">View Details</Button>
      </AppLink>
    </article>
  );
}
