"use client";

import { Formik, Form } from "formik";
import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/templates/AdminLayout";
import { Button } from "@/components/atoms/Button";
import { FormField } from "@/components/molecules/FormField";
import { jobSchema } from "@/lib/validations";

type Job = {
  id: string;
  title: string;
  slug: string;
  jobId: string;
  department: string;
  location: string;
  type: string;
  isActive: boolean;
  description: string;
  responsibilities: string;
  qualifications: string;
};

const empty = {
  title: "",
  slug: "",
  jobId: "",
  department: "Engineering",
  location: "Irving, TX",
  type: "FULL_TIME",
  description: "",
  responsibilities: "",
  qualifications: "",
  isActive: true,
};

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editing, setEditing] = useState<Job | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function load() {
    const res = await fetch("/api/jobs");
    setJobs(await res.json());
  }

  useEffect(() => {
    void load();
  }, []);

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-extrabold text-ink">Jobs</h1>
        <Button
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
        >
          New job
        </Button>
      </div>

      {showForm ? (
        <div className="mb-8 rounded-sm border border-black/5 bg-white p-6">
          <h2 className="mb-4 text-xl font-bold">
            {editing ? "Edit job" : "Create job"}
          </h2>
          <Formik
            enableReinitialize
            initialValues={
              editing
                ? {
                    title: editing.title,
                    slug: editing.slug,
                    jobId: editing.jobId,
                    department: editing.department,
                    location: editing.location,
                    type: editing.type,
                    description: editing.description,
                    responsibilities: editing.responsibilities,
                    qualifications: editing.qualifications,
                    isActive: editing.isActive,
                  }
                : empty
            }
            validationSchema={jobSchema}
            onSubmit={async (values, { setSubmitting }) => {
              const url = editing ? `/api/jobs/${editing.id}` : "/api/jobs";
              const method = editing ? "PATCH" : "POST";
              await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
              });
              setShowForm(false);
              setEditing(null);
              await load();
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              setFieldValue,
              isSubmitting,
            }) => (
              <Form className="grid gap-2 md:grid-cols-2">
                <FormField
                  label="Title"
                  name="title"
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.title}
                  touched={touched.title}
                />
                <FormField
                  label="Slug"
                  name="slug"
                  value={values.slug}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.slug}
                  touched={touched.slug}
                />
                <FormField
                  label="Job ID"
                  name="jobId"
                  value={values.jobId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.jobId}
                  touched={touched.jobId}
                />
                <FormField
                  label="Department"
                  name="department"
                  value={values.department}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.department}
                  touched={touched.department}
                />
                <FormField
                  label="Location"
                  name="location"
                  value={values.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.location}
                  touched={touched.location}
                />
                <FormField
                  label="Type"
                  name="type"
                  as="select"
                  value={values.type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.type}
                  touched={touched.type}
                >
                  <option value="FULL_TIME">Full time</option>
                  <option value="CONTRACT">Contract</option>
                  <option value="REMOTE">Remote</option>
                </FormField>
                <div className="md:col-span-2">
                  <FormField
                    label="Description"
                    name="description"
                    as="textarea"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.description}
                    touched={touched.description}
                  />
                </div>
                <div className="md:col-span-2">
                  <FormField
                    label="Responsibilities"
                    name="responsibilities"
                    as="textarea"
                    value={values.responsibilities}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.responsibilities}
                    touched={touched.responsibilities}
                  />
                </div>
                <div className="md:col-span-2">
                  <FormField
                    label="Qualifications"
                    name="qualifications"
                    as="textarea"
                    value={values.qualifications}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.qualifications}
                    touched={touched.qualifications}
                  />
                </div>
                <label className="mb-4 flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={values.isActive}
                    onChange={(e) => setFieldValue("isActive", e.target.checked)}
                  />
                  Active
                </label>
                <div className="md:col-span-2 flex gap-3">
                  <Button type="submit" disabled={isSubmitting}>
                    {editing ? "Save" : "Create"}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setShowForm(false);
                      setEditing(null);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      ) : null}

      <div className="overflow-x-auto rounded-sm border border-black/5 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-surface text-muted">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Dept</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id} className="border-b border-black/5">
                <td className="px-4 py-3 font-semibold">{job.title}</td>
                <td className="px-4 py-3">{job.jobId}</td>
                <td className="px-4 py-3">{job.department}</td>
                <td className="px-4 py-3">
                  {job.isActive ? "Active" : "Inactive"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      className="!px-3 !py-1"
                      onClick={() => {
                        setEditing(job);
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      className="!px-3 !py-1"
                      onClick={async () => {
                        await fetch(`/api/jobs/${job.id}`, {
                          method: "PATCH",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ isActive: !job.isActive }),
                        });
                        await load();
                      }}
                    >
                      {job.isActive ? "Deactivate" : "Activate"}
                    </Button>
                    <Button
                      variant="ghost"
                      className="!px-3 !py-1 text-red-600"
                      onClick={async () => {
                        if (!confirm("Delete this job?")) return;
                        await fetch(`/api/jobs/${job.id}`, { method: "DELETE" });
                        await load();
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
