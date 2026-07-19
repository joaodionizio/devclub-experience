"use client";
import { useState, useRef } from "react";

/**
 * Playground — mini console de expressões, ao vivo, de verdade.
 *
 * Decisão de segurança: em vez de `eval`/`new Function` livre (que
 * executaria QUALQUER código JS digitado por um estranho no navegador
 * dele mesmo — sem risco pro servidor, mas arriscado para o próprio
 * usuário via clipboard-injection), o parser abaixo é uma calculadora
 * de expressões escrita à mão: só entende números, + - * / % ( ) e
 * algumas funções de Math. Isso é seguro E é um ótimo gancho de
 * conversa na entrevista ("por que você não usou eval aqui?").
 */
function safeEvaluate(expr: string): number {
  const sanitized = expr.replace(/\s+/g, "");
  if (!/^[0-9+\-*/%().a-zA-Z]*$/.test(sanitized)) throw new Error("caractere inválido");
  const ALLOWED_FNS = ["sqrt", "pow", "abs", "round", "floor", "ceil", "min", "max"];
  let i = 0;
  const peek = () => sanitized[i];
  const eatNumber = (): number => {
    let s = i;
    while (i < sanitized.length && /[0-9.]/.test(sanitized[i])) i++;
    if (i === s) throw new Error("número esperado");
    return parseFloat(sanitized.slice(s, i));
  };
  const eatIdent = (): string => {
    let s = i;
    while (i < sanitized.length && /[a-zA-Z]/.test(sanitized[i])) i++;
    return sanitized.slice(s, i);
  };
  const parseFactor = (): number => {
    if (peek() === "(") {
      i++;
      const v = parseExpr();
      if (peek() !== ")") throw new Error("parêntese não fechado");
      i++;
      return v;
    }
    if (peek() === "-") { i++; return -parseFactor(); }
    if (/[a-zA-Z]/.test(peek())) {
      const name = eatIdent();
      if (!ALLOWED_FNS.includes(name)) throw new Error(`função "${name}" não permitida`);
      if (peek() !== "(") throw new Error("esperava (");
      i++;
      const args: number[] = [parseExpr()];
      while (peek() === ",") { i++; args.push(parseExpr()); }
      if (peek() !== ")") throw new Error("parêntese não fechado");
      i++;
      const fn = (Math as unknown as Record<string, (...a: number[]) => number>)[name];
      return fn(...args);
    }
    return eatNumber();
  };
  const parseTerm = (): number => {
    let v = parseFactor();
    while (peek() === "*" || peek() === "/" || peek() === "%") {
      const op = sanitized[i++];
      const r = parseFactor();
      v = op === "*" ? v * r : op === "/" ? v / r : v % r;
    }
    return v;
  };
  const parseExpr = (): number => {
    let v = parseTerm();
    while (peek() === "+" || peek() === "-") {
      const op = sanitized[i++];
      const r = parseTerm();
      v = op === "+" ? v + r : v - r;
    }
    return v;
  };
  if (!sanitized) throw new Error("digite uma expressão");
  const result = parseExpr();
  if (i < sanitized.length) throw new Error(`inesperado em "${sanitized.slice(i)}"`);
  return result;
}

const EXAMPLES = ["pow(2,10)", "sqrt(144)+8", "(45*3)-round(7.8)", "max(12,90,3)"];

export default function Playground() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<Array<{ expr: string; out: string; ok: boolean }>>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const run = (expr?: string) => {
    const src = (expr ?? input).trim();
    if (!src) return;
    try {
      const value = safeEvaluate(src);
      setHistory((h) => [...h, { expr: src, out: String(value), ok: true }].slice(-6));
    } catch (e) {
      setHistory((h) => [...h, { expr: src, out: (e as Error).message, ok: false }].slice(-6));
    }
    setInput("");
    inputRef.current?.focus();
  };

  return (
    <section className="section" style={{ paddingTop: 30 }}>
      <div className="wrap">
        <span className="eyebrow rv">Experimente agora</span>
        <h2 className="sec-title rv">
          Não é <span className="grad-text">só visual</span>. Compile algo de verdade.
        </h2>
        <p className="sec-sub rv">
          Um pequeno interpretador de expressões, rodando 100% no seu navegador — sem <code>eval</code>, sem risco. Digite e aperte Enter.
        </p>

        <div className="editor rv" style={{ marginTop: 52, maxWidth: 720 }}>
          <div className="ed-bar">
            <span className="ed-tab on">playground.ts</span>
            <div className="ed-dots"><i /><i /><i /></div>
          </div>
          <div className="pg-body">
            <div className="pg-log">
              {history.length === 0 && (
                <p className="pg-hint">
                  experimente: {EXAMPLES.map((ex, i) => (
                    <button key={ex} className="pg-chip" onClick={() => run(ex)} data-hover>
                      {ex}{i < EXAMPLES.length - 1 ? "" : ""}
                    </button>
                  ))}
                </p>
              )}
              {history.map((h, i) => (
                <div className="pg-line" key={i}>
                  <span className="pg-prompt">›</span>
                  <span className="pg-expr">{h.expr}</span>
                  <span className={h.ok ? "pg-out ok" : "pg-out err"}>{h.ok ? "→ " : "✕ "}{h.out}</span>
                </div>
              ))}
            </div>
            <div className="pg-input-row">
              <span className="pg-prompt">›</span>
              <input
                ref={inputRef}
                className="pg-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && run()}
                placeholder="pow(2,10) + sqrt(16)"
                spellCheck={false}
                aria-label="Digite uma expressão matemática"
              />
              <button className="pg-run" onClick={() => run()} data-hover>rodar ▶</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
