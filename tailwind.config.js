// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ceci est crucial pour que Tailwind trouve vos classes
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4F46E5',   // Indigo (Boutons principaux, accents)
        'secondary': '#10B981', // Émeraude (Accents, succès)
        'text-main': '#1F2937', // Gris foncé (Texte principal)
        'background': '#F9FAFB', // Gris très clair (Fond de page)
        'card-bg': '#FFFFFF',
      },
    },
  },
  plugins: [],
}