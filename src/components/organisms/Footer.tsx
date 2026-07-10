import { AppLink } from "@/components/atoms/Link";
import { Logo } from "@/components/atoms/Logo";
import { site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer border-t border-black/5 bg-white pt-12 pb-6">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
          </div>
          <div className="md:col-span-8">
            <div className="mb-4 flex flex-wrap gap-5 text-sm font-semibold text-ink">
              <AppLink href="/">Home</AppLink>
              <AppLink href="/about">About Us</AppLink>
              <AppLink href="/careers">Careers</AppLink>
              <AppLink href="/contact">Contact</AppLink>
            </div>
            <div className="mb-3 flex flex-wrap gap-4 text-sm text-body">
              <a href={`tel:${site.phoneTel}`}>{site.phone}</a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-block"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/icons8-linkedin-48.png"
                alt="LinkedIn"
                className="h-8 w-8"
              />
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-black/5 pt-4 text-center text-sm text-muted">
          Copyright © {year} Tuppl. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
