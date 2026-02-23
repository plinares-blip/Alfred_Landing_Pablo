import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}", // Por si no usas carpeta src
    ],
    theme: {
        extend: {
            fontFamily: {
                // Esto fuerza a que 'font-sans' sea Gotham.
                // Asegúrate de importar la fuente en tu layout o globals.css
                sans: ['Gotham', 'sans-serif'],
            },
            colors: {
                'alfred-navy': '#0B1226',
                // Agrega aquí tus colores neón si tienes los HEX exactos
            },
        },
    },
    plugins: [],
};
export default config;