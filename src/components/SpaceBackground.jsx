import React from 'react';

// Hyper-detailed, procedural SVG planets with multi-layer textures and lighting
const Planet = ({ type }) => {
  const common = 'animate-[float_10s_ease-in-out_infinite] drop-shadow-[0_16px_48px_rgba(0,0,0,0.55)]';

  switch (type) {
    case 'earth':
      return (
        <svg className={common} width="420" height="420" viewBox="0 0 420 420" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Sphere shading */}
            <radialGradient id="eShade" cx="48%" cy="44%" r="56%">
              <stop offset="0%" stopColor="#a9dcff" />
              <stop offset="55%" stopColor="#3ca6ea" />
              <stop offset="100%" stopColor="#0b2a5a" />
            </radialGradient>

            {/* Atmosphere glow */}
            <radialGradient id="eAtm" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="rgba(56,189,248,0.18)" />
              <stop offset="100%" stopColor="rgba(56,189,248,0)" />
            </radialGradient>

            {/* Ocean base + bump map */}
            <filter id="eOceanTex" x="-30%" y="-30%" width="160%" height="160%">
              <feTurbulence type="fractalNoise" baseFrequency="0.006" numOctaves="4" seed="7" result="n1" />
              <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="14" result="n2" />
              <feBlend in="n1" in2="n2" mode="multiply" result="nmix" />
              <feColorMatrix in="nmix" type="matrix" values="
                0 0 0 0 0.06
                0 0 0 0 0.36
                0 0 0 0 0.82
                0 0 0 1 0" result="oceanC" />
            </filter>

            {/* Land mass mask and detail */}
            <filter id="eLandMask" x="-30%" y="-30%" width="160%" height="160%">
              <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="5" seed="9" result="land" />
              <feGaussianBlur in="land" stdDeviation="0.8" />
              <feComponentTransfer>
                <feFuncA type="table" tableValues="0 0.4 0.8 1" />
              </feComponentTransfer>
            </filter>

            <filter id="eLandColor" x="-30%" y="-30%" width="160%" height="160%">
              <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="4" seed="5" result="hills" />
              <feColorMatrix in="hills" type="matrix" values="
                0 0 0 0 0.10
                0 0 0 0 0.58
                0 0 0 0 0.26
                0 0 0 1 0" />
            </filter>

            {/* Specular highlights over ocean to mimic sun glint */}
            <filter id="eSpec" x="-50%" y="-50%" width="200%" height="200%">
              <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" seed="13" result="hmap" />
              <feSpecularLighting in="hmap" surfaceScale="3" specularConstant="0.6" specularExponent="12" lightingColor="#ffffff" result="spec">
                <feDistantLight azimuth="315" elevation="35" />
              </feSpecularLighting>
              <feGaussianBlur stdDeviation="0.6" />
            </filter>

            {/* Clouds */}
            <filter id="eClouds" x="-40%" y="-40%" width="180%" height="180%">
              <feTurbulence type="fractalNoise" baseFrequency="0.0065" numOctaves="5" seed="11" result="c" />
              <feColorMatrix in="c" type="matrix" values="
                0 0 0 0 1
                0 0 0 0 1
                0 0 0 0 1
                0 0 0 0.8 0" />
              <feGaussianBlur stdDeviation="0.7" />
            </filter>

            {/* Clip for sphere */}
            <clipPath id="eClip"><circle cx="210" cy="210" r="170" /></clipPath>
          </defs>

          {/* Planet body */}
          <circle cx="210" cy="210" r="170" fill="url(#eShade)" />

          {/* Oceans */}
          <g clipPath="url(#eClip)" filter="url(#eOceanTex)">
            <rect x="-40" y="-40" width="500" height="500" fill="#0f6eb8" opacity="0.8" />
          </g>

          {/* Land overlay */}
          <g clipPath="url(#eClip)">
            <rect x="-40" y="-40" width="500" height="500" filter="url(#eLandMask)" fill="#2fb35f" opacity="0.85" />
            <rect x="-40" y="-40" width="500" height="500" filter="url(#eLandColor)" opacity="0.45" />
          </g>

          {/* Subtle coastline darkening */}
          <g clipPath="url(#eClip)" opacity="0.25">
            <rect x="-40" y="-40" width="500" height="500" filter="url(#eLandMask)" fill="#1b7b45" />
          </g>

          {/* Cloud layer, slowly rotating */}
          <g clipPath="url(#eClip)" style={{ mixBlendMode: 'screen' }} className="origin-center animate-[spin-slow_180s_linear_infinite]">
            <rect x="0" y="0" width="420" height="420" filter="url(#eClouds)" opacity="0.55" />
          </g>

          {/* Specular glints over oceans */}
          <g clipPath="url(#eClip)" style={{ mixBlendMode: 'screen' }} opacity="0.25">
            <rect x="-40" y="-40" width="500" height="500" filter="url(#eSpec)" />
          </g>

          {/* Atmosphere glow & rim light */}
          <circle cx="210" cy="210" r="175" fill="url(#eAtm)" />
          <circle cx="210" cy="210" r="170" fill="none" stroke="rgba(173,216,230,0.25)" strokeWidth="2" />
        </svg>
      );

    case 'mars':
      return (
        <svg className={common} width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="mShade" cx="48%" cy="44%" r="56%">
              <stop offset="0%" stopColor="#ffb08a" />
              <stop offset="55%" stopColor="#d16a3a" />
              <stop offset="100%" stopColor="#7b2d1d" />
            </radialGradient>

            {/* Rocky texture */}
            <filter id="mTex" x="-30%" y="-30%" width="160%" height="160%">
              <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="5" seed="9" result="rock" />
              <feColorMatrix type="matrix" values="
                1 0 0 0 0.10
                0 1 0 0 0.05
                0 0 1 0 0
                0 0 0 1 0" />
            </filter>

            {/* Crater shading with diffuse lighting */}
            <filter id="mCrater" x="-40%" y="-40%" width="180%" height="180%">
              <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="3" result="h" />
              <feDiffuseLighting in="h" surfaceScale="2" lightingColor="#000" result="light">
                <feDistantLight azimuth="220" elevation="40" />
              </feDiffuseLighting>
              <feComposite in="light" in2="SourceGraphic" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
            </filter>

            <clipPath id="mClip"><circle cx="200" cy="200" r="170" /></clipPath>
          </defs>

          <circle cx="200" cy="200" r="170" fill="url(#mShade)" />

          <g clipPath="url(#mClip)" filter="url(#mTex)">
            <rect x="-40" y="-40" width="480" height="480" fill="#c45a2c" opacity="0.75" />
          </g>

          {/* Dune bands */}
          <g clipPath="url(#mClip)" opacity="0.35">
            <g stroke="#7f2b1b" strokeWidth="8" opacity="0.4">
              <path d="M-20 120 Q 140 160 420 130" />
              <path d="M-30 190 Q 160 220 430 210" />
              <path d="M-10 250 Q 180 280 410 285" />
            </g>
          </g>

          {/* Crater emboss */}
          <g clipPath="url(#mClip)" filter="url(#mCrater)" opacity="0.45">
            <rect x="-40" y="-40" width="480" height="480" fill="#713222" />
          </g>

          {/* Polar caps */}
          <ellipse cx="200" cy="48" rx="70" ry="22" fill="white" opacity="0.12" />
          <ellipse cx="200" cy="352" rx="82" ry="28" fill="white" opacity="0.09" />

          <circle cx="200" cy="200" r="170" fill="none" stroke="rgba(255,220,200,0.28)" strokeWidth="2" />
        </svg>
      );

    case 'jupiter':
      return (
        <svg className={common} width="460" height="460" viewBox="0 0 460 460" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="jShade" cx="46%" cy="44%" r="58%">
              <stop offset="0%" stopColor="#ffe9e3" />
              <stop offset="60%" stopColor="#efc0a6" />
              <stop offset="100%" stopColor="#a06f55" />
            </radialGradient>

            {/* Flowing bands */}
            <filter id="jBands" x="-30%" y="-30%" width="160%" height="160%">
              <feTurbulence type="fractalNoise" baseFrequency="0.007 0.032" numOctaves="5" seed="12" result="n" />
              <feColorMatrix type="matrix" values="
                1 0 0 0 0.93
                0 1 0 0 0.78
                0 0 1 0 0.72
                0 0 0 1 0" />
            </filter>

            <clipPath id="jClip"><circle cx="230" cy="230" r="190" /></clipPath>
          </defs>

          <circle cx="230" cy="230" r="190" fill="url(#jShade)" />

          <g clipPath="url(#jClip)" filter="url(#jBands)" className="origin-center animate-[spin-slow_240s_linear_infinite]" opacity="0.65">
            <rect x="-60" y="-60" width="580" height="580" fill="#e8b9a0" />
          </g>

          {/* Great Red Spot */}
          <g clipPath="url(#jClip)">
            <radialGradient id="grs2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(150 270) rotate(12) scale(56 42)">
              <stop offset="0%" stopColor="#ff7f6c" />
              <stop offset="80%" stopColor="#c05a4a" />
              <stop offset="100%" stopColor="rgba(192,90,74,0)" />
            </radialGradient>
            <ellipse cx="150" cy="270" rx="54" ry="40" fill="url(#grs2)" opacity="0.9" />
          </g>

          <circle cx="230" cy="230" r="190" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="2" />
        </svg>
      );

    case 'saturn':
      return (
        <svg className={common} width="520" height="460" viewBox="0 0 520 460" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="sShade" cx="48%" cy="44%" r="56%">
              <stop offset="0%" stopColor="#ffe9a8" />
              <stop offset="60%" stopColor="#e2b55e" />
              <stop offset="100%" stopColor="#8c6239" />
            </radialGradient>

            <filter id="sBands" x="-30%" y="-30%" width="160%" height="160%">
              <feTurbulence type="fractalNoise" baseFrequency="0.01 0.042" numOctaves="3" seed="21" result="n" />
              <feColorMatrix type="matrix" values="
                1 0 0 0 0.95
                0 1 0 0 0.85
                0 0 1 0 0.55
                0 0 0 1 0" />
            </filter>

            {/* Rings with subtle noise gap (Cassini division) */}
            <linearGradient id="ringGold" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f3d49a" />
              <stop offset="50%" stopColor="#fff7e1" />
              <stop offset="100%" stopColor="#e0b868" />
            </linearGradient>

            <filter id="ringNoise" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="2" result="r" />
              <feColorMatrix in="r" type="matrix" values="
                0 0 0 0 1
                0 0 0 0 1
                0 0 0 0 1
                0 0 0 1 0" />
            </filter>

            <clipPath id="sClip"><circle cx="260" cy="230" r="170" /></clipPath>
          </defs>

          {/* Body */}
          <circle cx="260" cy="230" r="170" fill="url(#sShade)" />
          <g clipPath="url(#sClip)" filter="url(#sBands)" opacity="0.6" className="origin-center animate-[spin-slow_260s_linear_infinite]">
            <rect x="-60" y="-60" width="640" height="620" fill="#d9b36b" />
          </g>

          {/* Rings with tilt */}
          <g className="origin-center animate-[spin-slow_48s_linear_infinite]" opacity="0.92">
            <g transform="rotate(-14 260 260)">
              {/* Base rings */}
              <ellipse cx="260" cy="260" rx="300" ry="88" fill="none" stroke="url(#ringGold)" strokeWidth="14" opacity="0.9" />
              <ellipse cx="260" cy="260" rx="326" ry="100" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
              <ellipse cx="260" cy="260" rx="238" ry="68" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />

              {/* Cassini-like division via thin darker band */}
              <ellipse cx="260" cy="260" rx="288" ry="84" fill="none" stroke="rgba(0,0,0,0.22)" strokeWidth="2" />

              {/* Texture stripes */}
              <g stroke="rgba(255,255,255,0.22)" strokeWidth="1">
                <ellipse cx="260" cy="260" rx="312" ry="94" />
                <ellipse cx="260" cy="260" rx="298" ry="88" />
                <ellipse cx="260" cy="260" rx="274" ry="80" />
              </g>
            </g>
          </g>

          {/* Rim light */}
          <circle cx="260" cy="230" r="170" fill="none" stroke="rgba(255,255,255,0.26)" strokeWidth="2" />
        </svg>
      );

    case 'blackhole':
      return (
        <svg className={common} width="520" height="520" viewBox="0 0 520 520" xmlns="http://www.w3.org/2000/svg">
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

          <circle cx="260" cy="260" r="150" fill="#000" />
          <circle cx="260" cy="260" r="190" fill="url(#bhCore)" />
          <g className="origin-center animate-[spin-slow_60s_linear_infinite]" opacity="0.85">
            <ellipse cx="260" cy="260" rx="240" ry="18" fill="url(#accretion)" />
            <ellipse cx="260" cy="260" rx="216" ry="9" fill="rgba(59,130,246,0.18)" />
          </g>
          <circle cx="260" cy="260" r="210" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />
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
