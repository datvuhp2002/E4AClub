"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div
      className={`${styles.toggle_switch}`}
      onClick={() => setTheme(theme === "standard" ? "ultimate" : "standard")}
    >
      <div
        className={`${styles.switch} ${theme === "standard" ? styles.standard : styles.ultimate} d-flex align-items-center justify-content-between p-2`}
      >
        <div>
          <FontAwesomeIcon icon={faSun} style={{ color: "#fff" }} />
        </div>
        <div>
          <FontAwesomeIcon icon={faMoon} style={{ color: "#fff" }} />
        </div>
      </div>
      <span
        className={`${styles.switch_label} ${theme === "standard" ? styles.standard : styles.ultimate}`}
      >
        {theme === "standard" ? "Standard Theme" : "Ultimate Theme"}
      </span>
    </div>
  );
}
