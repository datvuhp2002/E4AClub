import { ModalContextProvider } from "@/lib/context/modal-context";
import { ToastContextProvider } from "@/lib/context/toast-context";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/modules/theme";
import { UserProvider } from "@/lib/context/user-context";
export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      themes={["standard", "ultimate"]}
      attribute="class"
      defaultTheme={process.env.NEXT_PUBLIC_SETTING_THEME}
    >
      <ThemeProvider theme={theme}>
        <UserProvider>
          <ToastContextProvider>
            <AppRouterCacheProvider>
              <ModalContextProvider>{children}</ModalContextProvider>
            </AppRouterCacheProvider>
          </ToastContextProvider>
        </UserProvider>
      </ThemeProvider>
    </NextThemesProvider>
  );
}
