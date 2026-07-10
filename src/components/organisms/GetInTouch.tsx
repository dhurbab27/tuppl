import { AppLink } from "@/components/atoms/Link";
import { Button } from "@/components/atoms/Button";

export function GetInTouch({
  title = "Get in touch",
  subtitle = "with Us",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="getintouch-section mb-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-start justify-between gap-4 bg-brand-blue px-6 py-8 text-white md:flex-row md:items-center md:px-10">
          <h3 className="text-2xl font-bold md:text-3xl">
            <span className="block text-white/90">{title}</span>
            {subtitle}
          </h3>
          <AppLink href="/contact">
            <Button variant="white">Contact Us →</Button>
          </AppLink>
        </div>
      </div>
    </section>
  );
}
