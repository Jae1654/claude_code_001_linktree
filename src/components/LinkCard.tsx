"use client";

import { useState } from "react";
import type { Link } from "@/data/profile";

type Props = {
  link: Link;
  initialCount?: number;
};

export default function LinkCard({ link, initialCount }: Props) {
  const [count, setCount] = useState(initialCount);

  function handleClick() {
    // 낙관적 업데이트 후 백그라운드로 집계. 실패해도 이동은 막지 않는다.
    setCount((prev) => (typeof prev === "number" ? prev + 1 : prev));

    const body = JSON.stringify({ id: link.id });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/clicks", new Blob([body], { type: "application/json" }));
      return;
    }
    fetch("/api/clicks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  }

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="group flex items-center gap-4 rounded-2xl border border-black/5 bg-white px-5 py-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 dark:border-white/10 dark:bg-white/[0.06] dark:hover:bg-white/[0.1]"
    >
      <span aria-hidden className="text-2xl">
        {link.emoji}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-semibold">{link.title}</span>
        {link.description && (
          <span className="block truncate text-xs text-neutral-500 dark:text-neutral-400">
            {link.description}
          </span>
        )}
      </span>
      {typeof count === "number" && (
        <span className="shrink-0 rounded-full bg-neutral-100 px-2.5 py-1 text-xs tabular-nums text-neutral-500 dark:bg-white/10 dark:text-neutral-400">
          {count.toLocaleString("ko-KR")}
        </span>
      )}
    </a>
  );
}
