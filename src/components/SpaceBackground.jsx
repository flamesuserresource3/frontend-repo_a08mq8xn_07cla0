import React from 'react';

// Cinematic, textured SVG planets using procedural filters (no external assets)
const Planet = ({ type }) => {
  const common = 'animate-[float_10s_ease-in-out_infinite] drop-shadow-[0_12px_40px_rgba(0,0,0,0.45)]';

  switch (type) {
    case 'earth':
      return (
        <svg className={common} width="380" height="380" viewBox="0 0 380 380" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Sphere shading (limb darkening) */}
            <radialGradient id="earthShade" cx="50%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#9bd7ff" />
              <stop offset="55%" stopColor="#3aa0e6" />
              <stop offset="100%" stopColor="#0b2a5a" />
            </radialGradient>

            {/* Highlight gloss */}
            <radialGradient id="earthGloss" cx="36%" cy="32%" r="40%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
              <stop offset="30%" stopColor="rgba(255,255,255,0.25)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>

            {/* Ocean texture via fractal noise mapped to blue range */}
            <filter id="oceanNoise" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox">
              <feTurbulence type="fractalNoise" baseFrequency="0.009" numOctaves="3" seed="7" result="noise" />
              <feColorMatrix in="noise" type="matrix" values="
                0 0 0 0 0.05
                0 0 0 0 0.35
                0 0 0 0 0.75
                0 0 0 1 0" result="blueNoise" />
              <feBlend in="SourceGraphic" in2="blueNoise" mode="overlay" />
            </filter>

            {/* Cloud layer using animated Perlin and displacement for swirl */}
            <filter id="clouds" x="-30%" y="-30%" width="160%" height="160%">
              <feTurbulence type="fractalNoise" baseFrequency="0.006" numOctaves="4" seed="11" result="cloud" />
              <feColorMatrix in="cloud" type="matrix" values="
                0 0 0 0 1
                0 0 0 0 1
                0 0 0 0 1
                0 0 0 0.85 0" result="whiteCloud" />
              <feGaussianBlur in="whiteCloud" stdDeviation="0.6" />
            </filter>

            {/* Land mask: another noise remapped to greens */}
            <filter id="landTex" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.013" numOctaves="4" seed="5" result="land" />
              <feColorMatrix in="land" type="matrix" values="
                0 0 0 0 0.08
                0 0 0 0 0.55
                0 0 0 0 0.22
                0 0 0 1 0" />
            </filter>

            <clipPath id="earthClip">
              <circle cx="190" cy="190" r="150" />
            </clipPath>
          </defs>

          {/* Sphere base with shading */}
          <circle cx="190" cy="190" r="150" fill="url(#earthShade)" />

          {/* Oceans */}
          <g clipPath="url(#earthClip)" filter="url(#oceanNoise)">
            <rect x="0" y="0" width="380" height="380" fill="#1677c6" opacity="0.75" />
          </g>

          {/* Continents (masked patches) */}
          <g clipPath="url(#earthClip)" filter="url(#landTex)">
            <rect x="-30" y="-10" width="460" height="420" fill="#2fb35f" opacity="0.8" />
          </g>

          {/* Subtle coastlines by subtracting land with blur */}
          <g clipPath="url(#earthClip)">
            <rect x="-30" y="-10" width="460" height="420" fill="#1f8a46" opacity="0.35" filter="url(#landTex)" />
          </g>

          {/* Moving cloud layer */}
          <g clipPath="url(#earthClip)" style={{ mixBlendMode: 'screen' }} className="origin-center animate-[spin-slow_120s_linear_infinite]">
            <rect x="0" y="0" width="380" height="380" filter="url(#clouds)" opacity="0.55" />
          </g>

          {/* Polar caps */}
          <ellipse cx="190" cy="55" rx="70" ry="24" fill="white" opacity="0.12" />
          <ellipse cx="190" cy="325" rx="80" ry="28" fill="white" opacity="0.09" />

          {/* Gloss highlight and rim light */}
          <circle cx="190" cy="190" r="150" fill="url(#earthGloss)" />
          <circle cx="190" cy="190" r="150" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="2" />
        </svg>
      );

    case 'mars':
      return (
        <svg className={common} width="360" height="360" viewBox="0 0 360 360" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="marsShade" cx="48%" cy="42%" r="55%">
              <stop offset="0%" stopColor="#ffb08a" />
              <stop offset="55%" stopColor="#d16a3a" />
              <stop offset="100%" stopColor="#7b2d1d" />
            </radialGradient>

            {/* Terrain noise for rocky texture */}
            <filter id="marsTex" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="5" seed="9" result="rock" />
              <feColorMatrix type="matrix" values="
                1 0 0 0 0.1
                0 1 0 0 0.04
                0 0 1 0 0
                0 0 0 1 0" />
            </filter>

            {/* Crater emboss effect */}
            <filter id="craterEmboss" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="turbulence" baseFrequency="0.03" numOctaves="2" seed="3" result="t" />
              <feDiffuseLighting in="t" surfaceScale="1.4" lightingColor="#000" result="diff">
                <feDistantLight azimuth="225" elevation="45" />
              </feDiffuseLighting>
              <feComposite in="diff" in2="SourceGraphic" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
            </filter>

            <clipPath id="marsClip"><circle cx="180" cy="180" r="150" /></clipPath>
          </defs>

          <circle cx="180" cy="180" r="150" fill="url(#marsShade)" />

          {/* Rocky texture */}
          <g clipPath="url(#marsClip)" filter="url(#marsTex)">
            <rect x="-30" y="-30" width="420" height="420" fill="#c45a2c" opacity="0.65" />
          </g>

          {/* Subtle dune bands */}
          <g clipPath="url(#marsClip)" opacity="0.35">
            <rect x="0" y="0" width="360" height="360" fill="url(#marsShade)" />
            <g stroke="#7f2b1b" strokeWidth="8" opacity="0.35">
              <path d="M-10 120 Q 120 160 370 130" />
              <path d="M-20 190 Q 140 220 380 210" />
              <path d="M-10 250 Q 160 280 370 285" />
            </g>
          </g>

          {/* Crater-like shading */}
          <g clipPath="url(#marsClip)" filter="url(#craterEmboss)" opacity="0.45">
            <rect x="-30" y="-30" width="420" height="420" fill="#713222" />
          </g>

          {/* Rim light */}
          <circle cx="180" cy="180" r="150" fill="none" stroke="rgba(255,220,200,0.28)" strokeWidth="2" />
        </svg>
      );

    case 'jupiter':
      return (
        <svg className={common} width="420" height="420" viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="jShade" cx="46%" cy="44%" r="58%">
              <stop offset="0%" stopColor="#ffe9e3" />
              <stop offset="60%" stopColor="#efc0a6" />
              <stop offset="100%" stopColor="#a06f55" />
            </radialGradient>

            {/* Banded flow using turbulence stretched horizontally */}
            <filter id="jBands" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.008 0.035" numOctaves="4" seed="12" result="noise" />
              <feColorMatrix type="matrix" values="
                1 0 0 0 0.93
                0 1 0 0 0.78
                0 0 1 0 0.72
                0 0 0 1 0" />
            </filter>

            <clipPath id="jClip"><circle cx="210" cy="210" r="170" /></clipPath>
          </defs>

          <circle cx="210" cy="210" r="170" fill="url(#jShade)" />

          {/* Flowing bands */}
          <g clipPath="url(#jClip)" filter="url(#jBands)" className="origin-center animate-[spin-slow_240s_linear_infinite]" opacity="0.65">
            <rect x="-40" y="-40" width="500" height="500" fill="#e8b9a0" />
          </g>

          {/* Great Red Spot */}
          <g clipPath="url(#jClip)">
            <radialGradient id="grs" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(135 240) rotate(15) scale(50 36)">
              <stop offset="0%" stopColor="#ff7f6c" />
              <stop offset="80%" stopColor="#c05a4a" />
              <stop offset="100%" stopColor="rgba(192,90,74,0)" />
            </radialGradient>
            <ellipse cx="135" cy="240" rx="48" ry="34" fill="url(#grs)" opacity="0.9" />
          </g>

          <circle cx="210" cy="210" r="170" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="2" />
        </svg>
      );

    case 'saturn':
      return (
        <svg className={common} width="460" height="420" viewBox="0 0 460 420" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="sShade" cx="48%" cy="44%" r="55%">
              <stop offset="0%" stopColor="#ffe9a8" />
              <stop offset="60%" stopColor="#e2b55e" />
              <stop offset="100%" stopColor="#8c6239" />
            </radialGradient>

            <filter id="sBands" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.01 0.04" numOctaves="3" seed="21" result="noise" />
              <feColorMatrix type="matrix" values="
                1 0 0 0 0.95
                0 1 0 0 0.85
                0 0 1 0 0.55
                0 0 0 1 0" />
            </filter>

            {/* Ring gradients */}
            <linearGradient id="ringGold" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f3d49a" />
              <stop offset="50%" stopColor="#fff7e1" />
              <stop offset="100%" stopColor="#e0b868" />
            </linearGradient>

            <clipPath id="sClip"><circle cx="230" cy="210" r="150" /></clipPath>
          </defs>

          {/* Planet Body */}
          <circle cx="230" cy="210" r="150" fill="url(#sShade)" />
          <g clipPath="url(#sClip)" filter="url(#sBands)" opacity="0.6" className="origin-center animate-[spin-slow_260s_linear_infinite]">
            <rect x="-40" y="-40" width="540" height="500" fill="#d9b36b" />
          </g>

          {/* Rings with subtle texture and tilt */}
          <g className="origin-center animate-[spin-slow_40s_linear_infinite]" opacity="0.9">
            <g transform="rotate(-14 230 230)">
              <ellipse cx="230" cy="230" rx="250" ry="70" fill="none" stroke="url(#ringGold)" strokeWidth="14" opacity="0.85" />
              <ellipse cx="230" cy="230" rx="270" ry="84" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
              <ellipse cx="230" cy="230" rx="210" ry="60" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
              {/* Ring texture stripes */}
              <g stroke="rgba(255,255,255,0.25)" strokeWidth="1">
                <ellipse cx="230" cy="230" rx="242" ry="68" />
                <ellipse cx="230" cy="230" rx="232" ry="64" />
                <ellipse cx="230" cy="230" rx="262" ry="78" />
              </g>
            </g>
          </g>

          {/* Rim light */}
          <circle cx="230" cy="210" r="150" fill="none" stroke="rgba(255,255,255,0.26)" strokeWidth="2" />
        </svg>
      );

    case 'blackhole':
      return (
        <svg className={common} width="460" height="460" viewBox="0 0 460 460" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bhCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000" />
              <stop offset="60%" stopColor="#05060b" />
              <stop offset="100%" stopColor="#0b1020" />
            </radialGradient>
            <radialGradient id="accretion" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(245,158,11,0.9)" />
              <stop offset="50%" stopColor="rgba(239,68,68,0.35)" />
              <stop offset="100%" stopColor="rgba(56,189,248,0)" />
            </radialGradient>
          </defs>

          <circle cx="230" cy="230" r="140" fill="#000" />
          <circle cx="230" cy="230" r="170" fill="url(#bhCore)" />
          <g className="origin-center animate-[spin-slow_60s_linear_infinite]" opacity="0.8">
            <ellipse cx="230" cy="230" rx="210" ry="16" fill="url(#accretion)" />
            <ellipse cx="230" cy="230" rx="190" ry="8" fill="rgba(59,130,246,0.18)" />
          </g>
          <circle cx="230" cy="230" r="190" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
        </svg>
      );

    default:
      return null;
  }
};

