"use client";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { Film, ShoppingCart, Users, LineChart, Bot, Truck } from "lucide-react";

/* cada projeto ganha um ícone temático grande — ilustração real do
   que o projeto É, no lugar das barras cinzas de skeleton de antes */
const PROJECTS = [
  { c: "p1", tag: "streaming", t: "Clone de plataforma de filmes com catálogo real", Icon: Film },
  { c: "p2", tag: "e-commerce", t: "Loja completa com carrinho e checkout", Icon: ShoppingCart },
  { c: "p3", tag: "social", t: "Rede social com feed em tempo real", Icon: Users },
  { c: "p4", tag: "fintech", t: "Dashboard bancário com gráficos", Icon: LineChart },
  { c: "p5", tag: "ia", t: "Chat com agentes de IA e memória", Icon: Bot },
  { c: "p6", tag: "mobile", t: "App de delivery full stack", Icon: Truck },
];

export default function Projects() {
  /* o briefing pediu DUAS versões da galeria — grade e mosaico */
  const [layout, setLayout] = useState<"grid" | "mosaic">("grid");

  const switchLayout = (l: "grid" | "mosaic") => {
    setLayout(l);
    gsap.fromTo("#projGrid .proj",
      { opacity: 0, y: 24, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.07, ease: "power3.out" });
  };

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".proj");
    const handlers: Array<[HTMLElement, (e: MouseEvent) => void, () => void]> = [];
    els.forEach((el) => {
      const move = (e: MouseEvent) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, {
          rotateX: ((e.clientY - r.top) / r.height - 0.5) * -7,
          rotateY: ((e.clientX - r.left) / r.width - 0.5) * 9,
          transformPerspective: 800, duration: 0.4,
        });
      };
      const leave = () => gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power2.out" });
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", leave);
      handlers.push([el, move, leave]);
    });
    return () => handlers.forEach(([el, m, l]) => {
      el.removeEventListener("mousemove", m);
      el.removeEventListener("mouseleave", l);
    });
  }, []);

  return (
    <section className="section">
      <div className="wrap">
        <div className="rv" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 26 }}>
          <div>
            <span className="eyebrow">Portfólio real</span>
            <h2 className="sec-title">Tudo com <span className="grad-text">projetos práticos e reais</span></h2>
            <p className="sec-sub">Você não termina com certificado na gaveta. Termina com portfólio que impressiona recrutador.</p>
          </div>
          <div className="toggle" role="tablist" aria-label="Layout dos projetos">
            <button className={layout === "grid" ? "active" : ""} onClick={() => switchLayout("grid")} data-hover>Grade</button>
            <button className={layout === "mosaic" ? "active" : ""} onClick={() => switchLayout("mosaic")} data-hover>Mosaico</button>
          </div>
        </div>
        <div className={`proj-grid${layout === "mosaic" ? " mosaic" : ""}`} id="projGrid">
          {PROJECTS.map((p) => (
            <div className={`proj reveal-item ${p.c}`} data-hover key={p.c}>
              <p.Icon className="proj-illus" strokeWidth={1.2} />
              <span className="tag">{p.tag}</span>
              <b>{p.t}</b>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
