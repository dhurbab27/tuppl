"use client";

import { Input, Textarea, Select } from "@/components/atoms/Input";

type Props = {
  label: string;
  name: string;
  type?: string;
  as?: "input" | "textarea" | "select";
  value?: string;
  onChange?: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  onBlur?: (
    e: React.FocusEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  error?: string;
  touched?: boolean;
  children?: React.ReactNode;
  accept?: string;
};

export function FormField({
  label,
  name,
  type = "text",
  as = "input",
  value,
  onChange,
  onBlur,
  error,
  touched,
  children,
  accept,
}: Props) {
  return (
    <label className="mb-4 block">
      <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>
      {as === "textarea" ? (
        <Textarea
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      ) : as === "select" ? (
        <Select name={name} value={value} onChange={onChange} onBlur={onBlur}>
          {children}
        </Select>
      ) : (
        <Input
          name={name}
          type={type}
          value={type === "file" ? undefined : value}
          onChange={onChange}
          onBlur={onBlur}
          accept={accept}
        />
      )}
      {touched && error ? (
        <span className="mt-1 block text-xs text-red-600">{error}</span>
      ) : null}
    </label>
  );
}
