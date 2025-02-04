import Layout from "@/modules/layout/baigiang/templates";
export const metadata = { title: "Bài giảng", description: "Bài giảng" };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
