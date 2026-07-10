"use client";

import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { AppLink } from "@/components/atoms/Link";
import { Button } from "@/components/atoms/Button";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/jobs", label: "Jobs" },
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/users", label: "Users" },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-surface">
      <header className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <AppLink href="/">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/logo-web.png"
                  alt="Tuppl"
                  className="h-8 w-auto object-contain"
                />
              </AppLink>
              <span className="text-sm font-semibold text-muted">Admin</span>
            </div>
            <nav className="hidden gap-4 md:flex">
              {links.map((link) => (
                <AppLink
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-semibold ${pathname === link.href ? "text-brand" : "text-ink"}`}
                >
                  {link.label}
                </AppLink>
              ))}
            </nav>
          </div>
          <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>
            Sign out
          </Button>
        </div>
      </header>
      <div className="mx-auto max-w-6xl px-4 py-8">{children}</div>
    </div>
  );
}
