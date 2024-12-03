import Layout from "@/modules/layout/profile/templates";
export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
