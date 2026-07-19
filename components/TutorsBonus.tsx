"use client";
import { useState } from "react";

const TUTORS = [
  { g: "linear-gradient(135deg,#0a1638,#2563eb)", ini: "RM", st: "fundador", n: "Rodolfo Mori", r: "full stack", photo: "/tutors/rodolfo.jpg" },
  { g: "linear-gradient(135deg,#083344,#0e7490)", ini: "FE", n: "Fernanda", r: "front end & ui" },
  { g: "linear-gradient(135deg,#102040,#3b82f6)", ini: "AG", n: "Agustinho", r: "back end & node" },
  { g: "linear-gradient(135deg,#042f3a,#14b8a6)", ini: "HE", n: "Henrique", r: "ia & automações" },
  { g: "linear-gradient(135deg,#0c4a6e,#0ea5e9)", ini: "MA", n: "Márcio", r: "mobile" },
  { g: "linear-gradient(135deg,#1e293b,#64748b)", ini: "JU", n: "Juliana", r: "dados & powerbi" },
  { g: "linear-gradient(135deg,#134e4a,#0d9488)", ini: "MT", n: "Mateus", r: "devops & cloud" },
  { g: "linear-gradient(135deg,#0a1638,#0ea5e9)", ini: "+12", st: "bônus", n: "Especialistas convidados", r: "módulos novos todo mês" },
];
const BONUS = [
  { g: "linear-gradient(135deg,#1d4ed8,#60a5fa)", ini: "RG", t: "Processo criativo", n: "Radilson Gomes", d: "1h33m ▶" },
  { g: "linear-gradient(135deg,#0e7490,#67e8f9)", ini: "GB", t: "Carreira internacional", n: "Gabe Bo", d: "1h20m ▶" },
  { g: "linear-gradient(135deg,#334155,#94a3b8)", ini: "AJ", t: "Como começar em UX", n: "Aparício Júnior", d: "1h30m ▶" },
  { g: "linear-gradient(135deg,#042f3a,#2dd4bf)", ini: "NY", t: "3D na web", n: "Nasser Yousef", d: "1h44m ▶" },
  { g: "linear-gradient(135deg,#1e3a5f,#38bdf8)", ini: "LP", t: "Freelas do zero", n: "Lucas Petry", d: "1h12m ▶" },
];

/**
 * TutorAvatar — mostra a foto real (ex.: Rodolfo) quando o arquivo
 * existe em /public; se ainda não foi adicionado (ou falhar ao
 * carregar), cai de volta pro gradiente + iniciais, sem quebrar o layout.
 */
function TutorAvatar({ g, ini, photo }: { g: string; ini: string; photo?: string }) {
  const [broken, setBroken] = useState(false);
  if (photo && !broken) {
    return (
      <div className="ph ph-photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo} alt="" onError={() => setBroken(true)} />
      </div>
    );
  }
  return <div className="ph" style={{ background: g }}>{ini}</div>;
}

export default function TutorsBonus() {
  const strip = [...BONUS, ...BONUS];
  return (
    <>
      <section className="section" id="tutores">
        <div className="wrap">
          <span className="eyebrow rv">Tutores</span>
          <h2 className="sec-title rv">Aprenda com <span className="grad-text">os melhores</span></h2>
          <p className="sec-sub rv">Quem te ensina aqui trabalha — e contrata — no mercado de verdade.</p>
          <div className="tutors">
            {TUTORS.map((t) => (
              <div className="tutor rv" data-hover key={t.ini}>
                <TutorAvatar g={t.g} ini={t.ini} photo={t.photo} />
                <div className="in">
                  {t.st && <span className="st">{t.st}</span>}
                  <b>{t.n}</b>
                  <span>{t.r}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 30 }}>
        <div className="wrap">
          <span className="eyebrow rv">Módulos bônus</span>
          <h2 className="sec-title rv">Aulas com os maiores <span className="grad-text">especialistas do segmento</span></h2>
        </div>
        <div className="marquee rv" style={{ marginTop: 52 }}><div className="track">
          {strip.map((b, i) => (
            <div className="bx" key={i}>
              <span className="bx-av" style={{ background: b.g }}>{b.ini}</span>
              <b>{b.t}</b>
              <span>{b.n}</span>
              <i>{b.d}</i>
            </div>
          ))}
        </div></div>
      </section>
    </>
  );
}
