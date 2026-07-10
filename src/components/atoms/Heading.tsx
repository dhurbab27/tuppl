type Props = {
  as?: "h1" | "h2" | "h3" | "h4";
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
};

export function Heading({
  as: Tag = "h2",
  eyebrow,
  children,
  className = "",
  align = "left",
}: Props) {
  return (
    <Tag
      className={`section-head mb-4 font-bold text-ink ${align === "center" ? "text-center" : ""} ${className}`}
    >
      {eyebrow ? <span className="block text-brand">{eyebrow}</span> : null}
      {children}
    </Tag>
  );
}
