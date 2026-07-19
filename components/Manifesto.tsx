"use client";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* Frase que "acende" palavra por palavra conforme o scroll (scrub). */
const WORDS: Array<{ t: string; hot?: boolean }> = [
  { t: "Tutorial" }, { t: "não" }, { t: "te" }, { t: "contrata." },
  { t: "Portfólio", hot: true }, { t: "contrata." },
  { t: "Aqui" }, { t: "você" }, { t: "não" }, { t: "assiste" }, { t: "aula" }, { t: "—" },
  { t: "você" }, { t: "constrói", hot: true }, { t: "a" }, { t: "sua" }, { t: "carreira," },
  { t: "projeto" }, { t: "por" }, { t: "projeto." },
];

export default function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const words = ref.current!.querySelectorAll(".w");
    if (reduced) { words.forEach((w) => w.classList.add("lit")); return; }
    const st = ScrollTrigger.create({
      trigger: ref.current, start: "top 75%", end: "bottom 45%", scrub: true,
      onUpdate: (s) => {
        const upto = Math.floor(s.progress * words.length);
        words.forEach((w, i) => w.classList.toggle("lit", i <= upto));
      },
    });
    return () => st.kill();
  }, []);

  return (
    <section className="manifesto">
      <div className="wrap">
        <p ref={ref}>
          {WORDS.map((w, i) => (
            <span key={i} className={`w${w.hot ? " hot" : ""}`}>{w.t}{" "}</span>
          ))}
        </p>
      </div>
    </section>
  );
}
