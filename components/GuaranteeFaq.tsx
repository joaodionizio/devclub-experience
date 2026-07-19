"use client";
import { useState } from "react";

const FAQ = [
  ["É pra iniciante ou precisa de repertório?", "É pra iniciante, sim. As formações começam do absoluto zero — sua primeira linha de código é escrita aqui dentro, com acompanhamento."],
  ["Já trabalho como dev, vale a pena pra mim?", "Vale. As trilhas avançadas de IA, automações e arquitetura, mais as mentorias e a rede de vagas, são pensadas pra quem quer subir de nível e de salário."],
  ["Eu tenho que saber programar?", "Não. A trilha do zero te leva pela mão. Se já sabe, faz o nivelamento e pula direto pro seu nível."],
  ["O curso tem certificado?", "Certificado de conclusão em todas as formações, com carga horária oficial — e diploma reconhecido pelo MEC na graduação DevClub."],
  ["Até quando posso me inscrever?", 'As turmas abrem em lotes. Enquanto o botão "Quero ser aluno" estiver ativo, há vagas no lote atual.'],
  ["Dá pra parcelar no boleto?", "Dá. Cartão em até 12x, boleto parcelado e Pix com desconto. O suporte encontra o melhor formato com você."],
];

export default function GuaranteeFaq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <>
      <section className="section" style={{ paddingTop: 20 }}>
        <div className="wrap">
          <span className="eyebrow rv">Reconhecimento oficial</span>
          <h2 className="sec-title rv">Escola reconhecida pelo <span className="grad-text">MEC</span>, diplomas oficiais</h2>
          <div className="mec rv">
            <div className="diploma d1">
              <div><span className="lab">CERTIFICADO OFICIAL</span><h4>Formação Full Stack</h4></div>
              <p>720 horas · DevClub</p><span className="wm">&lt;/&gt;</span>
            </div>
            <div className="diploma d2">
              <div><span className="lab">DIPLOMA · MEC</span><h4>Graduação em Desenvolvimento</h4></div>
              <p>Faculdade DevClub</p><span className="wm">MEC</span>
            </div>
          </div>
          <div className="guarantee rv">
            <div>
              <span className="eyebrow">Risco zero pra você</span>
              <h2 style={{ fontSize: "clamp(24px,3.2vw,36px)", marginBottom: 14 }}>7 dias de garantia incondicional</h2>
              <p style={{ color: "var(--muted)", maxWidth: "58ch" }}>
                Explore todos os cursos, formações, projetos e a comunidade. Não for pra você? Pede reembolso. Sem burocracia, sem letra miúda.
              </p>
              <div className="g-steps">
                <div><b>01</b><p>Compre hoje e acesse imediatamente</p></div>
                <div><b>02</b><p>Use a plataforma como quiser por 7 dias</p></div>
                <div><b>03</b><p>Não gostou? Mande e-mail e receba 100% de volta</p></div>
              </div>
            </div>
            <div className="seal"><div><b>7</b><small>DIAS · GARANTIA</small></div></div>
          </div>
        </div>
      </section>
      <section className="section" id="faq" style={{ paddingTop: 20 }}>
        <div className="wrap">
          <div style={{ textAlign: "center" }}>
            <span className="eyebrow rv" style={{ display: "inline-block" }}>FAQ</span>
            <h2 className="sec-title rv" style={{ margin: "0 auto" }}>Perguntas <span className="grad-text">frequentes</span></h2>
          </div>
          <div className="faq rv">
            {FAQ.map(([q, a], i) => (
              <div className={`faq-item${open === i ? " open" : ""}`} key={i}>
                <button className="faq-q" data-hover onClick={() => setOpen(open === i ? null : i)}>
                  <span>{q}</span><i>+</i>
                </button>
                <div className="faq-a" style={{ maxHeight: open === i ? 200 : 0 }}>
                  <p>{a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
