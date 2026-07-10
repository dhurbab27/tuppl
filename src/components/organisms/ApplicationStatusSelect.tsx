"use client";

import { useRouter } from "next/navigation";

const statuses = ["PENDING", "REVIEWED", "REJECTED", "HIRED"] as const;

export function ApplicationStatusSelect({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const router = useRouter();

  return (
    <select
      className="rounded-sm border border-gray-300 px-2 py-1 text-sm"
      defaultValue={status}
      onChange={async (e) => {
        await fetch(`/api/applications/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: e.target.value }),
        });
        router.refresh();
      }}
    >
      {statuses.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
