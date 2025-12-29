``javascript
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: [
       "./src/**/*.{js,jsx,ts,tsx}",
     ],
     theme: {
       extend: {
         colors: {
           // Vibrant gradient colors
           primary: {
             50: '#f0f9ff',
             100: '#e0f2fe',
             200: '#bae6fd',
             300: '#7dd3fc',
             400: '#38bdf8',
             500: '#0ea5e9',
             600: '#0284c7',
             700: '#0369a1',
             800: '#075985',
             900: '#0c4a6e',
           },
           purple: {
             50: '#faf5ff',
             100: '#f3e8ff',
             200: '#e9d5ff',
             300: '#d8b4fe',
             400: '#c084fc',
             500: '#a855f7',
             600: '#9333ea',
             700: '#7e22ce',
             800: '#6b21a8',
             900: '#581c87',
           },
           pink: {
             50: '#fdf2f8',
             100: '#fce7f3',
             200: '#fbcfe8',
             300: '#f9a8d4',
             400: '#f472b6',
             500: '#ec4899',
             600: '#db2777',
             700: '#be185d',
             800: '#9d174d',
             900: '#831843',
           },
           // Dark theme
           dark: {
             50: '#f9fafb',
             100: '#f3f4f6',
             200: '#e5e7eb',
             300: '#d1d5db',
             400: '#9ca3af',
             500: '#6b7280',
             600: '#4b5563',
             700: '#374151',
             800: '#1f2937',
             900: '#111827',
             950: '#0a0a0a',
           }
         },
         backgroundImage: {
           'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
           'gradient-secondary': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
           'gradient-teal': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
           'gradient-success': 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
           'gradient-card': 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
         },
         animation: {
           'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
           'slide-in': 'slide-in 0.3s ease-out',
           'fade-in': 'fade-in 0.5s ease-in',
         },
         keyframes: {
           'pulse-glow': {
             '0%, 100%': { opacity: 1 },
             '50%': { opacity: 0.7 },
           },
           'slide-in': {
             '0%': { transform: 'translateY(-10px)', opacity: 0 },
             '100%': { transform: 'translateY(0)', opacity: 1 },
           },
           'fade-in': {
             '0%': { opacity: 0 },
             '100%': { opacity: 1 },
           },
         },
       },
     },
     plugins: [],
   }
   ```
