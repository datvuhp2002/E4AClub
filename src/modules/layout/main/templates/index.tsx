"use client";
import Header from "./header";
import Footer from "./footer";
import styles from "./Layout.module.scss";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
export const metadata = {
  title: "Dang ky the",
};
export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  const [imageBackground, setImageBackground] = useState(
    `${process.env.FILE_URL}images/public-background.jpg`
  );
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    theme === "standard"
      ? setImageBackground(`${process.env.FILE_URL}svg/Banner.svg`)
      : setImageBackground(
          `${process.env.FILE_URL}images/red-theme-background.jpg`
        );
  }, [theme]);
  if (!mounted) return null;
  return (
    <div lang="en">
      <div>
        <Header theme={theme} />
        <Sidebar />
        <div
          className={`${styles.wrapper_body}`}
          style={{
            backgroundImage: ` url(${imageBackground})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className={`${styles.body} pb-5 container`}>{children}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
