# DevClub — DEV CORE Experience

Página institucional criada para o concurso da vaga de Programador(a) Full Stack.
**Demo:** _adicione aqui o link da Vercel após o deploy_

## Conceito

“Seu futuro não vem pronto. Você compila.”

A página é uma narrativa contínua em oito atos. Um núcleo digital fixo acompanha
o visitante e muda de estado conforme o scroll: `</>` → manifesto → stack →
jornada → plataforma → projetos → mercado → comunidade. Depois da narrativa,
o **Deep System** abre cada promessa em uma interface detalhada e interativa.

## Destaques

- **DEV CORE tipográfico:** até 12 mil partículas renderizadas em Canvas 2D
  morfam entre os estados da história.
- **Narrativa scroll-driven:** GSAP ScrollTrigger sincroniza conteúdo, partículas,
  HUD, progresso e artefatos visuais.
- **Artefatos code-native:** terminal, órbitas, pipeline, plataforma, projetos e
  rede de empresas são construídos com HTML/CSS, sem imagens pesadas.
- **Deep System reformulado:** seletor de formações, control room, laboratório
  de projetos, rede de tutores, telemetria de carreira e FAQ usam a mesma
  linguagem visual do DEV CORE.
- **Interação física:** o ponteiro cria vento nas partículas e o clique gera uma
  explosão radial.
- **Experiência adaptativa:** no mobile, a composição abandona o palco fixo e
  vira uma leitura vertical; `prefers-reduced-motion` recebe uma versão estática.

## Stack e decisões

| Escolha | Por quê |
| --- | --- |
| **Next.js 14 (App Router)** | SSG da página inteira (rota `/` 100% estática), estrutura de componentes clara e deploy trivial na Vercel |
| **TypeScript** | Segurança nos contratos do motor de partículas e dos componentes |
| **Canvas 2D (sem WebGL/lib)** | 12k grãos de 1–2px a 60fps com `fillRect`; controle total da física e zero dependência 3D |
| **GSAP + ScrollTrigger** | Controla as oito cenas, reveals e o progresso global |
| **Tailwind + CSS custom** | Tailwind para utilitários; o design system (tokens, glows, animações) vive em `globals.css` |
| **`next/font`** | Fontes self-hosted sem FOUT; o motor lê a família real via CSS variable (`lib/fonts.ts`) |

## Rodando

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # build de produção (estático)
```

## Estrutura

```
app/            layout · composição · design system global · estilos DEV CORE
components/     DevCoreExperience.tsx (narrativa) · DeepDiveSections.tsx (sistema detalhado)
lib/            particle-engine.ts (física) · fonts.ts (família real p/ canvas)
```

---
Feito com `</>` e café — João Luís
