import { Logo } from "@/components/atoms/Logo";

export function AuthLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-12">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>
        <div className="rounded-sm border border-black/5 bg-white p-8 shadow-sm">
          <h1 className="mb-6 text-center text-2xl font-bold text-ink">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
}
