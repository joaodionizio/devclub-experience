import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#05070b",
        "bg-2": "#0a0e15",
        ink: "#f2f4f8",
        muted: "#8b93a7",
        blue: "#4a7dff",
        cyan: "#67e8f9",
      },
    },
  },
  plugins: [],
};
export default config;
