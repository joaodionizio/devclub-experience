export default function Comparison() {
  return (
    <section className="section" style={{ paddingTop: 30 }}>
      <div className="wrap">
        <span className="eyebrow rv">Comparativo</span>
        <h2 className="sec-title rv">Por que aqui é <span className="grad-text">diferente</span></h2>
        <div className="vs rv">
          <div className="vs-col vs-old">
            <span className="vs-lab">Curso comum</span>
            <ul>
              <li>Aulas gravadas em 2019 e boa sorte</li>
              <li>Dúvida? Fórum abandonado</li>
              <li>Certificado que ninguém confere</li>
              <li>Termina sem portfólio, sem network</li>
              <li>Nenhuma preparação pra entrevista</li>
            </ul>
          </div>
          <div className="vs-col vs-new">
            <span className="vs-lab">DevClub</span>
            <ul>
              <li>Trilhas atualizadas com IA e mercado 2026</li>
              <li>Suporte humano 7 dias + agentes de IA 24h</li>
              <li>Diploma reconhecido pelo MEC</li>
              <li>6+ projetos reais no portfólio e a maior comunidade do país</li>
              <li>Recrutadora, simulação de entrevista e vagas exclusivas</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
