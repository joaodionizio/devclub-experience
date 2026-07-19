"use client";
import { useEffect } from "react";
import { TextScramble } from "@/lib/text-scramble";

/**
 * ScrambleEyebrows — decodifica os rótulos ".eyebrow" (ex: "Formações",
 * "Mercado") quando entram na tela, em vez de simplesmente aparecer.
 * Escolhido para os eyebrows (não os títulos grandes) porque eles são
 * texto puro, sem markup aninhado — o gradient dos títulos quebraria
 * se reescrevêssemos o innerHTML durante a animação.
 */
export default function ScrambleEyebrows() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const targets = document.querySelectorAll<HTMLElement>(".eyebrow");
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
