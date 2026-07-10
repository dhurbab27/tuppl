import { FadeIn } from "@/components/atoms/FadeIn";
import { Heading } from "@/components/atoms/Heading";
import { ServiceCard } from "@/components/molecules/ServiceCard";
import { GetInTouch } from "@/components/organisms/GetInTouch";
import { services } from "@/content/site";

export const metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <>
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <FadeIn>
            <Heading eyebrow="What We Do" align="center">
              Our Services
            </Heading>
            <p className="mx-auto mb-10 max-w-2xl text-center text-body">
              Explore consulting, product, staffing, and technology services
              tailored for ambitious teams.
            </p>
          </FadeIn>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <FadeIn key={service.slug} delay={i * 0.05}>
                <ServiceCard
                  title={service.title}
                  description={service.cardDescription}
                  href={`/services/${service.slug}`}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      <GetInTouch />
    </>
  );
}
