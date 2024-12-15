"use client";
import Header from "./header";
import styles from "./Layout.module.scss";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
export const metadata = {
  title: "Bài giảng",
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
        <Header />
        <div
          className={`${styles.wrapper_body}`}
          style={{
            backgroundImage: ` url(${imageBackground})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className={`${styles.body} `}>{children}</div>
        </div>
      </div>
    </div>
  );
}
