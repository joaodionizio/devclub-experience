"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { PlayCircle, Sparkles, Layers, Code2, Users2, LineChart } from "lucide-react";

const LESSONS = [
  { Icon: PlayCircle, label: "Fundamentos" },
  { Icon: Sparkles, label: "IA aplicada" },
  { Icon: Layers, label: "Design system" },
  { Icon: Code2, label: "Projeto real" },
  { Icon: Users2, label: "Mentoria" },
  { Icon: LineChart, label: "Carreira" },
];

const CHECKS = [
  ["Plataforma de ensino", "Personalizada, rápida e com acesso completo aos conteúdos."],
  ["Cursos por trilhas e formações", "Você sempre sabe o próximo passo."],
  ["Comunidade de alunos", "A maior e melhor do Brasil."],
  ["Club Agents", "Agentes de IA exclusivos, integrados à plataforma."],
  ["Playground de treinamento", "Código no navegador, sem configurar nada."],
  ["Mural da fama", "Alunos contratados em destaque — o próximo nome é o seu."],
];

export default function Platform() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tweens: gsap.core.Tween[] = [];
    if (!reduced)
      document.querySelectorAll<HTMLElement>("[data-float]").forEach((c, i) =>
        tweens.push(gsap.to(c, { y: i % 2 ? -10 : 10, duration: 2.4 + i * 0.4, yoyo: true, repeat: -1, ease: "sine.inOut" }))
      );
    /* tilt 3D na janela */
    const el = document.querySelector<HTMLElement>("[data-tilt]");
    const onMove = (e: MouseEvent) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      gsap.to(el, {
        rotateX: ((e.clientY - r.top) / r.height - 0.5) * -7,
        rotateY: ((e.clientX - r.left) / r.width - 0.5) * 9,
        transformPerspective: 800, duration: 0.4,
      });
    };
    const onLeave = () => el && gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "power2.out" });
    el?.addEventListener("mousemove", onMove);
    el?.addEventListener("mouseleave", onLeave);
    return () => {
      tweens.forEach((t) => t.kill());
      el?.removeEventListener("mousemove", onMove);
      el?.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section className="section" id="plataforma" style={{ paddingTop: 30 }}>
      <div className="wrap split">
        <div className="rv">
          <span className="eyebrow">Plataforma</span>
          <h2 className="sec-title" style={{ fontSize: "clamp(26px,3.6vw,42px)" }}>
            Uma plataforma moderna, com <span className="grad-text">suporte dos professores</span>
          </h2>
          <ul className="check-list">
            {CHECKS.map(([b, em]) => (
              <li key={b}><span className="check">✓</span><div><b>{b}</b><em>{em}</em></div></li>
            ))}
          </ul>
        </div>
        <div className="rv plat-wrap">
          <div className="window" data-tilt>
            <div className="win-bar"><i /><i /><i /><span>app.devclub.com.br/trilhas</span></div>
            <div className="win-body">
              <div className="sk t" />
              <div className="sk-cards">
                {LESSONS.slice(0, 3).map((l) => (
                  <div className="sk-card" key={l.label}><l.Icon size={22} /><span>{l.label}</span></div>
                ))}
              </div>
              <div className="sk-cards">
                {LESSONS.slice(3).map((l) => (
                  <div className="sk-card" key={l.label}><l.Icon size={22} /><span>{l.label}</span></div>
                ))}
              </div>
              <div className="sk" style={{ height: 10, width: "80%" }} />
              <div className="sk" style={{ height: 10, width: "60%" }} />
            </div>
          </div>
          <div className="float-chip" style={{ top: -18, right: -14 }} data-float><b>●</b> Club Agent: “revisei seu PR, 2 sugestões”</div>
          <div className="float-chip" style={{ bottom: -16, left: -18 }} data-float><b>✓</b> Trilha Full Stack — 68% concluída</div>
        </div>
      </div>
    </section>
  );
}
