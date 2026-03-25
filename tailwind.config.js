/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Hyderabadi editorial palette
        art: {
          // Base — warm ivory (parchment / pearl)
          bg:          '#FAF5EC',
          'bg-2':      '#F0E4C8',   // ikat-warm amber cream
          'bg-card':   '#E8D5A8',   // deeper card bg
          ink:         '#1A0E05',   // bidri near-black
          'ink-2':     '#5C4A30',   // secondary — tamarind brown
          'ink-3':     '#A08060',   // muted
          // Gold — antique Nizam
          gold:        '#9B7A2A',
          'gold-lt':   '#C4A04A',
          // Kalamkari rust / terracotta
          rust:        '#B5451B',
          'rust-lt':   '#D4623A',
          // Gold accent (formerly teal — removed blue-green)
          teal:        '#9B7A2A',
          'teal-lt':   '#C4A04A',
          // Bidri — matte black + silver
          dark:        '#0A0805',
          'dark-2':    '#1A1008',
          silver:      '#C8C0B0',
          'silver-lt': '#E0D8C8',
          // Maroon — pomegranate
          maroon:      '#8B1A1A',
          // Borders
          border:      '#C8B890',
          'border-lt': '#DDD0B0',
          // Light text (on dark sections)
          cream:       '#FAF5EC',
        },
        // Keep old palette for any legacy references
        palace: {
          dark:      '#1C1008',
          emerald:   '#1B4D3E',
          maroon:    '#6B0F1A',
          gold:      '#9B7A2A',
          cream:     '#FDFAF4',
          'gold-light': '#C4A04A',
          'dark-800':'#EDE5CF',
          'dark-700':'#E5D9B8',
        },
      },
      fontFamily: {
        heading:   ['"Bodoni Moda"', 'Georgia', 'serif'],
        cinzel:    ['"Cinzel"', 'Georgia', 'serif'],
        monograph: ['"Monograph"', 'system-ui', 'sans-serif'],
        sans:      ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #9B7A2A, #C4A04A, #9B7A2A)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
