import { AdminLayout } from "@/components/templates/AdminLayout";
import { prisma } from "@/lib/prisma";
import { UserRoleControls } from "@/components/organisms/UserRoleControls";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });

  return (
    <AdminLayout>
      <h1 className="mb-6 text-3xl font-extrabold text-ink">Users</h1>
      <div className="overflow-x-auto rounded-sm border border-black/5 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-surface text-muted">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Joined</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-black/5">
                <td className="px-4 py-3 font-semibold">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.role}</td>
                <td className="px-4 py-3">
                  {user.createdAt.toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <UserRoleControls id={user.id} role={user.role} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
