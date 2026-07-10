import { AdminLayout } from "@/components/templates/AdminLayout";
import { prisma } from "@/lib/prisma";
import { AppLink } from "@/components/atoms/Link";

export const dynamic = "force-dynamic";

export default async function AdminHomePage() {
  const [jobs, applications, users, messages] = await Promise.all([
    prisma.job.count(),
    prisma.application.count(),
    prisma.user.count(),
    prisma.contactMessage.count(),
  ]);

  const cards = [
    { label: "Jobs", value: jobs, href: "/admin/jobs" },
    { label: "Applications", value: applications, href: "/admin/applications" },
    { label: "Users", value: users, href: "/admin/users" },
    { label: "Contact messages", value: messages, href: "/admin/applications" },
  ];

  return (
    <AdminLayout>
      <h1 className="mb-6 text-3xl font-extrabold text-ink">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <AppLink
            key={card.label}
            href={card.href}
            className="rounded-sm border border-black/5 bg-white p-6 shadow-sm hover:border-brand"
          >
            <p className="text-sm text-muted">{card.label}</p>
            <p className="mt-2 text-3xl font-bold text-brand">{card.value}</p>
          </AppLink>
        ))}
      </div>
    </AdminLayout>
  );
}
