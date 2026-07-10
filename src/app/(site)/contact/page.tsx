import { FadeIn } from "@/components/atoms/FadeIn";
import { Heading } from "@/components/atoms/Heading";
import { ContactForm } from "@/components/organisms/ContactForm";
import { site } from "@/content/site";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <section className="py-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-12">
        <FadeIn className="md:col-span-5">
          <Heading eyebrow="Contact">Get in Touch</Heading>
          <p className="mb-6 text-sm leading-relaxed text-body">
            Headquartered in {site.address}, Tuppl partners with clients across
            multiple countries. Tell us about your project, staffing need, or
            career interest.
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/contact.png"
            alt="Contact Tuppl"
            className="mb-6 w-full object-cover"
          />
          <div className="space-y-3 bg-brand-blue p-6 text-white">
            <p>
              <a href={`tel:${site.phoneTel}`}>{site.phone}</a>
            </p>
            <p>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </p>
            <p>
              <a href={`mailto:${site.careersEmail}`}>{site.careersEmail}</a>
            </p>
          </div>
        </FadeIn>
        <FadeIn className="md:col-span-7" delay={0.1}>
          <div className="rounded-sm border border-black/5 bg-white p-6 shadow-sm">
            <ContactForm />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
