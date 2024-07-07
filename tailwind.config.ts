import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      textUnderlineOffset: {
        "6": "6px",
      },
      textDecorationThickness: {
        "2": "2px",
      },
      boxShadow: {
        'custom-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
      opacity: {
        '85': '0.85',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".underline-spaced": {
          "text-decoration": "underline",
          "text-underline-offset": "6px",
          "text-decoration-thickness": "2px",
        },
      });
      addUtilities({
        '.shadow-custom': {
          'box-shadow': '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
        '.opacity-85': {
          'opacity': '0.85',
        },
      });
    },
    
  ],
};
export default config;
