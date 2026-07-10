import { AppLink } from "@/components/atoms/Link";
import { Button } from "@/components/atoms/Button";

export function ServiceCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <article className="service-card mb-4 flex h-full flex-col bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="card-icon pb-3 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/card-icon-img.jpg"
          alt=""
          className="mx-auto h-14 w-14 object-contain"
        />
      </div>
      <h3 className="service-card-head mb-3 text-lg font-bold text-ink">{title}</h3>
      <p className="service-card-body card-content mb-6 flex-1 text-sm leading-relaxed text-body">
        {description}
      </p>
      <div className="text-center">
        <AppLink href={href}>
          <Button variant="outline" className="hvr-bounce-to-right">
            Learn More →
          </Button>
        </AppLink>
      </div>
    </article>
  );
}
