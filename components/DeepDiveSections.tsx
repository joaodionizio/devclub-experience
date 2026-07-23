"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowDown,
  ArrowRight,
  Bot,
  Check,
  ChevronDown,
  CircleUserRound,
  Film,
  GraduationCap,
  Headphones,
  Layers3,
  LayoutGrid,
  LineChart,
  MessageSquareCode,
  PanelsTopLeft,
  Play,
  ShoppingCart,
  Smartphone,
  Terminal,
  Users,
} from "lucide-react";

type Formation = {
  index: string;
  title: string;
  description: string;
  duration: string;
  outcome: string;
  modules: string[];
  stack: string[];
};

const FORMATIONS: Formation[] = [
  {
    index: "01",
    title: "Full Stack",
    description: "A formação completa para construir produtos do front ao deploy.",
    duration: "12 meses",
    outcome: "6 projetos publicados",
    modules: ["Lógica e web", "React & Next", "Node & APIs", "Banco de dados"],
    stack: ["TypeScript", "React", "Node.js", "PostgreSQL"],
  },
  {
    index: "02",
    title: "Front End",
    description: "Interfaces rápidas, acessíveis e com acabamento de produto real.",
    duration: "8 meses",
    outcome: "4 interfaces completas",
    modules: ["HTML semântico", "CSS avançado", "JavaScript", "React"],
    stack: ["HTML5", "CSS3", "JavaScript", "React"],
  },
  {
    index: "03",
    title: "Back End",
    description: "APIs, autenticação, bancos de dados e arquitetura preparada para crescer.",
    duration: "8 meses",
    outcome: "4 APIs em produção",
    modules: ["Node.js", "REST & auth", "SQL", "Arquitetura"],
    stack: ["Node.js", "Express", "PostgreSQL", "Docker"],
  },
  {
    index: "04",
    title: "Mobile",
    description: "Aplicativos para iOS e Android conectados a serviços reais.",
    duration: "7 meses",
    outcome: "3 apps completos",
    modules: ["React Native", "Navegação", "APIs", "Publicação"],
    stack: ["React Native", "Expo", "TypeScript", "Firebase"],
  },
  {
    index: "05",
    title: "IA & Automação",
    description: "Agentes, fluxos inteligentes e automações que resolvem trabalho de verdade.",
    duration: "6 meses",
    outcome: "8 automações reais",
    modules: ["Prompt design", "Agentes", "n8n", "Claude Code"],
    stack: ["OpenAI", "Claude", "n8n", "APIs"],
  },
  {
    index: "06",
    title: "Dados",
    description: "Transforme dados brutos em decisões usando análise e visualização.",
    duration: "6 meses",
    outcome: "5 dashboards",
    modules: ["SQL", "Modelagem", "Power BI", "Storytelling"],
    stack: ["SQL", "Power BI", "Excel", "Python"],
  },
];

const SYSTEM_STEPS = [
  ["01", "Aprenda", "Aulas objetivas e trilhas que mostram exatamente o próximo passo."],
  ["02", "Construa", "Cada conceito vira código funcionando, não anotação esquecida."],
  ["03", "Receba review", "Tutores, comunidade e IA encontram o que você ainda não enxerga."],
  ["04", "Publique", "Deploy, domínio e documentação: seu trabalho precisa existir no mundo."],
  ["05", "Seja visto", "Portfólio, LinkedIn, entrevistas e conexão direta com oportunidades."],
];

const ECOSYSTEM = [
  { Icon: MessageSquareCode, tag: "LIVE", title: "Mentorias semanais", text: "Código, arquitetura e carreira revisados na tela, ao vivo.", featured: true },
  { Icon: Bot, tag: "24/7", title: "Club Agents", text: "Agentes de IA treinados para revisar PRs e destravar dúvidas." },
  { Icon: Users, tag: "30K+", title: "Comunidade", text: "Network com quem está começando, evoluindo e contratando." },
  { Icon: CircleUserRound, tag: "CAREER", title: "Recrutadora", text: "Currículo, LinkedIn e entrevista com feedback profissional." },
  { Icon: Headphones, tag: "7 DAYS", title: "Suporte humano", text: "Gente de verdade respondendo, inclusive aos fins de semana." },
  { Icon: GraduationCap, tag: "MEC", title: "Formação reconhecida", text: "Certificados e caminhos acadêmicos para sua carreira." },
];

