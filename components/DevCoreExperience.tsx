"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Bot,
  Braces,
  Check,
  Code2,
  Database,
  GitBranch,
  Layers3,
  Menu,
  MessageSquareCode,
  Network,
  Play,
  Rocket,
  Sparkles,
  Terminal,
  Users,
  X,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { ParticleEngine } from "@/lib/particle-engine";
import { displayFontFamily } from "@/lib/fonts";
import ParticleBoot from "@/components/ParticleBoot";
import DeepDiveSections from "@/components/DeepDiveSections";

gsap.registerPlugin(ScrollTrigger);

const SCENES = [
  { id: "inicio", nav: "Initialize", particle: "</>" },
  { id: "quem-somos", nav: "Manifest", particle: "DEV" },
  { id: "formacoes", nav: "Build stack", particle: "STACK" },
  { id: "jornada", nav: "Pipeline", particle: "01→05" },
  { id: "plataforma", nav: "Never alone", particle: "LIVE" },
  { id: "alunos", nav: "Proof of work", particle: "BUILD" },
  { id: "mercado", nav: "Market", particle: "MATCH" },
  { id: "tutores", nav: "Join the club", particle: "CLUB" },
] as const;

const FORMATIONS = [
  ["01", "Full Stack", "front + back + deploy"],
  ["02", "Front End", "interfaces que contratam"],
  ["03", "Back End", "APIs, dados e arquitetura"],
  ["04", "Mobile", "iOS + Android"],
  ["05", "IA & Automação", "agentes, Claude e n8n"],
  ["06", "Dados", "SQL, análise e Power BI"],
];

const JOURNEY = [
  ["DIA 001", "Primeira linha"],
  ["MÊS 003", "Primeiro deploy"],
  ["MÊS 006", "Portfólio real"],
  ["MÊS 009", "Modo entrevista"],
  ["MÊS 012", "Contratado"],
];

const COMPANIES = ["iFood", "Nubank", "Itaú", "Mercado Livre", "Globo", "Stone", "PicPay", "XP"];

const TUTORS = [
  ["RM", "Rodolfo Mori", "fundador · full stack"],
  ["FE", "Fernanda", "front end · UI"],
  ["AG", "Agustinho", "back end · Node"],
  ["HE", "Henrique", "IA · automações"],
  ["MA", "Márcio", "mobile"],
  ["JU", "Juliana", "dados · Power BI"],
];

function SceneNumber({ index, label }: { index: number; label: string }) {
  return (
    <div className="dc-kicker dc-reveal">
      <span>{String(index + 1).padStart(2, "0")}</span>
      <i />
      <b>{label}</b>
    </div>
  );
}

function CoreArtifact({ active }: { active: number }) {
  return (
    <div className={`dc-artifact dc-artifact--${active}`} aria-hidden="true">
      <div className="dc-core-aura" />
      <div className="dc-core-orbit dc-core-orbit--outer">
        <i /><i /><i />
      </div>
      <div className="dc-core-orbit dc-core-orbit--inner">
        <i /><i />
      </div>
      <div className="dc-core-center">
        <span>&lt;/&gt;</span>
        <small>{SCENES[active].nav}</small>
      </div>

      <div className="dc-artifact-panel dc-artifact-manifest">
        <div className="dc-panel-bar"><i /><i /><i /><span>manifesto.ts</span></div>
        <code>
          <b>const</b> futuro = <em>await</em> voce
          <br />&nbsp;&nbsp;.<span>estudar</span>()
          <br />&nbsp;&nbsp;.<span>construir</span>()
          <br />&nbsp;&nbsp;.<span>evoluir</span>();
        </code>
        <small>✓ build concluído</small>
      </div>

      <div className="dc-artifact-panel dc-artifact-stack">
        {["React", "Node.js", "TypeScript", "SQL", "IA", "n8n"].map((tech, i) => (
          <span key={tech} style={{ "--i": i } as React.CSSProperties}>{tech}</span>
        ))}
      </div>

      <div className="dc-artifact-panel dc-artifact-pipeline">
        {JOURNEY.map(([time], i) => (
          <span key={time} className={i <= 3 ? "done" : ""}>
            <i>{i < 4 ? <Check size={11} /> : "5"}</i>
            <b>{time}</b>
          </span>
        ))}
        <em />
      </div>

      <div className="dc-artifact-panel dc-artifact-platform">
        <div className="dc-panel-bar"><i /><i /><i /><span>app.devclub.com.br/trilhas</span></div>
        <div className="dc-platform-body">
          <aside><b>DC</b><i /><i /><i /><i /></aside>
          <main>
            <small>FORMAÇÃO FULL STACK</small>
            <strong>Continue de onde parou.</strong>
            <div className="dc-platform-progress"><i /></div>
            <div className="dc-platform-grid">
              <span><Play size={14} />Fundamentos</span>
              <span><Code2 size={14} />Projeto real</span>
              <span><Bot size={14} />Club Agent</span>
            </div>
          </main>
        </div>
        <div className="dc-float-note dc-float-note--top"><Bot size={13} /> PR revisado · 2 sugestões</div>
        <div className="dc-float-note dc-float-note--bottom"><Check size={13} /> Trilha concluída · 68%</div>
      </div>

      <div className="dc-artifact-panel dc-artifact-projects">
        {[
          ["/cine", "Streaming", "NEXT"],
          ["/cart", "E-commerce", "REACT"],
          ["/agent", "Agente de IA", "NODE"],
          ["/bank", "Fintech", "TS"],
        ].map(([path, name, tag], i) => (
          <div key={path} style={{ "--i": i } as React.CSSProperties}>
            <small>{path}</small>
            <Layers3 />
            <b>{name}</b>
            <span>{tag} · NO AR</span>
          </div>
        ))}
      </div>

      <div className="dc-artifact-panel dc-artifact-market">
        <Network className="dc-network-icon" />
        {COMPANIES.map((company, i) => (
          <span key={company} style={{ "--i": i } as React.CSSProperties}>
            <i />{company}
          </span>
        ))}
        <strong>CONECTADO</strong>
      </div>

      <div className="dc-artifact-panel dc-artifact-community">
        {TUTORS.map(([initials, name], i) => (
          <span key={initials} style={{ "--i": i } as React.CSSProperties}>
            <b>{initials}</b><small>{name}</small>
          </span>
        ))}
        <div><Users /><b>30.412</b><small>devs conectados</small></div>
      </div>
    </div>
  );
}

