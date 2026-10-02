import { useState } from 'react'

// name: [cdn slug, color hex, badge letters]
// Logo loads from cdn.simpleicons.org; if offline/blocked, a colored letter badge shows instead (always visible).
const MAP = {
  JavaScript: ['javascript', 'F7DF1E', 'JS'], TypeScript: ['typescript', '3178C6', 'TS'], Python: ['python', '4B8BBE', 'PY'],
  'Node.js': ['nodedotjs', '5FA04E', 'ND'], React: ['react', '61DAFB', 'RE'], Vite: ['vite', '8A8FFF', 'VT'],
  'Tailwind CSS': ['tailwindcss', '06B6D4', 'TW'], 'Framer Motion': ['framer', '3D7BFF', 'FM'], Git: ['git', 'F05032', 'GT'],
  GitHub: ['github', 'E6FFF4', 'GH'], 'GitHub Pages': ['github', 'E6FFF4', 'GP'], 'Telegram Bot API': ['telegram', '26A5E4', 'TG'],
  Termux: ['termux', 'E6FFF4', '>_'], MongoDB: ['mongodb', '47A248', 'MG'], PostgreSQL: ['postgresql', '6C8EE8', 'PG'],
  Docker: ['docker', '2496ED', 'DK'], 'Next.js': ['nextdotjs', 'E6FFF4', 'NX'], Express: ['express', 'E6FFF4', 'EX'],
  Firebase: ['firebase', 'FFCA28', 'FB'], Vercel: ['vercel', 'E6FFF4', 'VC'], Netlify: ['netlify', '00C7B7', 'NF'],
  Postman: ['postman', 'FF6C37', 'PM'], Jest: ['jest', 'E0414F', 'JT'], 'GitHub Actions': ['githubactions', '2088FF', 'GA'],
  'Material UI': ['mui', '007FFF', 'UI'], 'Kali Linux': ['kalilinux', '6FA0BF', 'KL'], SQL: [null, '00FF9C', 'SQL'], AWS: [null, 'FF9900', 'AWS'],
}

export function Logo({ name }) {
  const [ok, setOk] = useState(false)
  const [slug, c, mono] = MAP[name] || [null, '00FF9C', name.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase()]
  return (
    <span className="relative w-5 h-5 shrink-0 grid place-items-center">
      {!ok && <span className="absolute inset-0 rounded grid place-items-center font-mono font-bold text-[8px] leading-none"
        style={{ background: `#${c}26`, color: `#${c}`, border: `1px solid #${c}77` }}>{mono}</span>}
      {slug && <img src={`https://cdn.simpleicons.org/${slug}/${c}`} alt="" loading="lazy" onLoad={() => setOk(true)}
        className={ok ? 'w-5 h-5' : 'absolute w-5 h-5 opacity-0'} />}
    </span>
  )
}