const PROJECTS: Array<{ Icon: LucideIcon; path: string; title: string; stack: string; code: string }> = [
  { Icon: Film, path: "/stream", title: "Streaming inteligente", stack: "NEXT · API · AUTH", code: "01" },
  { Icon: ShoppingCart, path: "/commerce", title: "E-commerce completo", stack: "REACT · STRIPE", code: "02" },
  { Icon: Users, path: "/social", title: "Rede em tempo real", stack: "SOCKET · NODE", code: "03" },
  { Icon: LineChart, path: "/fintech", title: "Dashboard financeiro", stack: "TS · CHARTS", code: "04" },
  { Icon: Bot, path: "/agent", title: "Agente com memória", stack: "AI · VECTOR DB", code: "05" },
  { Icon: Smartphone, path: "/delivery", title: "Delivery mobile", stack: "NATIVE · MAPS", code: "06" },
];

const TUTORS = [
  ["RM", "Rodolfo Mori", "Fundador · Full Stack", "SYSTEM"],
  ["FE", "Fernanda", "Front End · UI", "INTERFACE"],
  ["AG", "Agustinho", "Back End · Node", "ENGINE"],
  ["HE", "Henrique", "IA · Automações", "INTELLIGENCE"],
  ["MA", "Márcio", "Mobile", "MOBILITY"],
  ["JU", "Juliana", "Dados · Power BI", "SIGNAL"],
];

const TESTIMONIALS = [
  ["“Em nove meses eu saí do caixa de supermercado para minha primeira vaga front-end.”", "Ana Ribeiro", "front-end @ startup"],
  ["“O review dos projetos fez meu portfólio finalmente parecer trabalho profissional.”", "João Pedro", "back-end · Node"],
  ["“A simulação de entrevista tirou o medo que me travava havia meses.”", "Renata Souza", "dev júnior"],
];

const FAQ = [
  ["Preciso saber programar?", "Não. A trilha inicial começa no absoluto zero e constrói a base antes de avançar para projetos."],
  ["Quanto tempo preciso estudar?", "A recomendação é manter uma rotina de 1 a 2 horas por dia. A plataforma registra seu progresso e mostra o próximo passo."],
  ["Vou ter ajuda quando travar?", "Sim. Você combina suporte humano, comunidade, mentorias semanais e agentes de IA disponíveis 24 horas."],
  ["Os projetos são realmente publicados?", "Sim. Você aprende deploy, documentação e apresentação. O objetivo é terminar com links que um recrutador possa testar."],
  ["Existe preparação para conseguir emprego?", "Sim. Currículo, LinkedIn, portfólio, inglês técnico, simulações de entrevista e acesso a oportunidades fazem parte do sistema."],
];

function DetailHeading({
  label,
  title,
  outline,
  description,
}: {
  label: string;
  title: string;
  outline: string;
  description?: string;
}) {
  return (
    <header className="dc-detail-heading dc-detail-reveal">
      <div><i /><b data-scramble>{label}</b></div>
      <h2>{title}<br /><span>{outline}</span></h2>
      {description && <p>{description}</p>}
    </header>
  );
}

function BrandRail() {
  const companies = ["iFood", "Nubank", "Itaú", "Mercado Livre", "Globo", "Stone", "PicPay", "XP Inc."];
  return (
    <section className="dc-signal-rail" aria-label="Resultados do DevClub">
      <div className="dc-signal-stats dc-detail-reveal">
        <div><b><span data-count="30412">0</span></b><small>alunos no ecossistema</small></div>
        <div><b>+<span data-count="1900">0</span></b><small>contratados em 2025</small></div>
        <div><b><span data-count="97">0</span>%</b><small>recomendam o DevClub</small></div>
        <div><b>24/7</b><small>IA + comunidade</small></div>
      </div>
      <div className="dc-company-rail">
        <span>ALUNOS TRABALHANDO EM</span>
        <div>{[...companies, ...companies].map((company, index) => <b key={`${company}-${index}`}>{company}<i /></b>)}</div>
      </div>
    </section>
  );
}

