import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['IBM Plex Mono', 'JetBrains Mono', 'Courier Prime', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: '#000',
            fontFamily: 'IBM Plex Mono, monospace',
            lineHeight: '1.75',
            '--tw-prose-body': '#000',
            '--tw-prose-headings': '#000',
            '--tw-prose-links': '#000',
            '--tw-prose-bold': '#000',
            '--tw-prose-code': '#000',
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
