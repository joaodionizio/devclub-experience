"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ParticleEngine } from "@/lib/particle-engine";
import { displayFontFamily } from "@/lib/fonts";

const WORDS = ["</>", "DEV", "CLUB"];

export default function ParticleHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const engine = new ParticleEngine(canvasRef.current!, {
      fontFamily: displayFontFamily(),
      reduced,
    });

    let wordIdx = 0;
    let buf = "";
    let bufTimer: ReturnType<typeof setTimeout>;
    let idleTimer: ReturnType<typeof setTimeout>;
    let lastY = window.scrollY;

    const onMove = (e: MouseEvent) => engine.setPointer(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) engine.setPointer(t.clientX, t.clientY);
    };
    const onOut = () => engine.clearPointer();
    const onScroll = () => {
      engine.scrollWind += window.scrollY - lastY;
      lastY = window.scrollY;
    };
    const onClick = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a,button")) return;
      const [cx, cy] = engine.toLocal(e.clientX, e.clientY);
      engine.explode(cx, cy);
      engine.nextTheme();
    };
    /* teclado escreve nas partículas — o momento "uau" da página */
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Backspace") buf = buf.slice(0, -1);
      else if (e.key.length === 1 && /[a-zA-Z0-9 +#!?<>/.@-]/.test(e.key) && buf.length < 9)
        buf += e.key.toUpperCase();
      else return;
      clearTimeout(bufTimer);
      clearTimeout(idleTimer);
      bufTimer = setTimeout(() => engine.setText(buf.trim() || WORDS[wordIdx]), 200);
      idleTimer = setTimeout(() => {
        buf = "";
        engine.setText(WORDS[wordIdx]);
      }, 7000);
    };

    const cycle = setInterval(() => {
      if (buf) return;
      wordIdx = (wordIdx + 1) % WORDS.length;
      engine.setText(WORDS[wordIdx]);
    }, 7000);

    const onResize = () => engine.resize();

    const boot = () => {
      engine.resize();
      engine.start();
      if (!reduced)
        gsap.to(engine, { gather: 0.006, duration: 3, ease: "power2.in", delay: 1 });
      addEventListener("resize", onResize);
      addEventListener("mousemove", onMove);
      addEventListener("touchmove", onTouch, { passive: true });
      addEventListener("mouseout", onOut);
      addEventListener("scroll", onScroll, { passive: true });
      addEventListener("keydown", onKey);
      heroRef.current?.addEventListener("click", onClick);
    };
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(boot);

    return () => {
      engine.stop();
      clearInterval(cycle);
      removeEventListener("resize", onResize);
      removeEventListener("mousemove", onMove);
      removeEventListener("touchmove", onTouch);
      removeEventListener("mouseout", onOut);
      removeEventListener("scroll", onScroll);
      removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="hero" ref={heroRef}>
      <canvas id="glyph" ref={canvasRef} aria-hidden="true" />
      <div className="wrap hero-stack">
        <h1>
          A maior comunidade de
          <br />
          programação <span className="grad-text">do Brasil</span>
        </h1>
        <p className="hero-sub">
          Do zero ao contratado: formações completas, mentorias semanais, IA no
          dia a dia e vagas exclusivas — em um só lugar.
        </p>
        <div className="hero-ctas">
          <a className="btn btn-primary btn-lg magnet" href="#cta" data-hover>
            <span className="sh" />Quero ser aluno
          </a>
          <a className="btn btn-ghost btn-lg magnet" href="#formacoes" data-hover>
            ▶&nbsp; Saiba mais
          </a>
        </div>
        <div className="hero-proof">
          <div className="avatars">
            <b style={{ background: "#2563eb" }}>AL</b>
            <b style={{ background: "#0e7490" }}>MA</b>
            <b style={{ background: "#0d9488" }}>JP</b>
            <b style={{ background: "#1d4ed8" }}>RE</b>
            <b style={{ background: "#334155" }}>+</b>
          </div>
          <span>
            <span className="count" data-count="30412">0</span> alunos já passaram por aqui
          </span>
        </div>
        <span className="hint">
          mova o mouse · clique para trocar as cores · digite algo no teclado ;)
        </span>
      </div>
    </header>
  );
}
