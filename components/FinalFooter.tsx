"use client";
import { useEffect } from "react";
import { gsap } from "gsap";

export function FinalCta() {
  return (
    <section className="final" id="cta">
      <div className="wrap">
        <span className="eyebrow rv" style={{ display: "inline-block" }}>Comece hoje</span>
        <h2 className="rv">Sua vida dev começa com <span className="grad-text">um clique</span></h2>
        <p className="rv">Entre pra maior comunidade de programação do Brasil e saia com portfólio, network e emprego.</p>
        <div className="rv">
          <a className="btn btn-primary btn-lg magnet" href="#" data-hover style={{ fontSize: 18, padding: "20px 44px" }}>
            <span className="sh" />Quero ser aluno
          </a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  /* as tags "você"/"Rodolfo" pulam entre os pontos, como cursores do Figma */
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const tweens: gsap.core.Tween[] = [];
    tweens.push(
      gsap.from("#giant", {
        yPercent: 45, opacity: 0,
        scrollTrigger: { trigger: "#giantWrap", start: "top 96%", end: "top 55%", scrub: 1 },
      })
    );
    const spots = [[14, 30], [38, 12], [63, 64], [86, 26]];
    const move = (id: string, offset: number) => {
      let i = offset;
      const hop = () => {
        i = (i + 1) % spots.length;
        tweens.push(
          gsap.to("#" + id, {
            left: spots[i][0] + "%", top: spots[i][1] + "%",
            duration: 1.6, ease: "power2.inOut", delay: 1.2, onComplete: hop,
          })
        );
      };
      hop();
    };
    move("vt1", 0);
    move("vt2", 2);
    return () => tweens.forEach((t) => t.kill());
  }, []);

  return (
    <footer>
      <div className="wrap foot-grid">
        <div className="foot-brand">
          <a className="logo" href="#"><span className="mark">&lt;/&gt;</span>DevClub</a>
          <p>A maior comunidade de programação do Brasil. Do zero ao contratado.</p>
        </div>
        <div><h5>Formações</h5><ul><li><a href="#" data-hover>Full Stack</a></li><li><a href="#" data-hover>Front End</a></li><li><a href="#" data-hover>Back End</a></li><li><a href="#" data-hover>IA &amp; Automações</a></li></ul></div>
        <div><h5>Institucional</h5><ul><li><a href="#" data-hover>Quem somos</a></li><li><a href="#" data-hover>Faculdade</a></li><li><a href="#" data-hover>Vagas</a></li><li><a href="#" data-hover>Blog</a></li></ul></div>
        <div><h5>Contato</h5><ul><li><a href="#" data-hover>Suporte</a></li><li><a href="#" data-hover>Instagram</a></li><li><a href="#" data-hover>YouTube</a></li><li><a href="#" data-hover>LinkedIn</a></li></ul></div>
      </div>
      <div className="giant-wrap" id="giantWrap">
        <div className="giant" id="giant">DevClub</div>
        <span className="v-dot" style={{ left: "14%", top: "30%" }} />
        <span className="v-dot" style={{ left: "38%", top: "12%" }} />
        <span className="v-dot" style={{ left: "63%", top: "64%" }} />
        <span className="v-dot" style={{ left: "86%", top: "26%" }} />
        <span className="v-tag" id="vt1" style={{ left: "14%", top: "30%" }}>você</span>
        <span className="v-tag t2" id="vt2" style={{ left: "86%", top: "26%" }}>Rodolfo</span>
      </div>
      <div className="wrap foot-bottom">
        <span>© 2026 DevClub — todos os direitos reservados</span>
        <span>feito com &lt;/&gt; e café</span>
      </div>
    </footer>
  );
}
