/**
 * O motor de partículas desenha texto num canvas offscreen e precisa
 * do NOME REAL da família gerada pelo next/font (que é hasheado).
 * Este helper lê a variável CSS resolvida em runtime.
 */
export function displayFontFamily(): string {
  if (typeof window === "undefined") return "sans-serif";
  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue("--font-display")
      .trim() || "sans-serif"
  );
}
