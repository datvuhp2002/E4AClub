import { AppContextProvider } from "@/lib/context/app-context";
import { ModalContextProvider } from "@/lib/context/modal-context";
import { ToastContextProvider } from "@/lib/context/toast-context";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/modules/theme";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppContextProvider>
      <NextThemesProvider
        themes={["standard", "ultimate"]}
        attribute="class"
        defaultTheme={process.env.NEXT_PUBLIC_SETTING_THEME}
      >
        <ThemeProvider theme={theme}>
          <ToastContextProvider>
            <AppRouterCacheProvider>
              <ModalContextProvider>{children}</ModalContextProvider>
            </AppRouterCacheProvider>
          </ToastContextProvider>
        </ThemeProvider>
      </NextThemesProvider>
    </AppContextProvider>
  );
}
