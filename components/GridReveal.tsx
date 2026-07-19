"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * GridReveal — a transição "cinematográfica" (referência: AcademySkills
 * combo-ui): em vez do fade-up simples usado no resto do site, os
 * elementos com a classe `.reveal-item` entram desfocados e reduzidos,
 * e assentam em foco/escala real conforme entram na tela, em lotes
 * (ScrollTrigger.batch agrupa elementos próximos para não disparar
 * uma animação por item isoladamente — mais barato e mais coeso).
 */
export default function GridReveal() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = gsap.utils.toArray<HTMLElement>(".reveal-item");
    if (reduced) {
      items.forEach((el) => {
        el.style.opacity = "1"; el.style.transform = "none"; el.style.filter = "none";
      });
      return;
    }
    ScrollTrigger.batch(".reveal-item", {
      start: "top 88%",
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1, scale: 1, y: 0, filter: "blur(0px)",
          duration: 0.8, stagger: 0.08, ease: "power3.out", overwrite: true,
        }),
    });
    return () => ScrollTrigger.getAll().forEach((s) => s.trigger?.classList?.contains("reveal-item") && s.kill());
  }, []);

  return null;
}
