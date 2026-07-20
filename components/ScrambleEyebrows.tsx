"use client";
import { useEffect } from "react";
import { TextScramble } from "@/lib/text-scramble";

/**
 * Decodifica uma vez cada rótulo marcado com data-scramble quando ele
 * entra na viewport. Títulos grandes não recebem o efeito porque possuem
 * markup interno e seriam destruídos ao reescrever o HTML.
 */
export default function ScrambleEyebrows() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const targets = document.querySelectorAll<HTMLElement>("[data-scramble]");
    const done = new WeakSet<HTMLElement>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (!entry.isIntersecting || done.has(el)) return;
          done.add(el);
          const original = el.dataset.text || el.innerText;
          el.dataset.text = original;
          new TextScramble(el).play(original);
        });
      },
      { threshold: 0.6 }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
