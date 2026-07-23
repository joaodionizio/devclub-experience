# DevClub — DEV CORE Experience

Landing page institucional interativa criada para o concurso de uma vaga Full Stack do DevClub.

- **Deploy:** [adicione aqui o link do deploy]
- **Repositório:** [github.com/joaodionizio/devclub-experience](https://github.com/joaodionizio/devclub-experience)
- **Autor:** João Luís Dionízio dos Santos

## Conceito DEV CORE

> Seu futuro não vem pronto. Você compila.

DEV CORE transforma a navegação em uma narrativa contínua. Um núcleo digital acompanha oito cenas e muda de estado conforme o scroll: código, manifesto, stack, jornada, plataforma, projetos, mercado e comunidade. Depois dessa abertura, o **Deep System** detalha cada camada em interfaces interativas.

## Stack

- Next.js 14 com App Router, React 18 e TypeScript;
- CSS customizado com Tailwind CSS disponível na pipeline;
- GSAP e ScrollTrigger para narrativa e transições;
- Lenis para rolagem suave;
- Canvas 2D para o motor tipográfico de partículas;
- Lucide React para ícones;
- `next/font` para Inter, Inter Tight e JetBrains Mono.

## Principais interações

- boot tipográfico e morfologia de até 12 mil partículas;
- oito cenas sincronizadas ao scroll;
- vento por ponteiro, explosão por clique e troca de paleta;
- seletor acessível de formações;
- alternância de layout no laboratório de projetos;
- FAQ expansível e navegação interna com rolagem suave;
- animações de entrada, contadores e microinterações em cards.

## Decisões técnicas

- A rota principal permanece estática; a camada cliente é usada apenas onde Canvas, eventos e animações exigem APIs do navegador.
- Canvas 2D com `fillRect` evita uma dependência 3D e mantém controle direto sobre física e desenho.
- A resolução do Canvas fica em DPR 1: partículas de 1–2 px não justificam quadruplicar o custo em telas de DPR 2.
- `gsap.context()` delimita animações e ScrollTriggers, permitindo limpeza com `revert()`.
- O motor principal só inicia depois do boot e pausa quando a aba fica oculta.
- A foto local usa `next/image`; os demais artefatos visuais são HTML e CSS.

## Acessibilidade e responsividade

- documento em `pt-BR`, hierarquia de headings e landmarks semânticos;
- links, botões, menu e FAQ operáveis por teclado;
- tabs com setas, Home e End, estados ARIA e painel associado;
- foco visível e fechamento do menu por `Escape`;
- alternativa estática para `prefers-reduced-motion`;
- composição vertical adaptada para telas menores e ponteiro fino opcional.

## Performance

- geração estática da rota `/`;
- animações concentradas em transformações e opacidade;
- Canvas limitado a 12 mil partículas e DPR 1;
- `requestAnimationFrame`, listeners, Lenis, timelines e ScrollTriggers são limpos no unmount;
- resize do Canvas é agrupado por frame e animação é suspensa em abas ocultas;
- fontes são gerenciadas por `next/font` e a imagem fotográfica por `next/image`.

Nenhum resultado de Lighthouse, cobertura ou FPS é declarado porque essas métricas não foram registradas de forma controlada neste repositório.

## Estrutura

```text
app/          layout, metadados, favicon e estilos globais/DEV CORE
components/   narrativa, boot, seções detalhadas e text scramble
lib/          motor de partículas, fonte resolvida e efeito de texto
public/       assets estáticos
```

## Como executar

Use Node.js 20 LTS e npm. O Next.js 14 aceita versões anteriores compatíveis, mas Node 20 é a recomendação para reproduzir o ambiente com uma versão LTS mantida.

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Qualidade e build

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run start
```

## Uso de IA

IA generativa foi usada como apoio no processo de concepção, revisão e desenvolvimento. As decisões de arquitetura, integração, validação e acabamento permanecem responsabilidade do autor. O código deve ser avaliado pelo comportamento e pelas decisões registradas no próprio repositório, não pela ferramenta usada como assistência.

## Nota sobre conteúdo

Esta é uma peça conceitual para um processo seletivo, não um canal oficial do DevClub. Métricas, salários, cronogramas, depoimentos, perfis, garantias e outros conteúdos demonstrativos podem ser ilustrativos e precisam de validação pelo DevClub antes de qualquer publicação institucional.

## Melhorias futuras

- validar todo o conteúdo institucional com fontes oficiais;
- medir Lighthouse, Web Vitals, FPS e consumo em dispositivos reais;
- adicionar testes de acessibilidade e regressão visual;
- extrair dados e subcomponentes dos dois arquivos de composição maiores;
- criar uma imagem Open Graph própria e configurar a URL final do deploy;
- avaliar pausa por interseção quando o Canvas estiver totalmente fora da área visível.

---

Feito com `</>` e café por **João Luís Dionízio dos Santos**.
