import { FadeIn } from "@/components/atoms/FadeIn";
import { Heading } from "@/components/atoms/Heading";
import { Button } from "@/components/atoms/Button";
import { AppLink } from "@/components/atoms/Link";
import { ServiceCard } from "@/components/molecules/ServiceCard";
import { StatCounter } from "@/components/molecules/StatCounter";
import { HeroCarousel } from "@/components/organisms/HeroCarousel";
import { ClientMarquee } from "@/components/organisms/ClientMarquee";
import { GetInTouch } from "@/components/organisms/GetInTouch";
import {
  homeCareersTeaser,
  homeWhoWeAre,
  journeyStats,
  services,
  site,
} from "@/content/site";

export default function HomePage() {
  return (
    <>
      <HeroCarousel />

      <section className="bg-surface">
        <div className="mx-auto max-w-6xl px-4">
          <FadeIn>
            <blockquote className="blockquote-home text-center">
              {site.motto}
            </blockquote>
          </FadeIn>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <FadeIn>
            <Heading eyebrow="Why Choose Us">
              Explore a Spectrum of Premier Services
            </Heading>
          </FadeIn>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((service, i) => (
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

      <section className="bg-surface py-14">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-12">
          <FadeIn className="md:col-span-7">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/Banner-about3.jpg"
              alt="Who we are"
              className="w-full object-cover"
            />
          </FadeIn>
          <FadeIn className="md:col-span-5" delay={0.1}>
            <Heading eyebrow="Who We Are">A Data-driven Tech Company</Heading>
            <p className="mb-6 text-sm leading-relaxed text-body">
              {homeWhoWeAre}
            </p>
            <AppLink href="/about">
              <Button variant="outline">Know More →</Button>
            </AppLink>
          </FadeIn>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <FadeIn>
            <Heading>
              Trusted by <span className="text-brand">Industry Leaders and Fortune 500&apos;s</span>
            </Heading>
          </FadeIn>
          <ClientMarquee />
          <div className="mt-10 grid items-center gap-8 md:grid-cols-12">
            <FadeIn className="md:col-span-7">
              <Heading eyebrow="Careers">Unlock Your Potential</Heading>
              <p className="mb-6 text-sm leading-relaxed text-body">
                {homeCareersTeaser}
              </p>
              <AppLink href="/careers">
                <Button>Find Job →</Button>
              </AppLink>
            </FadeIn>
            <FadeIn className="md:col-span-5" delay={0.1}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/client-section.jpg"
                alt="Careers at Tuppl"
                className="w-full object-cover"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="bg-surface py-14">
        <div className="mx-auto max-w-6xl px-4">
          <FadeIn>
            <Heading>Our Journey So Far</Heading>
          </FadeIn>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {journeyStats.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      <GetInTouch />
    </>
  );
}