function FormationSelector() {
  const [active, setActive] = useState(0);
  const formation = FORMATIONS[active];
  const selectTab = (index: number) => {
    const nextIndex = (index + FORMATIONS.length) % FORMATIONS.length;
    setActive(nextIndex);
    document.getElementById(`formation-tab-${nextIndex}`)?.focus();
  };

  return (
    <div className="dc-formation-console">
      <div className="dc-formation-list dc-detail-reveal" role="tablist" aria-label="Formações">
        {FORMATIONS.map((item, index) => (
          <button
            type="button"
            key={item.index}
            className={active === index ? "is-active" : ""}
            onClick={() => setActive(index)}
            onKeyDown={(event) => {
              if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                event.preventDefault();
                selectTab(index + 1);
              } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                event.preventDefault();
                selectTab(index - 1);
              } else if (event.key === "Home") {
                event.preventDefault();
                selectTab(0);
              } else if (event.key === "End") {
                event.preventDefault();
                selectTab(FORMATIONS.length - 1);
              }
            }}
            role="tab"
            id={`formation-tab-${index}`}
            aria-controls="formation-panel"
            aria-selected={active === index}
            tabIndex={active === index ? 0 : -1}
          >
            <span>{item.index}</span><b>{item.title}</b><ArrowRight />
          </button>
        ))}
      </div>
      <article
        className="dc-formation-output dc-detail-reveal"
        id="formation-panel"
        role="tabpanel"
        aria-labelledby={`formation-tab-${active}`}
        tabIndex={0}
      >
        <div className="dc-console-bar"><i /><i /><i /><span>path-selector.config</span><b>ACTIVE</b></div>
        <div className="dc-formation-output-body">
          <span className="dc-terminal-label">SELECTED_PATH / {formation.index}</span>
          <h3>{formation.title}</h3>
          <p>{formation.description}</p>
          <div className="dc-formation-meta">
            <span><small>DURAÇÃO</small><b>{formation.duration}</b></span>
            <span><small>OUTPUT</small><b>{formation.outcome}</b></span>
          </div>
          <div className="dc-module-list">
            {formation.modules.map((module, index) => <span key={module}><i>{index + 1}</i>{module}<Check /></span>)}
          </div>
          <div className="dc-stack-line">{formation.stack.map((item) => <span key={item}>{item}</span>)}</div>
        </div>
      </article>
    </div>
  );
}

function PlatformConsole() {
  return (
    <div className="dc-platform-console dc-detail-reveal">
      <div className="dc-console-bar"><i /><i /><i /><span>app.devclub.com.br/control-room</span><b>ONLINE</b></div>
      <div className="dc-platform-shell">
        <aside>
          <strong>&lt;/&gt;</strong>
          {[Terminal, Layers3, MessageSquareCode, Users].map((Icon, index) => <span className={index === 1 ? "is-active" : ""} key={index}><Icon /></span>)}
          <small>68%</small>
        </aside>
        <main>
          <div className="dc-platform-welcome">
            <div><span>TRILHA FULL STACK</span><h3>Continue compilando.</h3></div>
            <div className="dc-ring-progress"><b>68</b><small>%</small></div>
          </div>
          <div className="dc-lesson-row">
            {[
              ["01", "Arquitetura de APIs", "18 min", true],
              ["02", "Autenticação segura", "24 min", false],
              ["03", "Deploy & observabilidade", "31 min", false],
            ].map(([index, title, time, playing]) => (
              <article className={playing ? "is-playing" : ""} key={String(index)}>
                <span>{index}</span><Play /><div><b>{title}</b><small>{time}</small></div>{playing ? <em>PLAYING</em> : <ArrowRight />}
              </article>
            ))}
          </div>
          <div className="dc-agent-message"><Bot /><div><b>Club Agent</b><p>Revisei seu último PR. A arquitetura está boa; encontrei duas oportunidades de simplificação.</p></div><span>2</span></div>
        </main>
        <section className="dc-platform-side">
          <span>HOJE / AO VIVO</span>
          <div><i /><small>20:00</small><b>Review de portfólio</b><em>sessão ao vivo</em></div>
          <span>SEU SPRINT</span>
          <ul><li><Check />2 aulas concluídas</li><li><Check />1 PR enviado</li><li><i />Deploy pendente</li></ul>
        </section>
      </div>
    </div>
  );
}

