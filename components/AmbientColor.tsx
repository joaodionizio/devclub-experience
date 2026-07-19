"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * AmbientColor — a página inteira tem uma leve deriva de matiz (hue)
 * conforme o scroll, aplicada via CSS custom property (--hue) num
 * `filter: hue-rotate()` no wrapper do céu/auroras (ver globals.css).
 * O efeito é sutil de propósito: cria sensação de "viagem" pelas
 * seções sem nunca parecer um filtro de Instagram.
 */
const STOPS = [0, -6, 8, -4, 10, 0]; // graus de hue-rotate em pontos ~igualmente espaçados

export default function AmbientColor() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const root = document.documentElement;
    const proxy = { hue: 0 };
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        const pos = self.progress * (STOPS.length - 1);
        const idx = Math.min(STOPS.length - 2, Math.floor(pos));
        const frac = pos - idx;
        const hue = STOPS[idx] + (STOPS[idx + 1] - STOPS[idx]) * frac;
        gsap.to(proxy, {
          hue,
          duration: 0.3,
          overwrite: true,
          onUpdate: () => root.style.setProperty("--hue", proxy.hue + "deg"),
        });
      },
    });
    return () => st.kill();
  }, []);

  return null;
}
