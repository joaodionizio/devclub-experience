/**
 * TextScramble — efeito de "decodificação" tipo hacker.
 * O texto final é revelado por trás de caracteres aleatórios que vão
 * assentando da esquerda pra direita, como visto em sites premiados
 * (Codrops/Awwwards) e em interfaces de terminal.
 *
 * Uso: new TextScramble(el).play("FORMAÇÕES")
 */
const CHARS = "!<>-_\\/[]{}—=+*^?#________";

export class TextScramble {
  private el: HTMLElement;
  private frame = 0;
  private frameRequest = 0;
  private queue: Array<{ from: string; to: string; start: number; end: number; char?: string }> = [];
  private resolve: () => void = () => {};

  constructor(el: HTMLElement) {
    this.el = el;
  }

  play(text: string): Promise<void> {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, text.length);
    const promise = new Promise<void>((resolve) => (this.resolve = resolve));
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = text[i] || "";
      const start = Math.floor(Math.random() * 20);
      const end = start + Math.floor(Math.random() * 20);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  private update = () => {
    let output = "";
    let complete = 0;
    for (let i = 0; i < this.queue.length; i++) {
      const q = this.queue[i];
      if (this.frame >= q.end) {
        complete++;
        output += q.to;
      } else if (this.frame >= q.start) {
        if (!q.char || Math.random() < 0.28) {
          q.char = CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        output += `<span class="scramble-char">${q.char}</span>`;
      } else {
        output += q.from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frame++;
      this.frameRequest = requestAnimationFrame(this.update);
    }
  };
}