function ProjectLab() {
  const [layout, setLayout] = useState<"grade" | "mosaico">("grade");
  const gridRef = useRef<HTMLDivElement>(null);
  const firstLayout = useRef(true);

  useEffect(() => {
    if (firstLayout.current) {
      firstLayout.current = false;
      return;
    }

    const cards = gridRef.current?.querySelectorAll<HTMLElement>(".dc-project-case");
    if (!cards?.length) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ScrollTrigger.refresh();
      return;
    }

    gsap.killTweensOf(cards);
    gsap.fromTo(
      cards,
      { opacity: 0, y: 24, scale: 0.97, rotateX: 0, rotateY: 0 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        duration: 0.55,
        stagger: 0.07,
        ease: "power3.out",
        clearProps: "transform",
        overwrite: "auto",
        onComplete: () => ScrollTrigger.refresh(),
      }
    );
  }, [layout]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = grid.querySelectorAll<HTMLElement>(".dc-project-case");
    const handlers: Array<[HTMLElement, (event: MouseEvent) => void, () => void]> = [];

    cards.forEach((card) => {
      const move = (event: MouseEvent) => {
        const bounds = card.getBoundingClientRect();
        gsap.to(card, {
          rotateX: ((event.clientY - bounds.top) / bounds.height - 0.5) * -7,
          rotateY: ((event.clientX - bounds.left) / bounds.width - 0.5) * 9,
          transformPerspective: 800,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      };
      const leave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.6,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      card.addEventListener("mousemove", move);
      card.addEventListener("mouseleave", leave);
      handlers.push([card, move, leave]);
    });

    return () => {
      handlers.forEach(([card, move, leave]) => {
        card.removeEventListener("mousemove", move);
        card.removeEventListener("mouseleave", leave);
        gsap.killTweensOf(card);
      });
    };
  }, []);

  return (
    <>
      <div className="dc-project-toolbar dc-detail-reveal">
        <span>VISUALIZAÇÃO DO PORTFÓLIO</span>
        <div role="group" aria-label="Alterar visualização dos projetos">
          <button
            type="button"
            className={layout === "grade" ? "is-active" : ""}
            onClick={() => setLayout("grade")}
            aria-pressed={layout === "grade"}
            aria-controls="projGrid"
            data-project-layout="grade"
          >
            <LayoutGrid /> Grade
          </button>
          <button
            type="button"
            className={layout === "mosaico" ? "is-active" : ""}
            onClick={() => setLayout("mosaico")}
            aria-pressed={layout === "mosaico"}
            aria-controls="projGrid"
            data-project-layout="mosaico"
          >
            <PanelsTopLeft /> Mosaico
          </button>
        </div>
      </div>
      <div ref={gridRef} className={`dc-project-lab is-${layout}`} data-project-grid={layout} id="projGrid">
        {PROJECTS.map(({ Icon, path, title, stack, code }) => (
          <article className="dc-project-case dc-detail-card" key={code}>
            <header><span>{path}</span><b>{code}</b></header>
            <Icon />
            <div><small>{stack}</small><h3>{title}</h3><a href="#resultados">VER OUTPUT <ArrowRight /></a></div>
            <i />
          </article>
        ))}
      </div>
    </>
  );
}

function TutorPortrait({ initials, name }: { initials: string; name: string }) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasPhoto = initials === "RM" && !imageFailed;

  return (
    <div className={hasPhoto ? "dc-tutor-portrait has-photo" : "dc-tutor-portrait"}>
      {hasPhoto ? (
        <Image
          src="/tutors/rodolfo.jpg"
          alt={name}
          width={966}
          height={966}
          sizes="(max-width: 700px) 45vw, (max-width: 1000px) 30vw, 16vw"
          onError={() => setImageFailed(true)}
          data-tutor-photo="rodolfo"
        />
      ) : (
        <span>{initials}</span>
      )}
      <i />
    </div>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(0);
  return (
    <div className="dc-new-faq dc-detail-reveal">
      {FAQ.map(([question, answer], index) => (
        <article className={open === index ? "is-open" : ""} key={question}>
          <button
            type="button"
            onClick={() => setOpen(open === index ? -1 : index)}
            aria-expanded={open === index}
            aria-controls={`faq-answer-${index}`}
          >
            <span>{String(index + 1).padStart(2, "0")}</span><b>{question}</b><ChevronDown />
          </button>
          <div id={`faq-answer-${index}`} aria-hidden={open !== index}><p>{answer}</p></div>
        </article>
      ))}
    </div>
  );
}

