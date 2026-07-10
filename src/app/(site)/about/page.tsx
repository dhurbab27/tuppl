import { FadeIn } from "@/components/atoms/FadeIn";
import { Heading } from "@/components/atoms/Heading";
import { Button } from "@/components/atoms/Button";
import { AppLink } from "@/components/atoms/Link";
import { ClientMarquee } from "@/components/organisms/ClientMarquee";
import { GetInTouch } from "@/components/organisms/GetInTouch";
import { aboutContent, site } from "@/content/site";

export const metadata = { title: "About" };

export default function AboutPage() {
  const { whoWeAre, coreValues, partner, workWithUs, referrals } = aboutContent;

  return (
    <>
      <div
        className="banner-image"
        style={{ backgroundImage: "url(/images/AI-ML.png)" }}
      >
        <div className="banner-overlay">
          <div className="mx-auto w-full max-w-6xl px-4 py-16">
            <h1 className="banner-title">{aboutContent.bannerTitle}</h1>
            <p className="mt-3 max-w-2xl text-white/90">
              {aboutContent.bannerSubtitle}
            </p>
          </div>
        </div>
      </div>

      <section className="py-14">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-12">
          <FadeIn className="md:col-span-7">
            <Heading eyebrow={whoWeAre.eyebrow}>{whoWeAre.title}</Heading>
            <p className="text-sm leading-relaxed text-body">{whoWeAre.body}</p>
          </FadeIn>
          <FadeIn className="md:col-span-5" delay={0.1}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={whoWeAre.image} alt="" className="w-full object-cover" />
          </FadeIn>
        </div>
      </section>

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
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-12">
          <FadeIn className="md:col-span-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coreValues.image} alt="" className="w-full object-cover" />
          </FadeIn>
          <FadeIn className="md:col-span-8" delay={0.1}>
            <Heading eyebrow={coreValues.eyebrow}>{coreValues.title}</Heading>
            <p className="text-sm leading-relaxed text-body">{coreValues.body}</p>
          </FadeIn>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-6xl px-4">
          <Heading>
            Trusted by <span className="text-brand">Industry Leaders and Fortune 500&apos;s</span>
          </Heading>
          <ClientMarquee />
        </div>
      </section>

      <section className="bg-surface py-14">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-12">
          <FadeIn className="md:col-span-7">
            <Heading eyebrow={partner.eyebrow}>{partner.title}</Heading>
            <p className="mb-6 text-sm leading-relaxed text-body">{partner.body}</p>
            <AppLink href="/contact">
              <Button>Partner With Us →</Button>
            </AppLink>
          </FadeIn>
          <FadeIn className="md:col-span-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={partner.image} alt="" className="w-full object-cover" />
          </FadeIn>
        </div>
      </section>

      <GetInTouch />

      <section className="pb-14">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-2">
          <FadeIn className="rounded-sm bg-surface p-8">
            <Heading eyebrow={workWithUs.eyebrow}>{workWithUs.title}</Heading>
            <p className="mb-6 text-sm text-body">{workWithUs.body}</p>
            <AppLink href="/careers">
              <Button variant="outline">View Careers →</Button>
            </AppLink>
          </FadeIn>
          <FadeIn delay={0.1} className="rounded-sm bg-surface p-8">
            <Heading eyebrow={referrals.eyebrow}>{referrals.title}</Heading>
            <p className="mb-6 text-sm text-body">{referrals.body}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={referrals.image} alt="" className="mb-4 max-h-40 object-contain" />
            <AppLink href="/contact">
              <Button variant="outline">Get in Touch →</Button>
            </AppLink>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
