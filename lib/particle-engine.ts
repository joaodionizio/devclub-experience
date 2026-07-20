/**
 * ParticleEngine — motor tipográfico de partículas (hero DevClub)
 *
 * Comportamentos (inspirados no hero da Asimov Academy):
 *  • MONTAGEM: grãos nascem espalhados pela tela e convergem no glifo
 *  • MORFO: o texto-alvo pode mudar; os grãos se reorganizam
 *  • TECLADO: digite e as partículas escrevem (controlado pelo componente)
 *  • VENTO: mouse/toque arrastam grãos na direção do movimento
 *  • CLIQUE: explosão radial + troca de paleta com lerp de cor
 *
 * Decisões de engenharia (para defender em entrevista):
 *  - Canvas 2D + fillRect: 12k grãos de 1-2px a 60fps sem WebGL
 *  - DPR fixo em 1: dobrar o DPR quadruplica o custo sem ganho visual
 *    perceptível em grãos tão pequenos
 *  - Amostragem via getImageData de um canvas offscreen: qualquer texto
 *    vira alvo de partículas, na fonte real do site
 *  - Mola fraca (k≈0.006) + atrito 0.94: o retorno lento é o que cria
 *    as nuvens orgânicas — força alta mataria o efeito
 */

export type RGB = [number, number, number];

export interface EngineOptions {
  fontFamily: string;
  reduced: boolean;
}

/**
 * Paletas do clique (explosão troca de tema).
 *
 * Regra de harmonia: todo tom é claro e saturado o bastante para brilhar em
 * `lighter` sobre o fundo #05070b, e cada paleta carrega ao menos um tom
 * azul/ciano/branco puxando para a cor de marca — é isso que impede o site
 * de "virar outro site" a cada clique. A primeira é a de marca e abre a página.
 */
const THEMES: RGB[][] = [
  // marca — azul → ciano
  [[143, 184, 255], [95, 141, 255], [207, 227, 255], [255, 255, 255], [59, 109, 240]],
  // azul + rosa suave
  [[122, 162, 255], [255, 255, 255], [240, 166, 200], [74, 125, 255], [201, 217, 255]],
  // esmeralda
  [[95, 227, 161], [183, 247, 208], [47, 191, 113], [232, 255, 242], [142, 240, 182]],
  // lima → esmeralda
  [[255, 226, 138], [217, 249, 157], [95, 227, 161], [255, 247, 214], [163, 230, 53]],
  // coral + azul
  [[255, 122, 110], [122, 162, 255], [255, 255, 255], [255, 209, 102], [95, 227, 161]],
  // teal → ciano
  [[45, 212, 191], [153, 246, 228], [14, 165, 233], [224, 255, 250], [103, 232, 249]],
  // âmbar
  [[251, 146, 60], [253, 230, 138], [248, 113, 113], [255, 241, 224], [251, 191, 36]],
  // violeta (eclipse Reflect) — roxo puxando pro azul de marca
  [[167, 139, 250], [196, 181, 253], [129, 140, 248], [237, 233, 254], [139, 92, 246]],
  // magenta elétrico + ciano
  [[232, 121, 249], [249, 168, 212], [103, 232, 249], [253, 232, 255], [192, 132, 252]],
  // índigo profundo → periwinkle
  [[129, 140, 248], [165, 180, 252], [99, 102, 241], [224, 231, 255], [79, 130, 246]],
  // gelo — quase monocromático, o "respiro" da sequência
  [[226, 232, 240], [148, 197, 255], [255, 255, 255], [186, 230, 253], [125, 211, 252]],
  // rosa → âmbar (pôr do sol), ancorado por um azul
  [[251, 113, 133], [253, 186, 116], [254, 205, 211], [122, 162, 255], [252, 165, 165]],
  // jade → ciano elétrico
  [[52, 211, 153], [103, 232, 249], [167, 243, 208], [255, 255, 255], [34, 197, 194]],
];

interface Particle {
  x: number; y: number; vx: number; vy: number;
  tx: number; ty: number;
  sz: number; ph: number; sp: number;
  r: number; g: number; b: number;
  r2: number; g2: number; b2: number;
}

interface Bokeh {
  x: number; y: number; vx: number; vy: number;
  r: number; a: number; ph: number;
  cr: number; cg: number; cb: number;
}

export class ParticleEngine {
  private cv: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private opts: EngineOptions;
  private W = 0;
  private H = 0;
  private pts: Particle[] = [];
  private bokeh: Bokeh[] = [];
  private t = 0;
  private themeIdx = 0;
  private currentText = "</>";
  private raf = 0;
  private mouse = { x: -9e9, y: -9e9, vx: 0, vy: 0, px: -9e9, py: -9e9 };
  /** força de montagem — animada de fora (0 = nuvem solta) */
  gather = 0.0005;
  scrollWind = 0;