function SpaceBackground({ theme }) {
  const gradientMap = {
    earth: 'from-[#050814] via-[#0a1330] to-[#0b2a5a]',
    mars: 'from-[#120708] via-[#250b0c] to-[#3b0f14]',
    saturn: 'from-[#0e0a15] via-[#1b1424] to-[#2b2033]',
    jupiter: 'from-[#0e0c0a] via-[#231d17] to-[#3a2b24]',
    blackhole: 'from-[#000000] via-[#04060d] to-[#0b1020]',
  };

  const accentMap = {
    earth: ['#22d3ee', '#60a5fa'],
    mars: ['#fb7185', '#f97316'],
    saturn: ['#fcd34d', '#f59e0b'],
    jupiter: ['#fda4af', '#fb7185'],
    blackhole: ['#60a5fa', '#22d3ee'],
  }[theme] || ['#60a5fa', '#22d3ee'];

  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-gradient-to-br transition-colors duration-700 ${gradientMap[theme]}`}>
      {/* Star fields layered for parallax depth */}
      <div className="absolute inset-0">
        {[0.2, 0.4, 0.65].map((op, idx) => (
          <div key={idx} className="absolute inset-0" style={{ opacity: op }}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.15)_0,rgba(255,255,255,0)_40%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.12)_0,rgba(255,255,255,0)_35%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.1)_0,rgba(255,255,255,0)_40%)] animate-[driftX_20s_ease-in-out_infinite]" />
          </div>
        ))}
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(60)].map((_, i) => (
          <span
            key={i}
            className="absolute h-0.5 w-0.5 bg-white/70 rounded-full"
            style={{
              left: `${(i * 73) % 100}%`,
              top: `${(i * 37) % 100}%`,
              opacity: 0.2 + ((i % 7) / 10),
              animation: `twinkle ${(4 + (i % 5))}s ease-in-out ${(i % 3) * 0.7}s infinite`
            }}
          />
        ))}
      </div>

      {/* Shooting star */}
      <div className="absolute left-[-10vw] top-[70%] w-24 h-[2px] bg-gradient-to-r from-transparent to-white/90 rounded-full opacity-70 animate-[shoot_5s_ease-in-out_infinite]" />

      {/* Planet visual */}
      <div className="absolute right-[-60px] top-[10%] sm:right-[-40px] sm:top-[5%] md:right-[5%] md:top-[8%] opacity-90">
        <Planet type={theme} />
      </div>

      {/* Nebula gradient blobs with parallax drift */}
      <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full blur-3xl" style={{ background: `linear-gradient(145deg, ${accentMap[0]}33, ${accentMap[1]}26)`, animation: 'driftY 18s ease-in-out infinite' }} />
      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full blur-3xl" style={{ background: `linear-gradient(145deg, ${accentMap[1]}33, ${accentMap[0]}26)`, animation: 'driftX 22s ease-in-out infinite' }} />

      {/* Film grain & vignette for cinematic feel */}
      <div className="noise-overlay" />
      <div className="vignette-overlay" />
    </div>
  );
}

export default SpaceBackground;
