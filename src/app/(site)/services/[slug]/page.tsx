import { notFound } from "next/navigation";
import { FadeIn } from "@/components/atoms/FadeIn";
import { Heading } from "@/components/atoms/Heading";
import { AppLink } from "@/components/atoms/Link";
import { Button } from "@/components/atoms/Button";
import { GetInTouch } from "@/components/organisms/GetInTouch";
import { services, site } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  return { title: service?.title ?? "Service" };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const more = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <div
        className="banner-image"
        style={{ backgroundImage: "url(/images/AI-ML.png)" }}
      >
        <div className="banner-overlay">
          <div className="mx-auto w-full max-w-6xl px-4 py-16">
            <h1 className="banner-title">{service.title}</h1>
            <p className="mt-3 max-w-2xl text-white/90">
              {service.bannerDescription}
            </p>
          </div>
        </div>
      </div>

      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <FadeIn>
            <Heading eyebrow="Our Approach">How we deliver</Heading>
            <p className="max-w-3xl text-sm leading-relaxed text-body">
              {service.approach}
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4">
          <blockquote className="blockquote-home text-center">
            {site.motto}
          </blockquote>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <Heading eyebrow="Capabilities">What We Offer</Heading>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {service.offers.map((offer) => (
              <div
                key={offer}
                className="border-l-4 border-brand bg-white p-4 shadow-sm"
              >
                <p className="text-sm font-semibold text-ink">{offer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-14">
        <div className="mx-auto max-w-6xl px-4">
          <Heading eyebrow="Why Choose Us">Built for outcomes</Heading>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {service.whyChoose.map((item) => (
              <div key={item} className="bg-white p-5 shadow-sm">
                <p className="font-semibold text-brand">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <Heading>More Services</Heading>
          <div className="mt-4 flex flex-wrap gap-3">
            {more.map((s) => (
              <AppLink key={s.slug} href={`/services/${s.slug}`}>
                <Button variant="outline">{s.title}</Button>
              </AppLink>
            ))}
          </div>
        </div>
      </section>

      <GetInTouch />
    </>
  );
}
