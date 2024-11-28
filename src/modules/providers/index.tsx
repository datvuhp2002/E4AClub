import { ModalContextProvider } from "@/lib/context/modal-context";
import { ToastContextProvider } from "@/lib/context/toast-context";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/modules/theme";
import { SessionProvider } from "next-auth/react";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      themes={["standard", "ultimate"]}
      attribute="class"
      defaultTheme={process.env.NEXT_PUBLIC_SETTING_THEME}
    >
      <SessionProvider>
        <ThemeProvider theme={theme}>
          <ToastContextProvider>
            <AppRouterCacheProvider>
              <ModalContextProvider>{children}</ModalContextProvider>
            </AppRouterCacheProvider>
          </ToastContextProvider>
        </ThemeProvider>
      </SessionProvider>
    </NextThemesProvider>
  );
}