export default function DeepDiveSections() {
  return (
    <div className="dc-deep-dive">
      <header className="dc-deep-intro">
        <span className="dc-deep-index" data-scramble>EXPLORE DEEPER</span>
        <h2>A experiência termina.<br /><span>O sistema se abre.</span></h2>
        <p>Agora entre em cada camada que transforma estudo em código, código em portfólio e portfólio em oportunidade.</p>
        <div><i /><span>CONTINUE EXPLORANDO</span><ArrowDown /></div>
      </header>

      <BrandRail />

      <section className="dc-detail-section dc-system-section" id="metodo">
        <DetailHeading label="THE SYSTEM" title="Não é curso." outline="É um sistema." description="Conteúdo sozinho não transforma carreira. O que transforma é um ciclo que leva você da teoria ao mercado." />
        <div className="dc-system-grid">
          <div className="dc-system-code dc-detail-reveal">
            <div className="dc-console-bar"><i /><i /><i /><span>career.compiler.ts</span><b>RUNNING</b></div>
            <code>
              <span>01</span><p><b>const</b> carreira = <em>new</em> DevClub();</p>
              <span>02</span><p><b>while</b> (!voce.contratado) {"{"}</p>
              <span>03</span><p>&nbsp;&nbsp;voce.<i>aprende</i>();</p>
              <span>04</span><p>&nbsp;&nbsp;voce.<i>constroi</i>();</p>
              <span>05</span><p>&nbsp;&nbsp;comunidade.<i>revisa</i>(voce);</p>
              <span>06</span><p>{"}"}</p>
              <span>07</span><p><b>return</b> <strong>&quot;CONTRATADO&quot;</strong>;</p>
            </code>
            <footer><Check /> build completed <span>12 months</span></footer>
          </div>
          <div className="dc-system-steps">
            {SYSTEM_STEPS.map(([index, title, text]) => (
              <article className="dc-detail-card" key={index}><span>{index}</span><div><b>{title}</b><p>{text}</p></div><i /></article>
            ))}
          </div>
        </div>
      </section>

      <section className="dc-detail-section" id="formacoes-completas">
        <DetailHeading label="PATH SELECTOR" title="Uma base." outline="Seis direções." description="Não escolha pela moda. Explore cada caminho, veja o output e encontre a formação que combina com o futuro que você quer construir." />
        <FormationSelector />
      </section>

      <section className="dc-detail-section dc-ecosystem-section" id="ecossistema">
        <DetailHeading label="SUPPORT NETWORK" title="O código é seu." outline="A evolução é coletiva." description="Ao redor de cada aluno existe uma rede desenhada para remover bloqueios técnicos, profissionais e humanos." />
        <div className="dc-ecosystem-grid">
          {ECOSYSTEM.map(({ Icon, tag, title, text, featured }) => (
            <article className={`dc-ecosystem-card dc-detail-card${featured ? " is-featured" : ""}`} key={title}>
              <span>{tag}</span><Icon /><h3>{title}</h3><p>{text}</p>
              {featured && <div><i /><b>PRÓXIMA SESSÃO</b><small>Quinta · 20:00</small></div>}
            </article>
          ))}
        </div>
      </section>

      <section className="dc-detail-section dc-platform-detail" id="plataforma-completa">
        <DetailHeading label="CONTROL ROOM" title="Tudo conectado." outline="Nada perdido." description="Uma plataforma que entende onde você está, o que vem agora e de quem você precisa para continuar." />
        <PlatformConsole />
      </section>

      <section className="dc-detail-section" id="projetos-completos">
        <DetailHeading label="PROOF OF WORK" title="Menos certificado." outline="Mais evidência." description="Seis produtos que mostram como você pensa, constrói, resolve e entrega." />
        <ProjectLab />
      </section>

      <section className="dc-detail-section dc-results-section" id="resultados">
        <DetailHeading label="HUMAN OUTPUT" title="Não são números." outline="São novas versões." />
        <div className="dc-results-grid">
          <blockquote className="dc-feature-story dc-detail-reveal">
            <span>CASE / 001</span>
            <p>“Eu era auxiliar administrativo ganhando um salário mínimo. Em onze meses consegui minha primeira vaga como dev e dobrei minha renda.”</p>
            <footer><b>VT</b><div><strong>Vicente Talento</strong><small>dev júnior · contratado em 2025</small></div><em>+100% RENDA</em></footer>
          </blockquote>
          <div className="dc-story-stack">
            {TESTIMONIALS.map(([quote, name, role], index) => (
              <blockquote className="dc-detail-card" key={name}><span>0{index + 2}</span><p>{quote}</p><footer><b>{name}</b><small>{role}</small></footer></blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="dc-detail-section" id="tutores-completos">
        <DetailHeading label="HUMAN LAYER" title="Tecnologia acelera." outline="Pessoas direcionam." description="Aprenda com profissionais que constroem, revisam e contratam no mercado real." />
        <div className="dc-tutor-system">
          {TUTORS.map(([initials, name, role, signal], index) => (
            <article className="dc-tutor-node dc-detail-card" key={initials}>
              <TutorPortrait initials={initials} name={name} />
              <small>NODE / 0{index + 1}</small><h3>{name}</h3><p>{role}</p><b>{signal}</b>
            </article>
          ))}
        </div>
      </section>

      <section className="dc-detail-section dc-market-section" id="mercado-completo">
        <DetailHeading label="CAREER TELEMETRY" title="Aprender é input." outline="Carreira é output." description="O objetivo final não é acumular horas de vídeo. É aumentar sua capacidade de criar valor — e ser reconhecido por isso." />
        <div className="dc-market-console">
          <div className="dc-market-numbers dc-detail-reveal">
            <span><small>ALUNOS</small><b><i data-count="30412">0</i></b><em>↑ comunidade ativa</em></span>
            <span><small>CONTRATADOS / 2025</small><b>+<i data-count="1900">0</i></b><em>↑ novas carreiras</em></span>
            <span><small>RECOMENDAÇÃO</small><b><i data-count="97">0</i>%</b><em>↑ confiança</em></span>
          </div>
          <div className="dc-salary-chart dc-detail-reveal">
            <header><span>REMUNERAÇÃO ANUAL / BRASIL × REMOTO</span><b>LIVE DATA</b></header>
            {[
              ["JÚNIOR", "34%", "52%", "R$ 70,8K", "R$ 135K"],
              ["PLENO", "55%", "72%", "R$ 140K", "R$ 201K"],
              ["SÊNIOR", "70%", "88%", "R$ 196K", "R$ 307K"],
            ].map(([level, br, world, brValue, worldValue]) => (
              <div key={level}><b>{level}</b><span><i style={{ width: br }}><em>{brValue}</em></i><i style={{ width: world }}><em>{worldValue}</em></i></span></div>
            ))}
            <footer><span><i />BRASIL</span><span><i />INTERNACIONAL / REMOTO</span></footer>
          </div>
        </div>
      </section>

      <section className="dc-detail-section dc-faq-section" id="faq">
        <DetailHeading label="OPEN QUESTIONS" title="Sem mistério." outline="Sem letra miúda." />
        <FAQSection />
      </section>

      <section className="dc-new-final" id="cta">
        <div className="dc-final-orbit" aria-hidden="true"><i /><i /><i /></div>
        <span data-scramble>READY TO COMPILE</span>
        <h2>Sua próxima versão<br /><b>começa agora.</b></h2>
        <p>Entre para o DevClub e transforme estudo em código, código em portfólio e portfólio em oportunidade.</p>
        <a href="#formacoes-completas">Escolher minha formação <ArrowRight /></a>
        <small>acesso imediato · suporte 7 dias · garantia incondicional</small>
      </section>

      <footer className="dc-new-footer">
        <a href="#inicio"><span>&lt;/&gt;</span><b>DevClub</b></a>
        <p>Do zero ao contratado.</p>
        <nav><a href="#metodo">Método</a><a href="#formacoes-completas">Formações</a><a href="#projetos-completos">Projetos</a><a href="#faq">FAQ</a></nav>
        <small>© 2026 DevClub · feito com código e café</small>
      </footer>
    </div>
  );
}
