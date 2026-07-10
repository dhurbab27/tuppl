"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/atoms/Button";

export function UserRoleControls({
  id,
  role,
}: {
  id: string;
  role: string;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-wrap gap-2">
      <select
        className="rounded-sm border border-gray-300 px-2 py-1 text-sm"
        defaultValue={role}
        onChange={async (e) => {
          await fetch(`/api/admin/users/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ role: e.target.value }),
          });
          router.refresh();
        }}
      >
        <option value="USER">USER</option>
        <option value="ADMIN">ADMIN</option>
      </select>
      <Button
        variant="ghost"
        className="!px-3 !py-1 text-red-600"
        onClick={async () => {
          if (!confirm("Delete this user?")) return;
          await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
          router.refresh();
        }}
      >
        Delete
      </Button>
    </div>
  );
}
