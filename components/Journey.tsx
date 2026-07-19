"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Terminal, Rocket, LayoutGrid, MessagesSquare, Trophy } from "lucide-react";

const STEPS = [
  { step: "Dia 001", title: "Primeira linha de código", text: 'Setup do ambiente, lógica de programação e o primeiro "Olá, mundo". Do absoluto zero, com acompanhamento.', n: "01", Icon: Terminal },
  { step: "Mês 003", title: "Primeiro projeto no ar", text: "Deploy de verdade, com domínio e tudo. Seu primeiro link pra mandar no grupo da família.", n: "02", Icon: Rocket },
  { step: "Mês 006", title: "Portfólio que impressiona", text: 'Seis projetos reais — e-commerce, dashboard, app com IA. Recrutador abre e fala "opa".', n: "03", Icon: LayoutGrid },
  { step: "Mês 009", title: "Modo entrevista", text: "Simulações com a recrutadora e com IA. Código revisado, LinkedIn afiado, inglês destravado.", n: "04", Icon: MessagesSquare },
  { step: "Mês 012 — concluído ✓", title: "Contratado(a)", text: "Seu nome no mural da fama e o crachá novo na mesa. E a gente continua junto no próximo nível.", n: "05", done: true, Icon: Trophy },
];

export default function Journey() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    /* no mobile a pista rola nativamente na horizontal */
    if (matchMedia("(max-width: 760px)").matches) {
      const pin = pinRef.current!;
      pin.style.height = "auto"; pin.style.overflowX = "auto"; pin.style.padding = "60px 0";
      return;
    }
    const track = trackRef.current!;
    const dist = () => track.scrollWidth - innerWidth;
    const tween = gsap.to(track, {
      x: () => -dist(), ease: "none",
      scrollTrigger: {
        trigger: pinRef.current, start: "top top", end: () => "+=" + dist(),
        scrub: 1, pin: true, invalidateOnRefresh: true,
        onUpdate: (s) => { if (barRef.current) barRef.current.style.width = s.progress * 100 + "%"; },
      },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);

  return (
    <section id="jornada">
      <div className="j-pin" ref={pinRef}>
        <div className="j-track" ref={trackRef}>
          <div className="j-head">
            <span className="eyebrow">Sua jornada</span>
            <h2 className="sec-title">12 meses.<br /><span className="grad-text">1 passo</span> por vez.</h2>
            <p className="sec-sub">Role para percorrer o caminho que +30 mil alunos já fizeram.</p>
          </div>
          {STEPS.map((s) => (
            <div className={`j-card${s.done ? " done" : ""}`} key={s.n}>
              <div className="j-icon"><s.Icon size={20} strokeWidth={2} /></div>
              <span className="step">{s.step}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <span className="big">{s.n}</span>
            </div>
          ))}
        </div>
        <div className="j-progress"><i ref={barRef as React.RefObject<HTMLElement>} /></div>
      </div>
    </section>
  );
}
