# DevClub — DEV CORE Experience

Uma experiência institucional interativa que transforma a jornada de formação de um desenvolvedor em narrativa visual.

🚀 **[Acessar a experiência ao vivo](https://devclub-experience-one.vercel.app/)**

- **Live Demo:** [devclub-experience-one.vercel.app](https://devclub-experience-one.vercel.app/)
- **GitHub:** [github.com/joaodionizio/devclub-experience](https://github.com/joaodionizio/devclub-experience)

## Sobre o projeto

**DEV CORE** é uma releitura da experiência institucional do DevClub. Em vez de seguir a estrutura convencional de uma landing page, o projeto conduz a pessoa por uma jornada visual ligada à evolução na carreira:

**Descobrir → escolher uma formação → construir → evoluir → provar o trabalho → conectar-se ao mercado**

O núcleo visual acompanha oito cenas e muda de estado durante a rolagem — manifesto, stack, jornada, plataforma, projetos, mercado e comunidade — antes de abrir o **Deep System**, que detalha o conteúdo em interfaces inspiradas em sistemas, terminais e dashboards.

## O desafio

O projeto foi desenvolvido para um desafio técnico do DevClub, com atenção especial aos aspectos centrais da proposta:

- impacto visual e originalidade;
- animações e microinterações;
- qualidade, organização e manutenção do código.

A solução busca equilibrar expressão visual e implementação técnica sem depender de uma composição tradicional de blocos estáticos.

## Destaques da experiência

### DEV CORE

Motor visual em Canvas 2D que rasteriza textos e distribui até 12 mil partículas. O núcleo reage ao ponteiro, ao scroll e ao clique, alternando palavras, movimento e paletas ao longo da experiência.

### Scroll storytelling

Oito cenas sincronizadas à rolagem. O ScrollTrigger identifica a seção ativa e coordena a transformação das partículas, dos artefatos visuais, dos textos e do indicador de progresso.

### Deep System

As informações institucionais são apresentadas como interfaces de sistema: console de método, ecossistema, plataforma, laboratório de projetos, resultados, tutores, mercado e FAQ.

### Path Selector

Seletor interativo para explorar seis formações, com atualização de conteúdo, stack, módulos e metadados. O controle também oferece navegação por setas, `Home` e `End`.

### Responsividade

Grid, navegação, painéis, tipografia e composição do palco recebem adaptações específicas para larguras menores, preservando a hierarquia e evitando overflow horizontal.

## Tecnologias

- **Next.js 14** — App Router, metadados, fontes e geração estática;
- **React 18** — composição dos estados e interações;
- **TypeScript** — tipagem dos componentes, dados e motor visual;
- **Tailwind CSS + CSS customizado** — pipeline de estilos e identidade visual;
- **GSAP + ScrollTrigger** — timelines, transições e narrativa ligada ao scroll;
- **Lenis** — rolagem suave integrada ao ScrollTrigger;
- **Canvas 2D** — renderização e física do sistema de partículas;
- **Lucide React** — ícones da interface;
- **next/font e next/image** — fontes otimizadas e asset fotográfico.

## Decisões técnicas

### Canvas 2D

O motor usa `fillRect` para desenhar partículas pequenas e um canvas offscreen com `getImageData` para converter qualquer texto na fonte do projeto em coordenadas-alvo. A abordagem mantém controle direto sobre rasterização, física, interação e composição de cor sem introduzir uma camada 3D.

O canvas trabalha em DPR 1: como os grãos têm aproximadamente 1–2 px, aumentar a resolução interna multiplicaria a área processada sem benefício proporcional para esse efeito.

### GSAP + ScrollTrigger

O ScrollTrigger observa os limites de cada cena e atualiza o estado do DEV CORE quando uma seção entra ou retorna ao viewport. O GSAP controla montagem das partículas, reveals, contadores e transições. As animações são criadas em `gsap.context()`, o que permite revertê-las de forma agrupada no unmount.

### Lenis

O Lenis normaliza a rolagem suave e encaminha suas atualizações ao ScrollTrigger. Seu RAF é controlado pelo componente e cancelado junto com a instância no cleanup; quando há preferência por movimento reduzido, a integração não é iniciada.

### Next.js

O App Router concentra a rota, os metadados, as fontes e os estilos globais. A página pode ser gerada estaticamente, enquanto a fronteira cliente encapsula apenas a experiência que depende de Canvas, eventos do navegador e animações.

### TypeScript

Tipos explícitos definem contratos do motor de partículas, opções de configuração, referências DOM e dados usados pelos componentes. Isso torna mudanças nas cenas e interações mais seguras e facilita a manutenção dos efeitos.

## Performance

As otimizações presentes no código incluem:

- quantidade de partículas proporcional à área disponível, limitada a 12 mil;
- resolução interna do Canvas fixada em DPR 1;
- pausa do RAF das partículas quando a aba fica oculta;
- cancelamento de `requestAnimationFrame` e remoção de listeners no cleanup;
- destruição da instância do Lenis e reversão do `gsap.context()`;
- resize do canvas principal agrupado em um frame;
- alternativa estática para movimento reduzido;
- geração estática da rota principal;
- fontes via `next/font` e imagem local via `next/image`.

Não são declarados resultados de Lighthouse, FPS, Web Vitals ou cobertura porque essas métricas não foram registradas de forma controlada no repositório.

## Acessibilidade

- documento configurado com idioma `pt-BR`;
- landmarks e elementos semânticos como `main`, `nav`, `section`, `header`, `footer` e `blockquote`;
- foco visível para links, botões e elementos focáveis;
- menu com nome, estado expandido e fechamento por `Escape`;
- Path Selector com papéis de tabs, estados ARIA e navegação por teclado;
- FAQ com botões, `aria-expanded` e associação às respostas;
- elementos puramente visuais marcados com `aria-hidden`;
- suporte a `prefers-reduced-motion`, incluindo boot imediato, Canvas estático e redução das animações.

## Responsividade

A experiência mantém a mesma narrativa em desktop e mobile, com reorganização dos grids, menus, painéis e controles. Em telas menores, o palco visual é redimensionado ou reposicionado, componentes passam para uma ou duas colunas e elementos secundários são simplificados quando necessário.

## Estrutura do projeto

```text
app/
├── layout.tsx              # metadados, fontes e estilos globais
├── page.tsx                # rota principal
├── devcore.css             # palco e cenas do DEV CORE
└── devcore-deep.css        # seções do Deep System
components/
├── DevCoreExperience.tsx   # narrativa, scroll e integração das animações
├── DeepDiveSections.tsx    # interfaces e seções institucionais
├── ParticleBoot.tsx        # sequência inicial em partículas
└── ScrambleEyebrows.tsx    # microinteração tipográfica
lib/
├── particle-engine.ts      # motor Canvas 2D
├── text-scramble.ts        # efeito de texto
└── fonts.ts                # resolução das fontes do Canvas
public/
└── tutors/                 # assets locais
```

## Como executar

### Requisitos

- Node.js 18.17 ou superior;
- npm.

### Instalação

```bash
git clone https://github.com/joaodionizio/devclub-experience.git
cd devclub-experience
npm install
```

### Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

### Build de produção

```bash
npm run build
npm run start
```

### Verificações

```bash
npm run lint
npx tsc --noEmit
```

## Uso de inteligência artificial

Ferramentas de inteligência artificial foram utilizadas como apoio em etapas de pesquisa, ideação, revisão e desenvolvimento. As sugestões foram revisadas e adaptadas ao projeto, incluindo decisões de arquitetura, animações, responsividade, acessibilidade e performance.

## Conteúdo conceitual

Este projeto é uma peça conceitual criada para um desafio técnico e não representa um canal oficial do DevClub. Algumas métricas, depoimentos, números e informações institucionais são demonstrativos e não devem ser interpretados como dados oficiais sem validação da organização.

## Melhorias futuras

- adicionar testes automatizados de interação e acessibilidade;
- implementar regressão visual para diferentes viewports;
- medir Web Vitals e desempenho do Canvas em dispositivos reais;
- avaliar otimizações adicionais e pausa por interseção do motor de partículas;
- extrair o conteúdo institucional para uma fonte de dados ou CMS.

## Autor

Desenvolvido por **João Luís Dionízio dos Santos**.
