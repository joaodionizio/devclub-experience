"use client";
/**
 * Chrome — camadas globais da página:
 * preloader, céu de estrelas, cursor customizado, barra de progresso,
 * reveals com ScrollTrigger, contadores e botões magnéticos.
 */
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function Chrome() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---- smooth scroll (Lenis), sincronizado com o ScrollTrigger ----
       Sem isso o scroll é o nativo "seco" do navegador; com Lenis o
       scroll ganha inércia/amortecimento — é o que dá aquela sensação
       de "manteiga" dos sites premiados. Desligado com reduced-motion
       por respeito a quem usa o sistema com animações reduzidas. */
    let lenis: Lenis | null = null;
    let lenisRaf = 0;
    if (!reduced) {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      lenis.on("scroll", ScrollTrigger.update);
      const raf = (time: number) => {
        lenis?.raf(time);
        lenisRaf = requestAnimationFrame(raf);
      };
      lenisRaf = requestAnimationFrame(raf);
    }

    /* ---- título da aba reage quando o visitante sai da página ---- */
    const originalTitle = document.title;
    const onVisibility = () => {
      document.title = document.hidden ? "👋 volte aqui, dev" : originalTitle;
    };
    document.addEventListener("visibilitychange", onVisibility);

    /* ---- preloader ---- */
    const loader = document.getElementById("loader")!;
    const done = () => {
      loader.classList.add("done");
      document.body.classList.remove("locked");
      setTimeout(() => loader.remove(), 800);
    };
    if (reduced) done();
    else gsap.to("#ldBar", { width: "100%", duration: 0.9, ease: "power2.inOut", onComplete: done });

    /* ---- céu: estrelas + riscos ---- */
    const c = document.getElementById("sky") as HTMLCanvasElement;
    const x = c.getContext("2d")!;
    let W = 0, H = 0;
    let st: Array<{ x: number; y: number; r: number; p: number; s: number; hue: string }> = [];
    let streaks: Array<{ x: number; y: number; len: number; a: number }> = [];
    const make = () => {
      W = c.width = innerWidth;
      H = c.height = innerHeight;
      st = Array.from({ length: Math.min(200, Math.floor(W / 8)) }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 1.2 + 0.3, p: Math.random() * 7,
        s: 0.4 + Math.random() * 1.4,
        hue: Math.random() < 0.3 ? "147,197,253" : "255,255,255",
      }));
      streaks = Array.from({ length: 4 }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        len: 120 + Math.random() * 160, a: 0.05 + Math.random() * 0.05,
      }));
    };
    make();
    addEventListener("resize", make);
    let skyRaf = 0;
    if (!reduced) {
      const loop = (t: number) => {
        x.clearRect(0, 0, W, H);
        for (const s of st) {
          const a = 0.18 + 0.5 * Math.abs(Math.sin((t / 1000) * s.s + s.p));
          x.fillStyle = `rgba(${s.hue},${a})`;
          x.beginPath(); x.arc(s.x, s.y, s.r, 0, 7); x.fill();
        }
        for (const k of streaks) {
          const g = x.createLinearGradient(k.x, k.y, k.x + k.len, k.y + k.len * 0.4);
          g.addColorStop(0, "rgba(147,197,253,0)");
          g.addColorStop(0.5, `rgba(147,197,253,${k.a})`);
          g.addColorStop(1, "rgba(147,197,253,0)");
          x.strokeStyle = g; x.lineWidth = 1;
          x.beginPath(); x.moveTo(k.x, k.y); x.lineTo(k.x + k.len, k.y + k.len * 0.4); x.stroke();
        }
        skyRaf = requestAnimationFrame(loop);
      };
      skyRaf = requestAnimationFrame(loop);
    }

    /* ---- cursor + magnetismo + rastro de luz ---- */
    const fine = !matchMedia("(pointer:coarse)").matches;
    let cursorRaf = 0;
    let trailRaf = 0;
    if (fine) {
      /* rastro: canvas cheio de tela, cada frame desenha um segmento
         entre o ponto anterior e o atual e esmaece tudo levemente —
         cria a cauda de luz sem precisar guardar um array de pontos */
      const trail = document.createElement("canvas");
      trail.id = "cursor-trail";
      trail.style.cssText =
        "position:fixed;inset:0;pointer-events:none;z-index:997;mix-blend-mode:screen";
      document.body.prepend(trail);
      const tctx = trail.getContext("2d")!;
      const resizeTrail = () => { trail.width = innerWidth; trail.height = innerHeight; };
      resizeTrail();
      addEventListener("resize", resizeTrail);
      const trailPos = { x: -9999, y: -9999, px: -9999, py: -9999 };

      const dot = document.getElementById("cursor")!;
      const ring = document.getElementById("cursor-ring")!;
      const pos = { x: innerWidth / 2, y: innerHeight / 2 };
      const rp = { ...pos };
      const onMove = (e: MouseEvent) => {
        pos.x = e.clientX; pos.y = e.clientY;
        dot.style.transform = `translate(${pos.x}px,${pos.y}px) translate(-50%,-50%)`;
        trailPos.px = trailPos.x; trailPos.py = trailPos.y;
        trailPos.x = e.clientX; trailPos.y = e.clientY;
      };
      addEventListener("mousemove", onMove);
      const follow = () => {
        rp.x += (pos.x - rp.x) * 0.16;
        rp.y += (pos.y - rp.y) * 0.16;
        ring.style.transform = `translate(${rp.x}px,${rp.y}px) translate(-50%,-50%)`;
        cursorRaf = requestAnimationFrame(follow);
      };
      follow();
      const drawTrail = () => {
        tctx.fillStyle = "rgba(5,7,11,0.12)"; /* esmaece o rastro anterior */
        tctx.fillRect(0, 0, trail.width, trail.height);
        if (trailPos.px > -9998) {
          tctx.strokeStyle = "rgba(103,232,249,.55)";
          tctx.lineWidth = 2;
          tctx.lineCap = "round";
          tctx.beginPath();
          tctx.moveTo(trailPos.px, trailPos.py);
          tctx.lineTo(trailPos.x, trailPos.y);
          tctx.stroke();
        }
        trailRaf = requestAnimationFrame(drawTrail);
      };
      trailRaf = requestAnimationFrame(drawTrail);

      document.querySelectorAll("[data-hover]").forEach((el) => {
        el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
        el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
      });
      document.querySelectorAll<HTMLElement>(".magnet").forEach((btn) => {
        btn.addEventListener("mousemove", (e) => {
          const r = btn.getBoundingClientRect();
          gsap.to(btn, {
            x: (e.clientX - r.left - r.width / 2) * 0.25,
            y: (e.clientY - r.top - r.height / 2) * 0.35,
            duration: 0.3,
          });
        });
        btn.addEventListener("mouseleave", () =>
          gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,.4)" })
        );
      });
    }

    /* ---- nav + progresso ---- */
    const nav = document.getElementById("nav")!;
    const prog = document.getElementById("progress")!;
    const onScroll = () => {
      nav.classList.toggle("scrolled", scrollY > 10);
      const h = document.documentElement;
      prog.style.width = (scrollY / (h.scrollHeight - innerHeight)) * 100 + "%";
    };
    addEventListener("scroll", onScroll, { passive: true });

    /* ---- reveals + contadores ---- */
    if (!reduced) {
      gsap.utils.toArray<HTMLElement>(".rv").forEach((el) => {
        gsap.to(el, {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%" },
        });
      });
      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const end = +el.dataset.count!;
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end, duration: 1.6, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%" },
          onUpdate: () => {
            el.textContent = Math.floor(obj.v).toLocaleString("pt-BR");
          },
        });
      });
    } else {
      document.querySelectorAll<HTMLElement>(".rv").forEach((el) => {
        el.style.opacity = "1"; el.style.transform = "none";
      });
      document.querySelectorAll<HTMLElement>("[data-count]").forEach(
        (el) => (el.textContent = (+el.dataset.count!).toLocaleString("pt-BR"))
      );
    }

    return () => {
      cancelAnimationFrame(skyRaf);
      cancelAnimationFrame(cursorRaf);
      cancelAnimationFrame(trailRaf);
      cancelAnimationFrame(lenisRaf);
      lenis?.destroy();
      document.getElementById("cursor-trail")?.remove();
      document.removeEventListener("visibilitychange", onVisibility);
      removeEventListener("resize", make);
      removeEventListener("scroll", onScroll);
      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
  }, []);

  return (
    <>
      <div id="ambient-bg" />
      <canvas id="sky" />
      <div id="cursor" />
      <div id="cursor-ring" />
      <div id="progress" />
      <div id="loader" role="status" aria-label="Carregando">
        <div className="ld">
          <span className="mark"><i>&lt;/&gt;</i>DevClub</span>
          <span className="bar"><i id="ldBar" /></span>
        </div>
      </div>
    </>
  );
}
