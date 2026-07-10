import { MainLayout } from "@/components/templates/MainLayout";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
