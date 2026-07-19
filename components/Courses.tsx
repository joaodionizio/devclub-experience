const ROWS = [
  { i: "01", t: "Full Stack", m: ["front + back + deploy", "12 meses · projeto final real"] },
  { i: "02", t: "Front End", m: ["HTML · CSS · JS · React", "interfaces que contratam"] },
  { i: "03", t: "Back End", m: ["Node · APIs · SQL", "o motor por trás de tudo"] },
  { i: "04", t: "Mobile", m: ["apps iOS e Android", "um código, duas lojas"] },
  { i: "05", t: "IA & Automações", m: ["Claude Code · n8n · agentes", "a skill mais pedida de 2026"] },
  { i: "06", t: "Dados & PowerBI", m: ["análise · dashboards", "decisões guiadas por dados"] },
];
const PILLS_A = ["Programação Front End", "Programação Back End", "Full Stack", "Mobile", "React", "Node", "JavaScript Completo", "HTML5", "CSS3"];
const PILLS_B = ["Gestor de IA", "IA e Automações", "Claude & Claude Code", "Trilha N8N", "Análise de Dados", "PowerBI", "Git & GitHub"];

function PillRow({ items, rev }: { items: string[]; rev?: boolean }) {
  const list = [...items, ...items];
  return (
    <div className={`marquee${rev ? " rev" : ""}`}><div className="track">
      {list.map((p, i) => <span className="pill" key={i}><i />{p}</span>)}
    </div></div>
  );
}

export default function Courses() {
  return (
    <section className="section" id="formacoes">
      <div className="wrap">
        <span className="eyebrow rv">Formações</span>
        <h2 className="sec-title rv">Do zero ao avançado, <span className="grad-text">sem pular etapa</span></h2>
        <div className="f-list rv">
          {ROWS.map((r) => (
            <a className="f-row" href="#" data-hover key={r.i}>
              <span className="idx">{r.i}</span>
              <h3>{r.t}</h3>
              <span className="meta">{r.m[0]}<br />{r.m[1]}</span>
              <span className="arrow">→</span>
            </a>
          ))}
        </div>
        <div className="pills-rows rv">
          <PillRow items={PILLS_A} />
          <PillRow items={PILLS_B} rev />
        </div>
      </div>
    </section>
  );
}
