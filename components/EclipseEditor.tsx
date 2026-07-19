"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TechTicker } from "./Marquees";

/* código exibido no editor (tokens já com classes de highlight) */
const CODE = [
  `<i class="tk-cm">// SuaCarreira.tsx — build ao vivo</i>`,
  `<i class="tk-kw">const</i> <i class="tk-var">aluno</i> = { nome: <i class="tk-str">"você"</i>, nivel: <i class="tk-str">"zero"</i> };`,
  ``,
  `<i class="tk-kw">while</i> (aluno.nivel !== <i class="tk-str">"contratado"</i>) {`,
  `&nbsp;&nbsp;aluno.<i class="tk-fn">estuda</i>();`,
  `&nbsp;&nbsp;aluno.<i class="tk-fn">constroi</i>();`,
  `&nbsp;&nbsp;aluno.<i class="tk-fn">evolui</i>();  <i class="tk-cm">// com mentoria + IA</i>`,
  `}`,
  ``,
  `<i class="tk-kw">return</i> &lt;<i class="tk-tag">SeuFuturo</i> status=<i class="tk-str">"DEV"</i> /&gt;;`,
];

export default function EclipseEditor() {
  const zoneRef = useRef<HTMLElement>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const codeRef = useRef<HTMLDivElement>(null);
  const outRef = useRef<HTMLDivElement>(null);
  const renderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const box = codeRef.current!, out = outRef.current!, render = renderRef.current!;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const addLine = (html: string, idx: number) => {
      const div = document.createElement("div");
      div.className = "l";
      div.innerHTML = `<span class="n">${idx + 1}</span><span class="c">${html}</span>`;
      box.appendChild(div);
      return div.querySelector(".c") as HTMLElement;
    };
    const typeCode = (instant: boolean) => {
      if (instant) {
        CODE.forEach((l, i) => addLine(l, i));
        out.style.visibility = "visible";
        render.style.opacity = "1";
        render.style.transform = "none";
        return;
      }
      let li = 0;
      const nextLine = () => {
        if (li >= CODE.length) {
          out.style.visibility = "visible";
          gsap.from(out, { opacity: 0, y: 6, duration: 0.4 });
          gsap.to(render, { opacity: 1, scale: 1, duration: 0.55, ease: "back.out(1.6)", delay: 0.35 });
          return;
        }
        const target = addLine("", li);
        const tokens = CODE[li].split(/(<[^>]+>|&nbsp;)/g).filter(Boolean);
        let ti = 0, acc = "";
        const nextTok = () => {
          if (ti >= tokens.length) { li++; timers.push(setTimeout(nextLine, 60)); return; }
          const tk = tokens[ti];
          if (tk.startsWith("<") || tk === "&nbsp;") { acc += tk; target.innerHTML = acc; ti++; nextTok(); }
          else {
            let ci = 0;
            const typeChar = () => {
              acc += tk[ci];
              target.innerHTML = acc + '<span class="caret"></span>';
              ci++;
              if (ci < tk.length) timers.push(setTimeout(typeChar, 14));
              else { target.innerHTML = acc; ti++; nextTok(); }
            };
            typeChar();
          }
        };
        nextTok();
      };
      nextLine();
    };

    /* digita só quando o editor entra em cena, uma única vez */
    let typed = false;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting && !typed) { typed = true; typeCode(reduced); io.disconnect(); }
      });
    }, { threshold: 0.4 });
    io.observe(editorRef.current!);

    const tweens: gsap.core.Tween[] = [];
    if (!reduced) {
      tweens.push(
        gsap.from(editorRef.current, {
          y: 120, opacity: 0, ease: "power3.out",
          scrollTrigger: { trigger: zoneRef.current, start: "top 70%", end: "top 20%", scrub: 1 },
        }),
        gsap.from([".ecl-arc", ".ecl-core", ".ecl-bloom"], {
          opacity: 0, ease: "none",
          scrollTrigger: { trigger: zoneRef.current, start: "top 85%", end: "top 30%", scrub: 1 },
        }),
        gsap.to(".ecl-core", { scaleX: 1.16, opacity: 0.85, duration: 2.6, yoyo: true, repeat: -1, ease: "sine.inOut" })
      );
      gsap.utils.toArray<HTMLElement>(".orbit").forEach((o, i) =>
        tweens.push(gsap.to(o, { rotate: i % 2 ? 360 : -360, duration: 80 + i * 30, repeat: -1, ease: "none" }))
      );
    }
    return () => { io.disconnect(); timers.forEach(clearTimeout); tweens.forEach((t) => t.kill()); };
  }, []);

  return (
    <section className="eclipse-zone" ref={zoneRef}>
      <div className="orbit o1"><i style={{ top: "8%", left: "50%" }} /><i style={{ top: "70%", left: "6%" }} /></div>
      <div className="orbit o2"><i style={{ top: "2%", left: "30%" }} /><i style={{ top: "55%", left: "97%" }} /></div>
      <div className="orbit o3"><i style={{ top: "14%", left: "80%" }} /></div>
      <div className="ecl-bloom" />
      <div className="ecl-arc" />
      <div className="ecl-core" />
      <div className="wrap ecl-content">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="eyebrow rv">Feito por quem programa</span>
          <h2 className="sec-title rv" style={{ margin: "0 auto" }}>
            Seu futuro, <span className="grad-text">compilando agora</span>
          </h2>
        </div>
        <div className="editor" ref={editorRef} aria-label="Editor de código animado">
          <div className="ed-bar">
            <span className="ed-tab on">SuaCarreira.tsx</span>
            <span className="ed-tab">jornada.md</span>
            <div className="ed-dots"><i /><i /><i /></div>
          </div>
          <div className="ed-code" ref={codeRef} />
          <div className="ed-out" ref={outRef} style={{ visibility: "hidden" }}>
            <span className="ok">✓</span>&nbsp;build concluído em <span className="ok">0.8s</span> — 0 erros, 1 vida transformada
          </div>
          <div className="ed-render" ref={renderRef}>
            <span className="chip">status: DEV ●</span>
            <span style={{ fontFamily: "var(--mono)", fontSize: 12.5, color: "var(--muted)" }}>
              renderizado por você, com a gente
            </span>
          </div>
        </div>
      </div>
      <TechTicker />
    </section>
  );
}
