import React from 'react';

// Simple SVG planets with subtle animation
const Planet = ({ type }) => {
  const common = 'animate-[float_10s_ease-in-out_infinite] drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]';
  switch (type) {
    case 'earth':
      return (
        <svg className={common} width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="earthGrad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(120 120) rotate(45) scale(180)">
              <stop offset="0%" stopColor="#8ED6FF" />
              <stop offset="100%" stopColor="#1B6CA8" />
            </radialGradient>
          </defs>
          <circle cx="150" cy="150" r="120" fill="url(#earthGrad)" />
          <path d="M50 160c40-20 80 10 120 0 40-10 40-40 80-30" stroke="#0EA5E9" strokeWidth="14" strokeLinecap="round" opacity=".8" />
          <path d="M70 120c20-10 35 0 60 8 35 12 55 5 85-12" stroke="#22C55E" strokeWidth="12" strokeLinecap="round" opacity=".9" />
          <circle cx="150" cy="150" r="120" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
        </svg>
      );
    case 'mars':
      return (
        <svg className={common} width="280" height="280" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="marsGrad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(120 120) rotate(45) scale(180)">
              <stop offset="0%" stopColor="#FF9F68" />
              <stop offset="100%" stopColor="#D9462F" />
            </radialGradient>
          </defs>
          <circle cx="150" cy="150" r="120" fill="url(#marsGrad)" />
          <path d="M60 150c30-30 70-20 120-10" stroke="#B91C1C" strokeWidth="16" strokeLinecap="round" opacity=".5" />
          <path d="M90 110c40 0 70 10 110-10" stroke="#7F1D1D" strokeWidth="10" strokeLinecap="round" opacity=".4" />
        </svg>
      );
    case 'saturn':
      return (
        <svg className={common} width="340" height="340" viewBox="0 0 380 320" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="satGrad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(160 140) rotate(45) scale(200)">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </radialGradient>
          </defs>
          <ellipse cx="190" cy="150" rx="110" ry="100" fill="url(#satGrad)" />
          <ellipse cx="190" cy="170" rx="170" ry="40" fill="none" stroke="#FBBF24" strokeWidth="10" opacity=".9" transform="rotate(-10 190 170)" />
          <ellipse cx="190" cy="170" rx="190" ry="52" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" transform="rotate(-10 190 170)" />
        </svg>
      );
    case 'jupiter':
      return (
        <svg className={common} width="360" height="360" viewBox="0 0 360 360" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="jupGrad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(150 150) rotate(45) scale(200)">
              <stop offset="0%" stopColor="#FECACA" />
              <stop offset="100%" stopColor="#FCA5A5" />
            </radialGradient>
          </defs>
          <circle cx="180" cy="180" r="150" fill="url(#jupGrad)" />
          <g stroke="#EA580C" strokeWidth="12" opacity=".5">
            <path d="M50 120h260" />
            <path d="M30 160h300" />
            <path d="M60 200h240" />
            <path d="M40 240h280" />
          </g>
          <circle cx="120" cy="180" r="22" fill="#EF4444" opacity=".7" />
        </svg>
      );
    case 'blackhole':
      return (
        <svg className={common} width="360" height="360" viewBox="0 0 360 360" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bhGrad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(180 180) scale(160)">
              <stop offset="0%" stopColor="#000" />
              <stop offset="60%" stopColor="#0B1020" />
              <stop offset="100%" stopColor="#111827" />
            </radialGradient>
          </defs>
          <circle cx="180" cy="180" r="120" fill="#000" />
          <circle cx="180" cy="180" r="150" fill="url(#bhGrad)" />
          <circle cx="180" cy="180" r="175" fill="none" stroke="#6EE7B7" strokeWidth="2" opacity=".2" />
        </svg>
      );
    default:
      return null;
  }
};

function SpaceBackground({ theme }) {
  const gradientMap = {
    earth: 'from-[#0b1020] via-[#0a1a3a] to-[#0b2a5a]',
    mars: 'from-[#1a0b0b] via-[#2b0f0f] to-[#3b0f14]',
    saturn: 'from-[#1a1420] via-[#221a2a] to-[#2b2033]',
    jupiter: 'from-[#1a1512] via-[#2a211b] to-[#3a2b24]',
    blackhole: 'from-[#000000] via-[#05060a] to-[#0b1020]',
  };

  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-gradient-to-br transition-colors duration-700 ${gradientMap[theme]}`}>
      <div className="absolute inset-0 opacity-40">
        {/* Stars */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.15)_0,rgba(255,255,255,0)_40%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.12)_0,rgba(255,255,255,0)_35%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.1)_0,rgba(255,255,255,0)_40%)]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <span
            key={i}
            className="absolute h-0.5 w-0.5 bg-white/70 rounded-full"
            style={{
              left: `${(i * 73) % 100}%`,
              top: `${(i * 37) % 100}%`,
              opacity: 0.3 + ((i % 7) / 10),
              animation: `twinkle ${(4 + (i % 5))}s ease-in-out ${(i % 3) * 0.7}s infinite`
            }}
          />
        ))}
      </div>

      {/* Planet visual */}
      <div className="absolute right-[-60px] top-[10%] sm:right-[-40px] sm:top-[5%] md:right-[5%] md:top-[8%] opacity-80">
        <Planet type={theme} />
      </div>

      {/* Nebula gradient blobs */}
      <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
    </div>
  );
}

export default SpaceBackground;
