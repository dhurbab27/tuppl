import { AdminLayout } from "@/components/templates/AdminLayout";
import { prisma } from "@/lib/prisma";
import { ApplicationStatusSelect } from "@/components/organisms/ApplicationStatusSelect";

export const dynamic = "force-dynamic";

export default async function AdminApplicationsPage() {
  const applications = await prisma.application.findMany({
    include: { job: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminLayout>
      <h1 className="mb-6 text-3xl font-extrabold text-ink">Applications</h1>
      <div className="overflow-x-auto rounded-sm border border-black/5 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-surface text-muted">
            <tr>
              <th className="px-4 py-3">Candidate</th>
              <th className="px-4 py-3">Job</th>
              <th className="px-4 py-3">Submitted</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Resume</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-b border-black/5 align-top">
                <td className="px-4 py-3">
                  <div className="font-semibold">{app.name}</div>
                  <div className="text-muted">{app.email}</div>
                  <div className="text-muted">{app.phone}</div>
                </td>
                <td className="px-4 py-3">
                  {app.job.title}
                  <div className="text-xs text-muted">{app.job.jobId}</div>
                </td>
                <td className="px-4 py-3">
                  {app.createdAt.toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <ApplicationStatusSelect id={app.id} status={app.status} />
                </td>
                <td className="px-4 py-3">
                  <a
                    className="font-semibold text-brand"
                    href={`/api/admin/resumes/${app.id}`}
                  >
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {applications.length === 0 ? (
          <p className="p-6 text-muted">No applications yet.</p>
        ) : null}
      </div>
    </AdminLayout>
  );
}
