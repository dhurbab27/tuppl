"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { AppLink } from "@/components/atoms/Link";
import { Button } from "@/components/atoms/Button";
import { Logo } from "@/components/atoms/Logo";
import { navLinks } from "@/content/site";

export function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => setFixed(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const showAuth = mounted && status !== "loading";
  const onCareers = pathname.startsWith("/careers");

  return (
    <header className="relative z-50">
      <div
        className={`menu-wrap border-b border-black/5 bg-white transition ${fixed ? "fixed-menu fixed inset-x-0 top-0 shadow-md" : ""}`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Logo />

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-gray-200 text-ink md:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="text-xl">{open ? "×" : "☰"}</span>
          </button>

          <nav
            className={`${open ? "flex" : "hidden"} absolute left-0 right-0 top-full flex-col gap-1 border-b border-black/5 bg-white p-4 shadow-md md:static md:flex md:flex-row md:items-center md:gap-5 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
          >
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <AppLink
                  key={link.href}
                  href={link.href}
                  className={`px-1 py-2 text-sm font-semibold ${active ? "text-brand" : "text-ink"}`}
                >
                  {link.label}
                </AppLink>
              );
            })}
            {showAuth && session?.user ? (
              <>
                {session.user.role === "ADMIN" ? (
                  <AppLink
                    href="/admin"
                    className="px-1 py-2 text-sm font-semibold text-ink"
                  >
                    Admin
                  </AppLink>
                ) : null}
                <Button
                  variant="outline"
                  className="!py-1.5"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Sign out
                </Button>
              </>
            ) : null}
            {showAuth && !session?.user && onCareers ? (
              <AppLink
                href={`/login?callbackUrl=${encodeURIComponent(pathname)}`}
              >
                <Button variant="outline" className="!py-1.5">
                  Login
                </Button>
              </AppLink>
            ) : null}
          </nav>
        </div>
      </div>
      {fixed ? <div className="h-[68px]" /> : null}
    </header>
  );
}
