import Layout from "@/modules/layout/setting/templates";
export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
