"use client";

import { Formik, Form } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthLayout } from "@/components/templates/AuthLayout";
import { FormField } from "@/components/molecules/FormField";
import { Button } from "@/components/atoms/Button";
import { AppLink } from "@/components/atoms/Link";
import { registerSchema } from "@/lib/validations";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  return (
    <AuthLayout title="Create account">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={registerSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setError("");
          try {
            const res = await fetch("/api/auth/register", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                name: values.name,
                email: values.email,
                password: values.password,
              }),
            });
            const data = await res.json();
            if (!res.ok) {
              setError(data.error || "Unable to register");
              return;
            }
            const login = await signIn("credentials", {
              email: values.email,
              password: values.password,
              redirect: false,
            });
            if (login?.error) {
              router.push("/login");
              return;
            }
            router.push("/");
            router.refresh();
          } catch {
            setError("Something went wrong");
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
              label="Password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.password}
              touched={touched.password}
            />
            <FormField
              label="Confirm password"
              name="confirmPassword"
              type="password"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />
            {error ? <p className="mb-3 text-sm text-red-600">{error}</p> : null}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating…" : "Register"}
            </Button>
          </Form>
        )}
      </Formik>
      <p className="mt-4 text-center text-sm text-body">
        Already have an account?{" "}
        <AppLink href="/login" className="font-semibold text-brand">
          Login
        </AppLink>
      </p>
    </AuthLayout>
  );
}
