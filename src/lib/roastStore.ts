import type { Roast } from "./types";

const KEY_PREFIX = "slopscore:roast:";

export function saveRoast(roast: Roast) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(KEY_PREFIX + roast.id, JSON.stringify(roast));
  } catch {
    /* storage full / unavailable — non-fatal for a prototype */
  }
}

export function loadRoast(id: string): Roast | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(KEY_PREFIX + id);
    return raw ? (JSON.parse(raw) as Roast) : null;
  } catch {
    return null;
  }
}

export function newRoastId() {
  return Math.random().toString(36).slice(2, 8);
}
