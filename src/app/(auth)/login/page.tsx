"use client";

import { Formik, Form } from "formik";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { AuthLayout } from "@/components/templates/AuthLayout";
import { FormField } from "@/components/molecules/FormField";
import { Button } from "@/components/atoms/Button";
import { AppLink } from "@/components/atoms/Link";
import { loginSchema } from "@/lib/validations";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [error, setError] = useState("");

  return (
    <AuthLayout title="Login">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setError("");
          const res = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
          });
          if (res?.error) {
            setError("Invalid email or password");
            setSubmitting(false);
            return;
          }
          router.push(callbackUrl);
          router.refresh();
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
          <Form>
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
            {error ? <p className="mb-3 text-sm text-red-600">{error}</p> : null}
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Signing in…" : "Sign in"}
            </Button>
          </Form>
        )}
      </Formik>
      <p className="mt-4 text-center text-sm text-body">
        No account?{" "}
        <AppLink href="/register" className="font-semibold text-brand">
          Register
        </AppLink>
      </p>
    </AuthLayout>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<AuthLayout title="Login"><p>Loading…</p></AuthLayout>}>
      <LoginForm />
    </Suspense>
  );
}
