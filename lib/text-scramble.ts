/**
 * TextScramble — efeito de decodificação tipo hacker.
 * Caracteres aleatórios assentam da esquerda para a direita até formar
 * o texto final.
 */
const CHARS = "!<>-_\\/[]{}—=+*^?#________";

export class TextScramble {
  private element: HTMLElement;
  private frame = 0;
  private frameRequest = 0;
  private queue: Array<{ from: string; to: string; start: number; end: number; char?: string }> = [];
  private resolve: () => void = () => {};

  constructor(element: HTMLElement) {
    this.element = element;
  }

  play(text: string): Promise<void> {
    const oldText = this.element.innerText;
    const length = Math.max(oldText.length, text.length);
    const promise = new Promise<void>((resolve) => (this.resolve = resolve));

    this.queue = [];
    for (let index = 0; index < length; index++) {
      const from = oldText[index] || "";
      const to = text[index] || "";
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

    for (let index = 0; index < this.queue.length; index++) {
      const item = this.queue[index];
      if (this.frame >= item.end) {
        complete++;
        output += item.to;
      } else if (this.frame >= item.start) {
        if (!item.char || Math.random() < 0.28) {
          item.char = CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        output += `<span class="scramble-char">${item.char}</span>`;
      } else {
        output += item.from;
      }
    }

    this.element.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frame++;
      this.frameRequest = requestAnimationFrame(this.update);
    }
  };
}
