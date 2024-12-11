import Layout from "@/modules/layout/main/templates";
export const metadata = { title: "homepage", description: "This is homepage" };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
