"use client";

import { Select } from "@/components/atoms/Input";

export type JobFiltersState = {
  department: string;
  location: string;
  type: string;
};

export function JobFilters({
  departments,
  locations,
  value,
  onChange,
}: {
  departments: string[];
  locations: string[];
  value: JobFiltersState;
  onChange: (next: JobFiltersState) => void;
}) {
  return (
    <div className="mb-8 grid gap-4 rounded-sm bg-surface p-4 md:grid-cols-3">
      <label className="block text-sm">
        <span className="mb-1 block font-semibold text-ink">Department</span>
        <Select
          value={value.department}
          onChange={(e) => onChange({ ...value, department: e.target.value })}
        >
          <option value="">All departments</option>
          {departments.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </Select>
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-semibold text-ink">Location</span>
        <Select
          value={value.location}
          onChange={(e) => onChange({ ...value, location: e.target.value })}
        >
          <option value="">All locations</option>
          {locations.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </Select>
      </label>
      <label className="block text-sm">
        <span className="mb-1 block font-semibold text-ink">Type</span>
        <Select
          value={value.type}
          onChange={(e) => onChange({ ...value, type: e.target.value })}
        >
          <option value="">All types</option>
          <option value="FULL_TIME">Full time</option>
          <option value="CONTRACT">Contract</option>
          <option value="REMOTE">Remote</option>
        </Select>
      </label>
    </div>
  );
}
