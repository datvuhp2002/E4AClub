import Layout from "@/modules/layout/teacher/templates";
export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
