"use client";

import { Formik, Form } from "formik";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { FormField } from "@/components/molecules/FormField";
import { contactSchema } from "@/lib/validations";

export function ContactForm() {
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  if (done) {
    return (
      <div className="rounded-sm border border-green-200 bg-green-50 p-6 text-green-800">
        Thanks for reaching out. We will get back to you soon.
      </div>
    );
  }

  return (
    <Formik
      initialValues={{ name: "", phone: "", email: "", message: "" }}
      validationSchema={contactSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setError("");
        try {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });
          const data = await res.json();
          if (!res.ok) {
            setError(data.error || "Unable to send message");
            return;
          }
          setDone(true);
        } catch {
          setError("Something went wrong. Please try again.");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
        <Form>
          <FormField
            label="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.name}
            touched={touched.name}
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
            label="Message"
            name="message"
            as="textarea"
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.message}
            touched={touched.message}
          />
          {error ? <p className="mb-3 text-sm text-red-600">{error}</p> : null}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending…" : "Send Message"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
