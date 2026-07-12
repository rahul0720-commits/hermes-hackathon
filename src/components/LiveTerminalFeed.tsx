"use client";

import { useEffect, useState } from "react";

export default function LiveTerminalFeed({
  seed,
  pool,
  intervalMs = 3000,
  max = 6,
}: {
  seed: string[];
  pool: string[];
  intervalMs?: number;
  max?: number;
}) {
  const [lines, setLines] = useState(seed);

  useEffect(() => {
    const id = setInterval(() => {
      const next = pool[Math.floor(Math.random() * pool.length)];
      setLines((l) => [...l.slice(-(max - 1)), next]);
    }, intervalMs);
    return () => clearInterval(id);
  }, [pool, intervalMs, max]);

  return (
    <>
      {lines.map((l, i) => (
        <p key={i}>{l}</p>
      ))}
    </>
  );
}
