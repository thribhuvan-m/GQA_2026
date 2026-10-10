"use client";

import { useEffect } from "react";

/**
 * Marks the document once the first-load intro has played, so the curtain is
 * skipped and hero entrance delays shorten on later client-side navigations.
 */
export function IntroFlag() {
  useEffect(() => {
    const id = window.setTimeout(() => document.documentElement.classList.add("intro-seen"), 1500);
    return () => window.clearTimeout(id);
  }, []);
  return null;
}