  constructor(canvas: HTMLCanvasElement, opts: EngineOptions) {
    this.cv = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.opts = opts;
  }

  resize() {
    const r = this.cv.parentElement!.getBoundingClientRect();
    this.W = this.cv.width = Math.floor(r.width);
    this.H = this.cv.height = Math.floor(r.height);
    this.cv.style.width = r.width + "px";
    this.cv.style.height = r.height + "px";
    this.buildPool();
    this.setText(this.currentText);
  }

  private rasterize(text: string): Array<[number, number]> {
    const off = document.createElement("canvas");
    off.width = this.W;
    off.height = this.H;
    const o = off.getContext("2d")!;
    let fs = Math.min(this.W * 0.46, this.H * 0.86);
    o.font = `800 ${fs}px ${this.opts.fontFamily}`;
    const mw = o.measureText(text).width;
    if (mw > this.W * 0.88) {
      fs *= (this.W * 0.88) / mw;
      o.font = `800 ${fs}px ${this.opts.fontFamily}`;
    }
    o.textAlign = "center";
    o.textBaseline = "middle";
    o.fillStyle = "#fff";
    o.fillText(text, this.W / 2, this.H * 0.44);
    const d = o.getImageData(0, 0, this.W, this.H).data;
    const step = 3;
    const tg: Array<[number, number]> = [];
    for (let y = 0; y < this.H; y += step)
      for (let x = 0; x < this.W; x += step)
        if (d[(y * this.W + x) * 4 + 3] > 128) tg.push([x, y]);
    return tg;
  }

  /** troca o texto-alvo; embaralhar os alvos deixa o morfo orgânico */
  setText(text: string) {
    this.currentText = text;
    const tg = this.rasterize(text);
    if (!tg.length) return;
    for (let i = tg.length - 1; i > 0; i--) {
      const j = (Math.random() * (i + 1)) | 0;
      [tg[i], tg[j]] = [tg[j], tg[i]];
    }
    for (let i = 0; i < this.pts.length; i++) {
      const [tx, ty] = tg[i % tg.length];
      const p = this.pts[i];
      const stray = Math.random() < 0.05;
      p.tx = stray ? tx + (Math.random() - 0.5) * 180 : tx;
      p.ty = stray ? ty - Math.random() * 160 : ty;
    }
  }

  private buildPool() {
    const N = Math.min(12000, Math.floor((this.W * this.H) / 90));
    const th = THEMES[this.themeIdx];
    this.pts = Array.from({ length: N }, () => {
      const c = th[(Math.random() * th.length) | 0];
      return {
        x: Math.random() * this.W, y: Math.random() * this.H,
        vx: 0, vy: 0, tx: 0, ty: 0,
        sz: Math.random() < 0.85 ? 1.4 : 2.2,
        ph: Math.random() * 7, sp: 0.5 + Math.random() * 1.5,
        r: c[0], g: c[1], b: c[2], r2: c[0], g2: c[1], b2: c[2],
      };
    });
    this.bokeh = Array.from(
      { length: Math.min(90, Math.floor(this.W / 16)) },
      () => {
        const c = th[(Math.random() * th.length) | 0];
        return {
          x: Math.random() * this.W, y: Math.random() * this.H,
          vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15,
          r: 2.5 + Math.random() * 6, a: 0.08 + Math.random() * 0.16,
          ph: Math.random() * 7, cr: c[0], cg: c[1], cb: c[2],
        };
      }
    );
  }

  nextTheme() {
    this.themeIdx = (this.themeIdx + 1) % THEMES.length;
    const th = THEMES[this.themeIdx];
    for (const p of this.pts) {
      const c = th[(Math.random() * th.length) | 0];
      p.r2 = c[0]; p.g2 = c[1]; p.b2 = c[2];
    }
    for (const bk of this.bokeh) {
      const c = th[(Math.random() * th.length) | 0];
      bk.cr = c[0]; bk.cg = c[1]; bk.cb = c[2];
    }
  }

  explode(cx: number, cy: number) {
    for (const p of this.pts) {
      const dx = p.x - cx, dy = p.y - cy;
      const d = Math.hypot(dx, dy) || 1;
      const f = Math.min(30, 2200 / d);
      p.vx += (dx / d) * f;
      p.vy += (dy / d) * f;
    }
  }

