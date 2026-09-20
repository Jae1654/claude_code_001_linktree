"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      // 사생활 보호 모드 등에서 localStorage가 막혀도 토글 자체는 동작해야 한다.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "밝은 화면으로 전환" : "어두운 화면으로 전환"}
      className="fixed right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 text-lg shadow-sm backdrop-blur transition hover:scale-105 dark:border-white/15 dark:bg-white/10"
    >
      {/* 마운트 전에는 아이콘을 비워 하이드레이션 불일치를 피한다. */}
      <span suppressHydrationWarning>{mounted ? (theme === "dark" ? "☀️" : "🌙") : ""}</span>
    </button>
  );
}
