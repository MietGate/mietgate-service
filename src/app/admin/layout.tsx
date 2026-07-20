import type { Metadata } from "next";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
};


