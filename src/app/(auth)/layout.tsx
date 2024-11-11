import { ToastContextProvider } from "@/lib/context/toast-context";
import Layout from "@/modules/layout/login/templates";
export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastContextProvider>
      <Layout>{children}</Layout>
    </ToastContextProvider>
  );
}
