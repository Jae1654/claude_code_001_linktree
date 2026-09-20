"use client";

import { useCallback, useEffect, useState } from "react";
import LinkCard from "@/components/LinkCard";
import type { Link } from "@/data/profile";

type Props = {
  links: Link[];
};

export default function LinkList({ links }: Props) {
  // 서버에서 받아온 값. 받기 전에는 비어 있고, 화면에는 0회로 보인다.
  const [counts, setCounts] = useState<Record<string, number>>({});
  // 이번 방문에서 누른 횟수. 조회 응답이 늦게 와도 덮어쓰이지 않도록 따로 센다.
  const [deltas, setDeltas] = useState<Record<string, number>>({});

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/clicks", { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.counts) setCounts(data.counts);
      })
      .catch(() => {
        // 집계를 못 받아도 링크 자체는 동작해야 하므로 0회로 둔다.
      });

    return () => controller.abort();
  }, []);

  const handleClick = useCallback((id: string) => {
    setDeltas((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));

    const body = JSON.stringify({ id });
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
  }, []);

  return (
    <nav className="mt-10 flex flex-col gap-3">
      {links.map((link) => (
        <LinkCard
          key={link.id}
          link={link}
          count={(counts[link.id] ?? 0) + (deltas[link.id] ?? 0)}
          onClick={handleClick}
        />
      ))}
    </nav>
  );
}
