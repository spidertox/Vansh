export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: { extend: {
    fontFamily: { mono: ['"JetBrains Mono"', 'monospace'], orb: ['Orbitron', 'sans-serif'], sans: ['Inter', 'sans-serif'] },
    colors: { neon: '#00ff9c', cy: '#22d3ee', vio: '#8b5cf6' },
    keyframes: { scan: { '0%': { transform: 'translateY(-120%)' }, '100%': { transform: 'translateY(420%)' } },
      spin2: { to: { transform: 'rotate(-360deg)' } }, blink: { '50%': { opacity: 0 } } },
    animation: { scan: 'scan 2.4s linear infinite', blink: 'blink 1s steps(1) infinite', spin2: 'spin2 24s linear infinite' }
  } }, plugins: []
}
