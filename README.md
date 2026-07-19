# DevClub — Landing Institucional

Página institucional do DevClub criada para o concurso da vaga de Programador(a) Full Stack.
**Demo:** _adicione aqui o link da Vercel após o deploy_

## Destaques

- **Hero de partículas tipográficas** (`lib/particle-engine.ts` + `components/ParticleHero.tsx`):
  ~12.000 grãos renderizados em Canvas 2D formam o símbolo `</>`. Os grãos nascem
  espalhados pela tela e convergem na montagem; o glifo se reescreve sozinho
  (`</>` → `DEV` → `CLUB`); **digite no teclado e as partículas escrevem o que você digitou**;
  o mouse age como vento; o clique explode os grãos e troca a paleta (7 temas).
- **Editor que compila** (`EclipseEditor.tsx`): código se digita sozinho dentro de um
  eclipse de luz, terminando em "build concluído — 1 vida transformada".
- **Jornada horizontal pinada** (`Journey.tsx`): scroll vertical vira travessia
  horizontal pelos 12 meses do aluno (GSAP ScrollTrigger + pin).
- Galeria de projetos com **duas versões de layout** (grade/mosaico), como pedido no briefing.
- Acessibilidade: `prefers-reduced-motion` respeitado em todas as animações.

## Stack e decisões

| Escolha | Por quê |
| --- | --- |
| **Next.js 14 (App Router)** | SSG da página inteira (rota `/` 100% estática), estrutura de componentes clara e deploy trivial na Vercel |
| **TypeScript** | Segurança nos contratos do motor de partículas e dos componentes |
| **Canvas 2D (sem WebGL/lib)** | 12k grãos de 1–2px a 60fps com `fillRect`; controle total da física em ~200 linhas, zero dependência extra |
| **GSAP + ScrollTrigger** | Padrão da indústria para animações scroll-driven (pin, scrub) |
| **Tailwind + CSS custom** | Tailwind para utilitários; o design system (tokens, glows, animações) vive em `globals.css` |
| **`next/font`** | Fontes self-hosted sem FOUT; o motor lê a família real via CSS variable (`lib/fonts.ts`) |

## Física das partículas (resumo)

- **Mola fraca** (`k ≈ 0.006`) puxando cada grão ao alvo + **atrito 0.94**: o retorno
  lento é o que cria as nuvens orgânicas ao dispersar.
- **Vento do mouse**: dentro do raio, o grão recebe a *velocidade* do cursor
  (não só repulsão radial) — por isso o movimento "arrasta" o símbolo.
- **Morfo**: qualquer texto é rasterizado num canvas offscreen; `getImageData`
  amostra os pixels acesos (passo 3px) e os alvos são embaralhados para a
  transição parecer uma nuvem se reorganizando.
- **Troca de paleta**: cada grão guarda cor atual e cor-alvo e faz lerp por frame.

## Rodando

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # build de produção (estático)
```

## Estrutura

```
app/            layout (fontes, metadata) · page (composição) · globals.css (design system)
components/     uma seção por componente · Chrome.tsx (loader, céu, cursor, reveals)
lib/            particle-engine.ts (motor) · fonts.ts (família real p/ canvas)
```

---
Feito com `</>` e café — João Luís
