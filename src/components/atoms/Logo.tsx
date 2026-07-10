import { AppLink } from "@/components/atoms/Link";

type Props = {
  className?: string;
  priority?: boolean;
  href?: string;
};

export function Logo({ className = "", href = "/" }: Props) {
  return (
    <AppLink href={href} className={`inline-flex items-center ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/logo-web.png"
        alt="Tuppl"
        width={135}
        height={57}
        className="h-10 w-auto object-contain md:h-12"
      />
    </AppLink>
  );
}