function GlobalNav({
  menuOpen,
  onMenu,
}: {
  menuOpen: boolean;
  onMenu: () => void;
}) {
  return (
    <nav className="dc-nav" aria-label="Navegação principal">
      <a className="dc-logo" href="#inicio">
        <span>&lt;/&gt;</span>
        <b>DevClub</b>
      </a>
      <div className={`dc-nav-links${menuOpen ? " is-open" : ""}`}>
        <a href="#quem-somos" onClick={onMenu}>Quem somos</a>
        <a href="#formacoes" onClick={onMenu}>Formações</a>
        <a href="#alunos" onClick={onMenu}>Alunos</a>
        <a href="#tutores" onClick={onMenu}>Tutores</a>
      </div>
      <div className="dc-nav-actions">
        <span className="dc-online"><i />30.412 devs</span>
        <a className="dc-nav-cta" href="#tutores">Quero ser aluno <ArrowRight size={15} /></a>
        <button className="dc-menu" onClick={onMenu} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
}

export default function DevCoreExperience() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  /** boot em partículas concluído — só então o site fica visível/rolável */
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canvas = canvasRef.current!;
    const engine = new ParticleEngine(canvas, {
      fontFamily: displayFontFamily(),
      reduced,
    });
    let lastScroll = window.scrollY;
    let lenis: Lenis | null = null;
    let lenisRaf = 0;

    const boot = () => {
      engine.resize();
      engine.start();
      if (!reduced) {
        gsap.to(engine, { gather: 0.006, duration: 2.8, ease: "power2.in", delay: 0.25 });
        lenis = new Lenis({
          duration: 1.1,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });
        lenis.on("scroll", ScrollTrigger.update);
        const raf = (time: number) => {
          lenis?.raf(time);
          lenisRaf = requestAnimationFrame(raf);
        };
        lenisRaf = requestAnimationFrame(raf);
      }
      setLoaded(true);
    };

    const changeScene = (index: number) => {
      if (activeRef.current === index) return;
      activeRef.current = index;
      setActive(index);
      engine.setText(SCENES[index].particle);
    };

    const ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>(".dc-scene").forEach((scene, index) => {
        ScrollTrigger.create({
          trigger: scene,
          start: "top 52%",
          end: "bottom 48%",
          onEnter: () => changeScene(index),
          onEnterBack: () => changeScene(index),
        });
        if (!reduced) {
          gsap.fromTo(
            scene.querySelectorAll(".dc-reveal"),
            { autoAlpha: 0, y: 46, filter: "blur(9px)" },
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              stagger: 0.08,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: { trigger: scene, start: "top 68%", toggleActions: "play none none reverse" },
            }
          );
        }
      });

      const deepRevealItems = gsap.utils.toArray<HTMLElement>(".dc-detail-reveal");
      const deepGridItems = gsap.utils.toArray<HTMLElement>(".dc-detail-card");
      if (reduced) {
        [...deepRevealItems, ...deepGridItems].forEach((element) => {
          gsap.set(element, { autoAlpha: 1, y: 0, scale: 1, filter: "none" });
        });
      } else {
        deepRevealItems.forEach((element) => {
          gsap.to(element, {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          });
        });
        ScrollTrigger.batch(deepGridItems, {
          start: "top 90%",
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              duration: 0.75,
              stagger: 0.07,
              ease: "power3.out",
            }),
        });
      }

      document.querySelectorAll<HTMLElement>(".dc-deep-dive [data-count]").forEach((element) => {
        const target = Number(element.dataset.count ?? 0);
        if (reduced) {
          element.textContent = target.toLocaleString("pt-BR");
          return;
        }
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 92%", once: true },
          onUpdate: () => {
            element.textContent = Math.floor(counter.value).toLocaleString("pt-BR");
          },
        });
      });

      ScrollTrigger.create({
        trigger: experienceRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          document.documentElement.style.setProperty("--dc-progress", `${self.progress * 100}%`);
          document.documentElement.style.setProperty("--dc-scroll", self.progress.toFixed(4));
        },
      });
    }, experienceRef);

    const onMove = (event: PointerEvent) => {
      engine.setPointer(event.clientX, event.clientY);
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    };
    const onLeave = () => engine.clearPointer();
    const onScroll = () => {
      engine.scrollWind += window.scrollY - lastScroll;
      lastScroll = window.scrollY;
    };
    const onClick = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest("a, button")) return;
      const [x, y] = engine.toLocal(event.clientX, event.clientY);
      engine.explode(x, y);
      engine.nextTheme();
    };
    const onResize = () => {
      engine.resize();
      ScrollTrigger.refresh();
    };

    (document.fonts?.ready ?? Promise.resolve()).then(boot);
    addEventListener("pointermove", onMove);
    addEventListener("pointerleave", onLeave);
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onResize);
    experienceRef.current?.addEventListener("click", onClick);

    return () => {
      engine.stop();
      lenis?.destroy();
      cancelAnimationFrame(lenisRaf);
      ctx.revert();
      removeEventListener("pointermove", onMove);
      removeEventListener("pointerleave", onLeave);
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onResize);
      experienceRef.current?.removeEventListener("click", onClick);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("dc-menu-open", menuOpen);
    return () => document.body.classList.remove("dc-menu-open");
  }, [menuOpen]);

  return (
    <main className={`dc-experience${loaded ? " is-loaded" : ""}`} ref={experienceRef}>
      {!booted && <ParticleBoot onDone={() => setBooted(true)} />}

      <div className="dc-progress" />
      <div className="dc-grid" aria-hidden="true" />
      <div className="dc-pointer-glow" aria-hidden="true" />
      <GlobalNav menuOpen={menuOpen} onMenu={() => setMenuOpen((value) => !value)} />

      <div className={`dc-stage dc-stage--${active}`} aria-hidden="true">
        <canvas ref={canvasRef} className="dc-particles" />
        <CoreArtifact active={active} />
      </div>

      <div className="dc-track">
        <section className="dc-scene dc-scene--hero" id="inicio" data-scene="0">
          <div className="dc-copy">
            <SceneNumber index={0} label="initialize" />
            <h1 className="dc-reveal">
              Seu futuro<br />
              <span>não vem pronto.</span>
              <strong>Você compila.</strong>
            </h1>
            <p className="dc-lead dc-reveal">
              Do zero ao contratado, com formação, projetos, mentoria, IA e a maior comunidade de programação do Brasil.
            </p>
            <div className="dc-actions dc-reveal">
              <a className="dc-button dc-button--primary" href="#formacoes">
                Começar minha jornada <ArrowRight />
              </a>
              <a className="dc-button dc-button--ghost" href="#quem-somos">
                <Play /> Explorar o DevClub
              </a>
            </div>
            <div className="dc-proof dc-reveal">
              <div><span>AL</span><span>JP</span><span>MR</span><span>+</span></div>
              <p><b>30.412 pessoas</b> já iniciaram essa transformação</p>
            </div>
          </div>
          <a className="dc-scroll-cue" href="#quem-somos"><span>Role para compilar</span><ArrowDown /></a>
        </section>

        <section className="dc-scene dc-scene--right" id="quem-somos" data-scene="1">
          <div className="dc-copy">
            <SceneNumber index={1} label="manifest" />
            <h2 className="dc-reveal">Não somos<br /><span>mais um curso.</span></h2>
            <div className="dc-manifest dc-reveal">
              <p>Tutorial não te contrata.</p>
              <p><strong>Portfólio contrata.</strong></p>
              <p>Aqui você não assiste sua carreira acontecer. Você constrói — projeto por projeto.</p>
            </div>
            <div className="dc-inline-stat dc-reveal"><b>30.412</b><span>pessoas construindo<br />a próxima versão</span></div>
          </div>
        </section>

        <section className="dc-scene" id="formacoes" data-scene="2">
          <div className="dc-copy">
            <SceneNumber index={2} label="build your stack" />
            <h2 className="dc-reveal">Uma base.<br /><span>Muitos caminhos.</span></h2>
            <p className="dc-lead dc-reveal">Escolha sua trilha. O núcleo é o mesmo: aprender construindo o que o mercado usa.</p>
            <div className="dc-formations dc-reveal">
              {FORMATIONS.map(([number, title, description]) => (
                <a href="#jornada" key={number}>
                  <span>{number}</span><b>{title}</b><small>{description}</small><ArrowRight />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="dc-scene dc-scene--right" id="jornada" data-scene="3">
          <div className="dc-copy">
            <SceneNumber index={3} label="career pipeline" />
            <h2 className="dc-reveal">12 meses.<br /><span>Uma evolução contínua.</span></h2>
            <div className="dc-journey-list dc-reveal">
              {JOURNEY.map(([time, title], index) => (
                <div key={time} className={index === 4 ? "is-success" : ""}>
                  <i>{index === 4 ? <Check /> : `0${index + 1}`}</i>
                  <span><small>{time}</small><b>{title}</b></span>
                </div>
              ))}
            </div>
            <div className="dc-build-success dc-reveal"><Terminal /> BUILD SUCCESSFUL <span>status: contratado</span></div>
          </div>
        </section>

        <section className="dc-scene" id="plataforma" data-scene="4">
          <div className="dc-copy">
            <SceneNumber index={4} label="never code alone" />
            <h2 className="dc-reveal">Você nunca<br /><span>programa sozinho.</span></h2>
            <p className="dc-lead dc-reveal">Uma estrutura inteira permanece ao seu lado quando o código trava — e quando a carreira precisa avançar.</p>
            <div className="dc-support-grid dc-reveal">
              <span><MessageSquareCode /><b>Mentorias</b><small>semanais e ao vivo</small></span>
              <span><Bot /><b>Club Agents</b><small>IA disponível 24h</small></span>
              <span><Users /><b>Comunidade</b><small>a maior do Brasil</small></span>
              <span><Sparkles /><b>Carreira</b><small>recrutadora e inglês</small></span>
            </div>
          </div>
        </section>

        <section className="dc-scene dc-scene--right" id="alunos" data-scene="5">
          <div className="dc-copy">
            <SceneNumber index={5} label="proof of work" />
            <h2 className="dc-reveal">Seu código<br /><span>vira prova.</span></h2>
            <p className="dc-lead dc-reveal">Você não termina com um certificado na gaveta. Termina com projetos que um recrutador pode abrir, testar e avaliar.</p>
            <blockquote className="dc-testimonial dc-reveal">
              “Saí do caixa de supermercado para minha primeira vaga como front-end em nove meses.”
              <footer><span>AR</span><p><b>Ana Ribeiro</b><small>front-end · contratada em 2025</small></p></footer>
            </blockquote>
            <div className="dc-project-metric dc-reveal"><b>6+</b><span>projetos reais<br />no portfólio</span></div>
          </div>
        </section>

        <section className="dc-scene" id="mercado" data-scene="6">
          <div className="dc-copy">
            <SceneNumber index={6} label="connected to the market" />
            <h2 className="dc-reveal">O mercado<br /><span>reconhece.</span></h2>
            <div className="dc-metrics dc-reveal">
              <div><b>30.412</b><span>alunos</span></div>
              <div><b>+1.900</b><span>contratados em 2025</span></div>
              <div><b>97%</b><span>recomendam</span></div>
            </div>
            <p className="dc-company-label dc-reveal">ALUNOS CONECTADOS ÀS MAIORES EMPRESAS</p>
            <div className="dc-company-list dc-reveal">
              {COMPANIES.map((company) => <span key={company}>{company}</span>)}
            </div>
          </div>
        </section>

        <section className="dc-scene dc-scene--right dc-scene--final" id="tutores" data-scene="7">
          <div className="dc-copy">
            <SceneNumber index={7} label="join the club" />
            <h2 className="dc-reveal">Aprenda com quem<br /><span>constrói o mercado.</span></h2>
            <div className="dc-tutor-list dc-reveal">
              {TUTORS.slice(0, 4).map(([initials, name, role]) => (
                <div key={initials}><span>{initials}</span><p><b>{name}</b><small>{role}</small></p></div>
              ))}
            </div>
            <div className="dc-final-cta dc-reveal">
              <p>AGORA É A SUA VEZ.</p>
              <a className="dc-button dc-button--primary" href="mailto:contato@devclub.com.br">
                Quero ser o próximo contratado <ArrowRight />
              </a>
              <small>acesso imediato · suporte 7 dias · garantia de 7 dias</small>
            </div>
          </div>
        </section>
      </div>

      <DeepDiveSections />
    </main>
  );
}
