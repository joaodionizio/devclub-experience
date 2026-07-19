"use client";
import { Code2, Braces, Atom, Hexagon, Triangle, GitBranch, Container, Database, Workflow, Bot } from "lucide-react";

/**
 * TechGrid — cards de tecnologia com ícone, no estilo de referência
 * (fundo com grade + diagonais, badge colorido, seta no canto).
 * As cores aqui seguem a convenção da própria linguagem (JS amarelo,
 * React ciano, Node verde...) — é a única exceção proposital à regra
 * de "só azul" do resto do site, porque é sinal semântico reconhecível,
 * não decoração.
 */
const TECHS = [
  { icon: Code2, label: "JavaScript", color: "#f7df1e", dark: true },
  { icon: Braces, label: "TypeScript", color: "#3178c6", dark: false },
  { icon: Atom, label: "React", color: "#61dafb", dark: true },
  { icon: Hexagon, label: "Node.js", color: "#3c873a", dark: false },
  { icon: Triangle, label: "Next.js", color: "#e5e7eb", dark: true },
  { icon: GitBranch, label: "Git & GitHub", color: "#f05033", dark: false },
  { icon: Container, label: "Docker", color: "#2496ed", dark: false },
  { icon: Database, label: "SQL & PostgreSQL", color: "#67b7d1", dark: true },
  { icon: Workflow, label: "n8n & Automações", color: "#ea4b71", dark: false },
  { icon: Bot, label: "IA & Claude Code", color: "#67e8f9", dark: true },
];

export default function TechGrid() {
  return (
    <section className="section" style={{ paddingTop: 20 }}>
      <div className="wrap">
        <span className="eyebrow rv">Stack de mercado</span>
        <h2 className="sec-title rv">
          As tecnologias que você vai <span className="grad-text">dominar</span>
        </h2>
        <p className="sec-sub rv">Nada de currículo defasado — as ferramentas que o mercado usa em 2026.</p>
        <div className="tech-grid">
          {TECHS.map((t) => {
            const Icon = t.icon;
            return (
              <div className="tech-tile reveal-item" key={t.label}>
                <div className="tech-tile-bg" />
                <div className="tech-icon" style={{ background: t.color, color: t.dark ? "#05070b" : "#fff" }}>
                  <Icon size={22} strokeWidth={2.2} />
                </div>
                <span className="tech-label">{t.label}</span>
                <span className="tech-arrow">↗</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
