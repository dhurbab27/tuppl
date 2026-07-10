import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "outline" | "white" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-brand text-white hover:bg-brand-dark border border-transparent",
  outline:
    "bg-transparent text-brand border border-brand hover:bg-brand hover:text-white",
  white:
    "bg-white text-brand-blue border border-white hover:bg-brand-blue hover:text-white",
  ghost: "bg-transparent text-ink border border-transparent hover:text-brand",
};

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: Props) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-sm px-5 py-2.5 text-sm font-semibold tracking-wide transition ${styles[variant]} disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
