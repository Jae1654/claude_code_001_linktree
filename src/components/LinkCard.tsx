"use client";

import type { Link } from "@/data/profile";

type Props = {
  link: Link;
  count: number;
  onClick: (id: string) => void;
};

export default function LinkCard({ link, count, onClick }: Props) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => onClick(link.id)}
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
      <span
        aria-label={`클릭 ${count}회`}
        className="shrink-0 rounded-full bg-neutral-100 px-2.5 py-1 text-xs tabular-nums text-neutral-500 dark:bg-white/10 dark:text-neutral-400"
      >
        {count.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