  /**
   * client → espaço interno do canvas.
   *
   * O canvas leva `transform: translateX() scale()` por cena (devcore.css), e
   * getBoundingClientRect() devolve a caixa JÁ transformada — enquanto os grãos
   * vivem na grade não-transformada W×H. Sem dividir pela escala do rect, o
   * ponteiro fica deslocado do que se vê (era o bug do "mexo aqui, reage ali").
   * Fazer isso pelo rect cobre translate, scale e qualquer descasamento entre
   * o tamanho CSS e a resolução do canvas de uma vez só.
   */
  private toCanvas(clientX: number, clientY: number): [number, number] {
    const r = this.cv.getBoundingClientRect();
    const sx = r.width ? this.W / r.width : 1;
    const sy = r.height ? this.H / r.height : 1;
    return [(clientX - r.left) * sx, (clientY - r.top) * sy];
  }

  setPointer(clientX: number, clientY: number) {
    const [nx, ny] = this.toCanvas(clientX, clientY);
    if (this.mouse.px > -9e8) {
      this.mouse.vx = (nx - this.mouse.px) * 0.6;
      this.mouse.vy = (ny - this.mouse.py) * 0.6;
    }
    this.mouse.x = nx; this.mouse.y = ny;
    this.mouse.px = nx; this.mouse.py = ny;
  }
  clearPointer() {
    this.mouse.x = -9e9; this.mouse.y = -9e9; this.mouse.px = -9e9;
  }
  toLocal(clientX: number, clientY: number): [number, number] {
    return this.toCanvas(clientX, clientY);
  }

  start() {
    if (this.opts.reduced) {
      this.gather = 1;
      for (const p of this.pts) { p.x = p.tx; p.y = p.ty; }
      this.drawStatic();
      return;
    }
    const tick = () => {
      this.step();
      this.raf = requestAnimationFrame(tick);
    };
    tick();
  }
  stop() { cancelAnimationFrame(this.raf); }

  private drawStatic() {
    const { ctx } = this;
    ctx.clearRect(0, 0, this.W, this.H);
    for (const p of this.pts) {
      ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},.8)`;
      ctx.fillRect(p.x, p.y, p.sz, p.sz);
    }
  }

  private step() {
    const { ctx, mouse } = this;
    this.t += 0.016;
    const t = this.t;
    ctx.clearRect(0, 0, this.W, this.H);
    ctx.globalCompositeOperation = "lighter";
    const R = 170;
    for (const p of this.pts) {
      p.vx += (p.tx - p.x) * this.gather;
      p.vy += (p.ty - p.y) * this.gather;
      const dx = p.x - mouse.x, dy = p.y - mouse.y;
      const d2 = dx * dx + dy * dy;
      if (d2 < R * R) {
        const d = Math.sqrt(d2) || 1;
        const f = 1 - d / R;
        p.vx += mouse.vx * f * 0.5 + (dx / d) * f * 0.9;
        p.vy += mouse.vy * f * 0.5 + (dy / d) * f * 0.9;
      }
      p.vy -= this.scrollWind * 0.0012;
      p.vx *= 0.94; p.vy *= 0.94;
      p.x += p.vx + Math.sin(t * p.sp + p.ph) * 0.12;
      p.y += p.vy + Math.cos(t * p.sp * 0.8 + p.ph) * 0.12;
      p.r += (p.r2 - p.r) * 0.05;
      p.g += (p.g2 - p.g) * 0.05;
      p.b += (p.b2 - p.b) * 0.05;
      const a = 0.45 + 0.5 * Math.abs(Math.sin(t * p.sp * 1.6 + p.ph));
      ctx.fillStyle = `rgba(${p.r | 0},${p.g | 0},${p.b | 0},${a})`;
      ctx.fillRect(p.x, p.y, p.sz, p.sz);
    }
    for (const bk of this.bokeh) {
      bk.x += bk.vx + Math.sin(t * 0.4 + bk.ph) * 0.1;
      bk.y += bk.vy + Math.cos(t * 0.35 + bk.ph) * 0.1;
      if (bk.x < -20) bk.x = this.W + 20;
      if (bk.x > this.W + 20) bk.x = -20;
      if (bk.y < -20) bk.y = this.H + 20;
      if (bk.y > this.H + 20) bk.y = -20;
      const tw = 0.5 + 0.5 * Math.sin(t * 0.8 + bk.ph);
      ctx.fillStyle = `rgba(${bk.cr},${bk.cg},${bk.cb},${bk.a * tw})`;
      ctx.beginPath();
      ctx.arc(bk.x, bk.y, bk.r, 0, 7);
      ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";
    mouse.vx *= 0.8; mouse.vy *= 0.8;
    this.scrollWind *= 0.9;
  }
}
