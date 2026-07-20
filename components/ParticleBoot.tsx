"use client";

/**
 * ParticleBoot — a inicialização da experiência.
 *
 * Reaproveita o ParticleEngine (o mesmo motor que dirige o hero por cena)
 * para escrever a sequência de boot em partículas antes de revelar o site.
 *
 * Sequência: cada palavra entra como nuvem solta, se monta no glifo, segura,
 * e a última explode para fora — aí o site aparece.
 *
 * Decisões:
 *  - Instância própria do engine, parada no fim: o hero tem a dele e os dois
 *    canvases só coexistem durante o fade final.
 *  - `gather` animado por GSAP é o que dá a montagem; zerá-lo devolve a nuvem.
 *  - reduced-motion pula tudo e chama onDone imediatamente.
 */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ParticleEngine } from "@/lib/particle-engine";
import { displayFontFamily } from "@/lib/fonts";

/** palavras da inicialização, na ordem */
const BOOT_WORDS = ["</>", "DEV", "CLUB"] as const;

/** duração da montagem de cada palavra (s) */
const ASSEMBLE = 0.9;
/** quanto cada palavra fica montada antes da próxima (s) */
const HOLD = 0.85;

interface ParticleBootProps {
  /** chamado quando a animação termina (ou é pulada) */
  onDone: () => void;
}

export default function ParticleBoot({ onDone }: ParticleBootProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  /** onDone em ref: a timeline roda uma vez só e não deve reagir a nova identidade da prop */
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    if (!canvas || !root) return;

    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onDoneRef.current();
      return;
    }

    const engine = new ParticleEngine(canvas, {
      fontFamily: displayFontFamily(),
      reduced: false,
    });

    let tl: gsap.core.Timeline | null = null;
    let cancelled = false;

    const onResize = () => engine.resize();

    const boot = () => {
      if (cancelled) return;

      engine.resize();
      // primeira palavra já definida antes do start: evita flash de nuvem sem alvo
      engine.gather = 0;
      engine.setText(BOOT_WORDS[0]);
      engine.start();
      addEventListener("resize", onResize);

      tl = gsap.timeline({
        onComplete: () => {
          engine.stop();
          onDoneRef.current();
        },
      });

      BOOT_WORDS.forEach((word, i) => {
        if (i > 0) {
          tl!.call(() => {
            engine.setText(word);
            engine.nextTheme();
          });
          // solta a nuvem para a palavra se remontar do zero
          tl!.set(engine, { gather: 0 });
        }
        tl!.to(engine, { gather: 0.006, duration: ASSEMBLE, ease: "power2.in" });
        tl!.to({}, { duration: HOLD });
      });

      // dissolve: grãos perdem o alvo, explodem do centro e o overlay some
      tl.to(engine, { gather: 0, duration: 0.35, ease: "power1.out" });
      tl.call(() => {
        const [cx, cy] = engine.toLocal(innerWidth / 2, innerHeight / 2);
        engine.explode(cx, cy);
      });
      tl.to(root, { autoAlpha: 0, duration: 0.7, ease: "power2.inOut" }, "<0.1");
    };

    // o engine rasteriza o texto na fonte real do site; sem isso o glifo sai em fallback
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(boot);

    return () => {
      cancelled = true;
      tl?.kill();
      engine.stop();
      removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="dc-boot" ref={rootRef}>
      <canvas className="dc-boot-canvas" ref={canvasRef} aria-hidden="true" />
    </div>
  );
}
