"use client";
import { useEffect, useRef } from "react";

const ROWS = [
  { lv: "Júnior", note: "0–2 anos · valores anuais", br: ["34%", "R$ 70.800"], intl: ["52%", "R$ 135.928", "($27.000)"] },
  { lv: "Pleno", note: "2–5 anos", br: ["55%", "R$ 140.400"], intl: ["72%", "R$ 201.375", "($40.000)"] },
  { lv: "Sênior", note: "5+ anos", br: ["70%", "R$ 196.800"], intl: ["88%", "R$ 307.098", "($61.000)"] },
];

export default function Market() {
  const chartRef = useRef<HTMLDivElement>(null);

  /* as barras crescem quando o gráfico entra na viewport (uma vez) */
  useEffect(() => {
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll<HTMLElement>(".bar").forEach((b) => {
          b.style.width = b.dataset.w!;
          (b.querySelector("b") as HTMLElement).style.opacity = "1";
        });
        io.disconnect();
      });
    }, { threshold: 0.35 });
    io.observe(chartRef.current!);
    return () => io.disconnect();
  }, []);

  return (
    <section className="section" style={{ paddingTop: 20 }}>
      <div className="wrap">
        <span className="eyebrow rv">Mercado</span>
        <h2 className="sec-title rv">O mercado <span className="grad-text">paga bem?</span></h2>
        <div className="stats rv">
          <div className="stat"><b><span data-count="30412">0</span></b><span>alunos formados</span></div>
          <div className="stat"><b>+<span data-count="1900">0</span></b><span>contratados em 2025</span></div>
          <div className="stat"><b><span data-count="97">0</span>%</b><span>recomendam o devclub</span></div>
          <div className="stat"><b><span data-count="12">0</span>x</b><span>parcele sem juros</span></div>
        </div>
        <div className="chart-card rv" ref={chartRef}>
          {ROWS.map((r) => (
            <div className="chart-row" key={r.lv}>
              <div className="lv"><b>{r.lv}</b><span>{r.note}</span></div>
              <div className="bars">
                <div className="bar br" data-w={r.br[0]}><b>{r.br[1]}</b></div>
                <div className="bar intl" data-w={r.intl[0]}><b>{r.intl[1]} <i>{r.intl[2]}</i></b></div>
              </div>
            </div>
          ))}
          <div className="legend">
            <span><i className="g" />Brasil</span>
            <span><i className="b" />Internacional (remoto)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
