const MINIS = [
  ["“Saí do caixa de supermercado pro meu primeiro emprego dev em 9 meses.”", "Ana Ribeiro", "front end @ startup"],
  ["“As simulações de entrevista com IA me deram uma segurança absurda.”", "João Pedro", "back end · Node"],
  ["“Consegui vaga internacional remota. O inglês pra dev fez toda diferença.”", "Marcos Lima", "full stack · remoto 🇺🇸"],
  ["“A recrutadora refez meu LinkedIn e em 3 semanas chamaram pra 4 entrevistas.”", "Renata Souza", "dev júnior"],
];

export default function Testimonials() {
  const strip = [...MINIS, ...MINIS];
  return (
    <section className="section" style={{ paddingTop: 30 }}>
      <div className="wrap">
        <span className="eyebrow rv">Resultados</span>
        <h2 className="sec-title rv">Milhares de vidas <span className="grad-text">transformadas</span></h2>
        <div className="t-feature rv">
          <blockquote>
            “Eu era auxiliar administrativo ganhando um salário mínimo.{" "}
            <span>Em 11 meses consegui minha primeira vaga como dev júnior</span> — e dobrei minha renda no primeiro ano.”
            <footer>
              <span className="t-av">VT</span>
              <div><b>Vicente Talento</b><em>dev júnior · contratado em 2025</em></div>
            </footer>
          </blockquote>
          <div className="t-video">
            <button className="play" aria-label="Assistir depoimento" data-hover>▶</button>
          </div>
        </div>
      </div>
      <div className="t-strip marquee rv"><div className="track">
        {strip.map(([p, b, i2], i) => (
          <div className="t-mini" key={i}><p>{p}</p><b>{b} <i>{i2}</i></b></div>
        ))}
      </div></div>
    </section>
  );
}
