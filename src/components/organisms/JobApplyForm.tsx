"use client";

import { Formik, Form } from "formik";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { FormField } from "@/components/molecules/FormField";
import { AppLink } from "@/components/atoms/Link";
import { applySchema } from "@/lib/validations";

export function JobApplyForm({
  jobSlug,
  jobTitle,
}: {
  jobSlug: string;
  jobTitle: string;
}) {
  const { data: session, status } = useSession();
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  if (status === "loading") {
    return <p className="text-sm text-muted">Checking session…</p>;
  }

  if (!session?.user) {
    return (
      <div className="rounded-sm border border-brand/20 bg-brand/5 p-6 text-center">
        <p className="mb-4 text-body">
          Please log in to apply for <strong>{jobTitle}</strong>.
        </p>
        <AppLink href={`/login?callbackUrl=/careers/${jobSlug}`}>
          <Button>Login to Apply</Button>
        </AppLink>
      </div>
    );
  }

  if (success) {
    return (
      <div className="rounded-sm border border-green-200 bg-green-50 p-6 text-center text-green-800">
        Application submitted. Our team will review it shortly.
      </div>
    );
  }

  return (
    <Formik
      initialValues={{
        name: session.user.name ?? "",
        email: session.user.email ?? "",
        phone: "",
        coverLetter: "",
        resume: null as File | null,
      }}
      validationSchema={applySchema}
      onSubmit={async (values, { setSubmitting }) => {
        setServerError("");
        try {
          const body = new FormData();
          body.append("jobSlug", jobSlug);
          body.append("name", values.name);
          body.append("email", values.email);
          body.append("phone", values.phone);
          body.append("coverLetter", values.coverLetter);
          if (values.resume) body.append("resume", values.resume);

          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 60_000);
          const res = await fetch("/api/applications", {
            method: "POST",
            body,
            signal: controller.signal,
          });
          clearTimeout(timeout);
          const data = await res.json();
          if (!res.ok) {
            setServerError(data.error || "Unable to submit application");
            return;
          }
          setSuccess(true);
        } catch (err) {
          setServerError(
            err instanceof Error && err.name === "AbortError"
              ? "Request timed out. Please try again."
              : "Something went wrong. Please try again.",
          );
        } finally {
          setSubmitting(false);
        }
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
        <Form className="modal-style border-l-4 border-brand bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-xl font-bold text-brand">
            Apply for {jobTitle}
          </h3>
          <FormField
            label="Full name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            touched={touched.name}
          />
          <FormField
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
          />
          <FormField
            label="Phone"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.phone}
            touched={touched.phone}
          />
          <FormField
            label="Cover letter"
            name="coverLetter"
            as="textarea"
            value={values.coverLetter}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.coverLetter}
            touched={touched.coverLetter}
          />
          <FormField
            label="Resume (PDF, DOC, DOCX)"
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf"
            onChange={(e) => {
              const input = e.target as HTMLInputElement;
              setFieldValue("resume", input.files?.[0] ?? null);
            }}
            error={errors.resume as string | undefined}
            touched={Boolean(touched.resume)}
          />
          {serverError ? (
            <p className="mb-3 text-sm text-red-600">{serverError}</p>
          ) : null}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting…" : "Submit Application"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
