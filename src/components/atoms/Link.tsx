import Link from "next/link";
import { ComponentProps } from "react";

export function AppLink({
  className = "",
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      className={`transition hover:text-brand ${className}`}
      {...props}
    />
  );
}
