"use client";
import { useEffect } from "react";

const CELLS = [
  { cls: "w2 h2", tag: "Mentoria", t: "Mentorias semanais ao vivo", p: "Encontros com os melhores profissionais do mercado — código, carreira e revisão de projeto na tela.", live: true, num: "24" },
  { cls: "w2", tag: "Recrutamento", t: "Recrutadora toda semana", p: "Currículo, LinkedIn e simulação de entrevista com quem contrata de verdade." },
  { cls: "", tag: "Mente", t: "Terapeuta de alta performance", p: "Cabeça no lugar pra maratona inteira." },
  { cls: "", tag: "IA", t: "Agentes de IA 24h", p: "Dezenas de agentes revisando seu código a qualquer hora." },
  { cls: "", tag: "Suporte", t: "Humanos, 7 dias por semana", p: "Travou? Tem gente de verdade te respondendo — até domingo." },
  { cls: "w2", tag: "Oportunidades", t: "Vagas exclusivas + a maior comunidade do Brasil", p: "Empresas parceiras publicam vagas aqui antes do LinkedIn." },
  { cls: "", tag: "English", t: "Inglês para devs", p: "Vocabulário técnico e entrevista em inglês sem pânico." },
];

export default function Bento() {
  /* spotlight: o brilho segue o mouse via CSS custom properties */
  useEffect(() => {
    const cells = document.querySelectorAll<HTMLElement>(".b-cell");
    const handlers: Array<[HTMLElement, (e: MouseEvent) => void]> = [];
    cells.forEach((c) => {
      const fn = (e: MouseEvent) => {
        const r = c.getBoundingClientRect();
        c.style.setProperty("--mx", e.clientX - r.left + "px");
        c.style.setProperty("--my", e.clientY - r.top + "px");
      };
      c.addEventListener("mousemove", fn);
      handlers.push([c, fn]);
    });
    return () => handlers.forEach(([c, fn]) => c.removeEventListener("mousemove", fn));
  }, []);

  return (
    <section className="section" style={{ paddingTop: 40 }}>
      <div className="wrap">
        <span className="eyebrow rv">Carreira</span>
        <h2 className="sec-title rv">Tudo que você precisa <span className="grad-text">além do código</span></h2>
        <p className="sec-sub rv">Programar é metade do caminho. A outra metade é ser visto, entrevistado e contratado.</p>
        <div className="bento">
          {CELLS.map((c, i) => (
            <div className={`b-cell reveal-item ${c.cls}`} key={i}>
              <span className="tag">{c.tag}</span>
              <h4>{c.t}</h4>
              <p>{c.p}</p>
              {c.live && (
                <div className="live">
                  <span><b>● AO VIVO</b>&nbsp; Revisão de portfólio — quinta, 20h</span>
                  <span><b>● AO VIVO</b>&nbsp; Arquitetura de APIs — sábado, 10h</span>
                  <span><b>● AO VIVO</b>&nbsp; Carreira internacional — terça, 19h</span>
                </div>
              )}
              {c.num && <span className="num">{c.num}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
