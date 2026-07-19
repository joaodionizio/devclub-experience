const STATS = [
  ["+30.412", "alunos formados"],
  ["+1.900", "contratados em 2025"],
  ["97%", "recomendam"],
  ["7 dias", "de garantia incondicional"],
  ["MEC", "diploma reconhecido"],
];
const LOGOS = ["iFood", "Nubank", "Itaú", "Mercado Livre", "Globo", "Stone", "PicPay", "XP Inc."];
const TECHS = ["React", "Node.js", "TypeScript", "SQL", "IA & Agentes", "n8n", "Git", "Docker"];

/* faixas em marquee: o conteúdo é duplicado para o loop infinito
   (track anda -50% e recomeça sem emenda visível) */
export function TickerStats() {
  const items = [...STATS, ...STATS];
  return (
    <section className="ticker">
      <div className="marquee"><div className="track">
        {items.map(([b, t], i) => (
          <span className="tick-item" key={i}><b>{b}</b> {t}</span>
        ))}
      </div></div>
    </section>
  );
}
export function LogoMarquee() {
  const items = [...LOGOS, ...LOGOS];
  return (
    <section style={{ padding: "58px 0", borderBottom: "1px solid var(--line)" }}>
      <p style={{ textAlign: "center", color: "var(--muted)", fontSize: 12.5, fontFamily: "var(--mono)", letterSpacing: ".18em", marginBottom: 32 }}>
        ALUNOS NAS MAIORES EMPRESAS DO BRASIL E DO MUNDO
      </p>
      <div className="marquee"><div className="track">
        {items.map((l, i) => <span className="logo-item" key={i}>{l}</span>)}
      </div></div>
    </section>
  );
}
export function TechTicker() {
  const items = [...TECHS, ...TECHS];
  return (
    <div className="ticker">
      <div className="marquee rev"><div className="track">
        {items.map((t, i) => <span className="tick-item" key={i}><b>{t}</b></span>)}
      </div></div>
    </div>
  );
}
