"use client";

import { useMemo, useState } from "react";
import { FadeIn } from "@/components/atoms/FadeIn";
import { Heading } from "@/components/atoms/Heading";
import { JobCard, JobCardData } from "@/components/molecules/JobCard";
import {
  JobFilters,
  JobFiltersState,
} from "@/components/organisms/JobFilters";
import { GetInTouch } from "@/components/organisms/GetInTouch";

export function CareersListing({ jobs }: { jobs: JobCardData[] }) {
  const [filters, setFilters] = useState<JobFiltersState>({
    department: "",
    location: "",
    type: "",
  });

  const departments = useMemo(
    () => [...new Set(jobs.map((j) => j.department))].sort(),
    [jobs],
  );
  const locations = useMemo(
    () => [...new Set(jobs.map((j) => j.location))].sort(),
    [jobs],
  );

  const filtered = jobs.filter((job) => {
    if (filters.department && job.department !== filters.department) return false;
    if (filters.location && job.location !== filters.location) return false;
    if (filters.type && job.type !== filters.type) return false;
    return true;
  });

  return (
    <>
      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <FadeIn>
            <Heading align="center" className="main-color !text-brand">
              Join Our Team
            </Heading>
            <p className="mx-auto mb-8 max-w-2xl text-center text-lg text-body">
              Discover exciting career opportunities at Tuppl and be part of our
              innovative team.
            </p>
          </FadeIn>

          <JobFilters
            departments={departments}
            locations={locations}
            value={filters}
            onChange={setFilters}
          />

          {filtered.length === 0 ? (
            <p className="py-12 text-center text-muted">
              No roles match these filters. Try clearing a filter.
            </p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((job, index) => (
                <FadeIn key={job.slug} delay={index * 0.05}>
                  <JobCard job={job} index={index} />
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>
      <GetInTouch title="Questions about careers?" subtitle="Talk to us" />
    </>
  );
}
