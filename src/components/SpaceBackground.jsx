import React, { useEffect, useRef } from 'react';

// Artistic, cinematic space scene with tasteful composition and restrained palettes
// Focus: slower pacing, unified light direction (top-left), subtle parallax, depth-of-field, lens bloom

const LIGHT = {
  // screen light origin used for flares and terminator direction
  x: 0.18,
  y: 0.18,
};

// Planet with unified terminator shading and refined palettes
const Planet = ({ type }) => {
  const common = 'will-change-transform select-none drop-shadow-[0_32px_120px_rgba(0,0,0,0.55)]';

  // soft rim and terminator overlay to add directionality
  const Terminator = ({ cx, cy, r }) => (
    <g>
      {/* limb darkening */}
      <radialGradient id="limb" cx="50%" cy="50%" r="50%">
        <stop offset="60%" stopColor="rgba(0,0,0,0)" />
        <stop offset="100%" stopColor="rgba(0,0,0,0.35)" />
      </radialGradient>
      <circle cx={cx} cy={cy} r={r} fill="url(#limb)" />
      {/* directional terminator gradient */}
      <linearGradient id="dir" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="rgba(0,0,0,0.45)" />
        <stop offset="38%" stopColor="rgba(0,0,0,0.18)" />
        <stop offset="60%" stopColor="rgba(0,0,0,0)" />
      </linearGradient>
      <ellipse cx={cx - r * 0.14} cy={cy - r * 0.14} rx={r * 1.2} ry={r * 1.2} fill="url(#dir)" />
    </g>
  );

  switch (type) {
    case 'earth':
      return (
        <svg className={common} width="520" height="520" viewBox="0 0 520 520" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Base sphere grade (muted teal/indigo) */}
            <radialGradient id="eShade" cx="48%" cy="44%" r="56%">
              <stop offset="0%" stopColor="#a8d5f1" />
              <stop offset="55%" stopColor="#457fb3" />
              <stop offset="100%" stopColor="#0b2148" />
            </radialGradient>

            {/* Atmosphere halo */}
            <radialGradient id="eAtm" cx="50%" cy="50%" r="50%">
              <stop offset="60%" stopColor="rgba(86,190,255,0.14)" />
              <stop offset="100%" stopColor="rgba(56,189,248,0)" />
            </radialGradient>

            {/* Ocean turbulences (tamed) */}
            <filter id="eOceanTex" x="-30%" y="-30%" width="160%" height="160%">
              <feTurbulence type="fractalNoise" baseFrequency="0.006" numOctaves="4" seed="7" result="n1" />
              <feTurbulence type="fractalNoise" baseFrequency="0.016" numOctaves="2" seed="14" result="n2" />
              <feBlend in="n1" in2="n2" mode="multiply" result="nmix" />
              <feColorMatrix in="nmix" type="matrix" values="
                0 0 0 0 0.06
                0 0 0 0 0.33
                0 0 0 0 0.74
                0 0 0 1 0" result="oceanC" />
            </filter>

            {/* Land mask and color (olive/evergreen) */}
            <filter id="eLandMask" x="-30%" y="-30%" width="160%" height="160%">
              <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="5" seed="9" result="land" />
              <feGaussianBlur in="land" stdDeviation="0.8" />
              <feComponentTransfer>
                <feFuncA type="table" tableValues="0 0.4 0.82 1" />
              </feComponentTransfer>
            </filter>

            <filter id="eLandColor" x="-30%" y="-30%" width="160%" height="160%">
              <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="4" seed="5" result="hills" />
              <feColorMatrix in="hills" type="matrix" values="
                0 0 0 0 0.13
                0 0 0 0 0.52
                0 0 0 0 0.28
                0 0 0 1 0" />
            </filter>

            {/* Soft specular glints */}
            <filter id="eSpec" x="-50%" y="-50%" width="200%" height="200%">
              <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" seed="13" result="hmap" />
              <feSpecularLighting in="hmap" surfaceScale="2.5" specularConstant="0.5" specularExponent="10" lightingColor="#fff" result="spec">
                <feDistantLight azimuth="315" elevation="35" />
              </feSpecularLighting>
              <feGaussianBlur stdDeviation="0.6" />
            </filter>

            {/* Clouds (desaturated, slower) */}
            <filter id="eClouds" x="-40%" y="-40%" width="180%" height="180%">
              <feTurbulence type="fractalNoise" baseFrequency="0.0065" numOctaves="5" seed="11" result="c" />
              <feColorMatrix in="c" type="matrix" values="
                0 0 0 0 1
                0 0 0 0 1
                0 0 0 0 1
                0 0 0 0.7 0" />
              <feGaussianBlur stdDeviation="0.7" />
            </filter>

            <clipPath id="eClip"><circle cx="260" cy="260" r="200" /></clipPath>
          </defs>

          {/* Planet body */}
          <circle cx="260" cy="260" r="200" fill="url(#eShade)" />

          {/* Oceans */}
          <g clipPath="url(#eClip)" filter="url(#eOceanTex)">
            <rect x="-40" y="-40" width="600" height="600" fill="#0e5e9a" opacity="0.78" />
          </g>

          {/* Land overprint */}
          <g clipPath="url(#eClip)">
            <rect x="-40" y="-40" width="600" height="600" filter="url(#eLandMask)" fill="#2e8a54" opacity="0.85" />
            <rect x="-40" y="-40" width="600" height="600" filter="url(#eLandColor)" opacity="0.42" />
          </g>

          {/* Coastline darkening */}
          <g clipPath="url(#eClip)" opacity="0.22">
            <rect x="-40" y="-40" width="600" height="600" filter="url(#eLandMask)" fill="#206442" />
          </g>

          {/* Cloud layer */}
          <g clipPath="url(#eClip)" style={{ mixBlendMode: 'screen' }} className="origin-center animate-[spin-slow_260s_linear_infinite]">
            <rect x="0" y="0" width="520" height="520" filter="url(#eClouds)" opacity="0.45" />
          </g>

          {/* Specular glints */}
          <g clipPath="url(#eClip)" style={{ mixBlendMode: 'screen' }} opacity="0.18">
            <rect x="-40" y="-40" width="600" height="600" filter="url(#eSpec)" />
          </g>

          {/* Atmosphere rim */}
          <circle cx="260" cy="260" r="210" fill="url(#eAtm)" />

          <Terminator cx={260} cy={260} r={200} />
        </svg>
      );

    case 'mars':
      return (
        <svg className={common} width="480" height="480" viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="mShade" cx="48%" cy="44%" r="56%">
              <stop offset="0%" stopColor="#ffcfb6" />
              <stop offset="55%" stopColor="#c26943" />
              <stop offset="100%" stopColor="#692c21" />
            </radialGradient>

            {/* Rocky texture */}
            <filter id="mTex" x="-30%" y="-30%" width="160%" height="160%">
              <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="5" seed="9" result="rock" />
              <feColorMatrix type="matrix" values="
                1 0 0 0 0.10
                0 1 0 0 0.06
                0 0 1 0 0
                0 0 0 1 0" />
            </filter>

            {/* Crater emboss */}
            <filter id="mCrater" x="-40%" y="-40%" width="180%" height="180%">
              <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="3" seed="3" result="h" />
              <feDiffuseLighting in="h" surfaceScale="2" lightingColor="#000" result="light">
                <feDistantLight azimuth="220" elevation="40" />
              </feDiffuseLighting>
              <feComposite in="light" in2="SourceGraphic" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
            </filter>

            <clipPath id="mClip"><circle cx="240" cy="240" r="195" /></clipPath>
          </defs>

          <circle cx="240" cy="240" r="195" fill="url(#mShade)" />

          <g clipPath="url(#mClip)" filter="url(#mTex)">
            <rect x="-40" y="-40" width="560" height="560" fill="#b65634" opacity="0.72" />
          </g>

          {/* Dune bands (subtle) */}
          <g clipPath="url(#mClip)" opacity="0.28">
            <g stroke="#7f3a2a" strokeWidth="8" opacity="0.35">
              <path d="M-20 120 Q 140 160 520 130" />
              <path d="M-30 190 Q 160 220 530 210" />
              <path d="M-10 250 Q 180 280 510 285" />
            </g>
          </g>

          {/* Crater emboss */}
          <g clipPath="url(#mClip)" filter="url(#mCrater)" opacity="0.4">
            <rect x="-40" y="-40" width="560" height="560" fill="#5d2a1f" />
          </g>

          {/* Polar caps */}
          <ellipse cx="240" cy="60" rx="72" ry="20" fill="white" opacity="0.1" />
          <ellipse cx="240" cy="420" rx="84" ry="26" fill="white" opacity="0.08" />

          <Terminator cx={240} cy={240} r={195} />
        </svg>
      );

    case 'jupiter':
      return (
        <svg className={common} width="560" height="560" viewBox="0 0 560 560" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="jShade" cx="46%" cy="44%" r="58%">
              <stop offset="0%" stopColor="#ffe9e3" />
              <stop offset="60%" stopColor="#e9c6b1" />
              <stop offset="100%" stopColor="#916a55" />
            </radialGradient>

            {/* Flowing bands */}
            <filter id="jBands" x="-30%" y="-30%" width="160%" height="160%">
              <feTurbulence type="fractalNoise" baseFrequency="0.007 0.028" numOctaves="5" seed="12" result="n" />
              <feColorMatrix type="matrix" values="
                1 0 0 0 0.92
                0 1 0 0 0.8
                0 0 1 0 0.72
                0 0 0 1 0" />
            </filter>

            <clipPath id="jClip"><circle cx="280" cy="280" r="235" /></clipPath>
          </defs>

          <circle cx="280" cy="280" r="235" fill="url(#jShade)" />

          <g clipPath="url(#jClip)" filter="url(#jBands)" className="origin-center animate-[spin-slow_300s_linear_infinite]" opacity="0.56">
            <rect x="-60" y="-60" width="680" height="680" fill="#e0b9a0" />
          </g>

          {/* Great Red Spot (painterly, diffused) */}
          <g clipPath="url(#jClip)">
            <radialGradient id="grs2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(200 330) rotate(12) scale(70 48)">
              <stop offset="0%" stopColor="#ff8975" />
              <stop offset="75%" stopColor="#ba6a5b" />
              <stop offset="100%" stopColor="rgba(186,106,91,0)" />
            </radialGradient>
            <ellipse cx="200" cy="330" rx="68" ry="46" fill="url(#grs2)" opacity="0.85" />
          </g>

          <Terminator cx={280} cy={280} r={235} />
        </svg>
      );

    case 'saturn':
      return (
        <svg className={common} width="640" height="540" viewBox="0 0 640 540" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="sShade" cx="48%" cy="44%" r="56%">
              <stop offset="0%" stopColor="#ffe6ad" />
              <stop offset="60%" stopColor="#d0a460" />
              <stop offset="100%" stopColor="#7a5a3b" />
            </radialGradient>

            <filter id="sBands" x="-30%" y="-30%" width="160%" height="160%">
              <feTurbulence type="fractalNoise" baseFrequency="0.01 0.042" numOctaves="3" seed="21" result="n" />
              <feColorMatrix type="matrix" values="
                1 0 0 0 0.95
                0 1 0 0 0.85
                0 0 1 0 0.58
                0 0 0 1 0" />
            </filter>

            {/* Ring gradients */}
            <linearGradient id="ringGold" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f3d49a" />
              <stop offset="50%" stopColor="#fff7e1" />
              <stop offset="100%" stopColor="#e0b868" />
            </linearGradient>

            <clipPath id="sClip"><circle cx="320" cy="270" r="220" /></clipPath>
          </defs>

          {/* Body */}
          <circle cx="320" cy="270" r="220" fill="url(#sShade)" />
          <g clipPath="url(#sClip)" filter="url(#sBands)" opacity="0.52" className="origin-center animate-[spin-slow_320s_linear_infinite]">
            <rect x="-60" y="-60" width="760" height="740" fill="#d1b175" />
          </g>

          {/* Rings with elegant tilt */}
          <g className="origin-center animate-[spin-slow_80s_linear_infinite]" opacity="0.92">
            <g transform="rotate(-12 320 320)">
              <ellipse cx="320" cy="320" rx="420" ry="118" fill="none" stroke="url(#ringGold)" strokeWidth="16" opacity="0.95" />
              <ellipse cx="320" cy="320" rx="454" ry="132" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" />
              <ellipse cx="320" cy="320" rx="342" ry="96" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />
              <ellipse cx="320" cy="320" rx="398" ry="112" fill="none" stroke="rgba(0,0,0,0.22)" strokeWidth="2" />
              <g stroke="rgba(255,255,255,0.18)" strokeWidth="1">
                <ellipse cx="320" cy="320" rx="436" ry="126" />
                <ellipse cx="320" cy="320" rx="412" ry="118" />
                <ellipse cx="320" cy="320" rx="372" ry="106" />
              </g>
            </g>
          </g>

          <Terminator cx={320} cy={270} r={220} />
        </svg>
      );

    case 'blackhole':
      return (
        <svg className={common} width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <radialGradient id="bhCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000" />
              <stop offset="60%" stopColor="#05060b" />
              <stop offset="100%" stopColor="#0b1020" />
            </radialGradient>
            <radialGradient id="accretion" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(245,158,11,0.85)" />
              <stop offset="45%" stopColor="rgba(239,68,68,0.35)" />
              <stop offset="100%" stopColor="rgba(56,189,248,0)" />
            </radialGradient>
          </defs>

          <circle cx="300" cy="300" r="170" fill="#000" />
          <circle cx="300" cy="300" r="215" fill="url(#bhCore)" />
          <g className="origin-center animate-[spin-slow_80s_linear_infinite]" opacity="0.85">
            <ellipse cx="300" cy="300" rx="270" ry="22" fill="url(#accretion)" />
            <ellipse cx="300" cy="300" rx="244" ry="10" fill="rgba(59,130,246,0.16)" />
          </g>
        </svg>
      );

    default:
      return null;
  }
};

function SpaceBackground({ theme }) {
  const containerRef = useRef(null);

  // refined palettes, subtle and filmic
  const gradientMap = {
    earth: 'from-[#0a0d16] via-[#0b1324] to-[#0e213d]',
    mars: 'from-[#0c0809] via-[#190e0f] to-[#2a1116]',
    saturn: 'from-[#0c0a10] via-[#17121e] to-[#241c2a]',
    jupiter: 'from-[#0d0b0a] via-[#1f1915] to-[#34271f]',
    blackhole: 'from-[#000000] via-[#05060a] to-[#0b1020]',
  };

  const accentMap = {
    earth: ['#8ec5ff', '#7bd6ff'],
    mars: ['#ffb199', '#ff8e62'],
    saturn: ['#ffe1a6', '#f2c06b'],
    jupiter: ['#ffd1c8', '#f29f95'],
    blackhole: ['#9cc7ff', '#78e6ff'],
  }[theme] || ['#9cc7ff', '#78e6ff'];

  // Parallax via mouse move (very subtle)
  useEffect(() => {
    const handle = (e) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dx = (e.clientX / w - 0.5);
      const dy = (e.clientY / h - 0.5);
      if (!containerRef.current) return;
      containerRef.current.style.setProperty('--parx', String(dx));
      containerRef.current.style.setProperty('--pary', String(dy));
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  const parallax = (m = 1) => `translate3d(calc(var(--parx,0) * ${m * 24}px), calc(var(--pary,0) * ${m * 24}px), 0)`;

  return (
    <div ref={containerRef} className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-gradient-to-br transition-colors duration-700 ${gradientMap[theme]}`}>
      {/* Background subtle vignette already in CSS; add color grade overlay */}
      <div className="absolute inset-0 mix-blend-soft-light opacity-60" style={{ background: 'radial-gradient(120% 120% at 20% 20%, rgba(255,255,255,0.05), rgba(0,0,0,0.4))' }} />

      {/* Star fields with depth-of-field: near (blurred), mid, far */}
      <div className="absolute inset-0" style={{ transform: parallax(0.25) }}>
        <div className="absolute inset-0 opacity-30 blur-[1px]" style={{ background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.1) 0, rgba(255,255,255,0) 40%), radial-gradient(circle at 70% 50%, rgba(255,255,255,0.08) 0, rgba(255,255,255,0) 35%), radial-gradient(circle at 50% 80%, rgba(255,255,255,0.06) 0, rgba(255,255,255,0) 40%)' }} />
      </div>
      <div className="absolute inset-0" style={{ transform: parallax(0.5) }}>
        <div className="absolute inset-0 opacity-45" style={{ background: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.14) 0, rgba(255,255,255,0) 42%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.12) 0, rgba(255,255,255,0) 35%), radial-gradient(circle at 50% 80%, rgba(255,255,255,0.1) 0, rgba(255,255,255,0) 40%)' }} />
      </div>
      <div className="absolute inset-0" style={{ transform: parallax(0.12) }}>
        <div className="absolute inset-0 opacity-18 blur-[2px]" style={{ background: 'radial-gradient(circle at 40% 10%, rgba(255,255,255,0.06) 0, rgba(255,255,255,0) 35%), radial-gradient(circle at 85% 70%, rgba(255,255,255,0.05) 0, rgba(255,255,255,0) 40%)' }} />
      </div>

      {/* Fewer, more intentional particles */}
      <div className="absolute inset-0" style={{ transform: parallax(0.35) }}>
        {[...Array(28)].map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${(i * 137) % 100}%`,
              top: `${(i * 83) % 100}%`,
              width: `${0.5 + (i % 4) * 0.5}px`,
              height: `${0.5 + (i % 4) * 0.5}px`,
              background: 'rgba(255,255,255,0.85)',
              opacity: 0.12 + ((i % 7) / 18),
              filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.2))',
              animation: `twinkle ${5 + (i % 5)}s ease-in-out ${(i % 3) * 0.9}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Lens bloom / flare from top-left light */}
      <div className="absolute" style={{
        left: `${LIGHT.x * 100}%`,
        top: `${LIGHT.y * 100}%`,
        transform: 'translate(-50%, -50%)',
        width: '56vmin',
        height: '56vmin',
        background: 'radial-gradient(closest-side, rgba(255,255,255,0.16), rgba(255,255,255,0))',
        mixBlendMode: 'screen',
        filter: 'blur(24px)',
        opacity: 0.6,
      }} />

      {/* Planet composition: larger, slightly off-canvas for dramatic framing */}
      <div className="absolute" style={{ right: '-8vw', top: '6vh', opacity: 0.95, transform: parallax(0.1) }}>
        <Planet type={theme} />
      </div>

      {/* Painterly nebula blobs with soft chroma */}
      <div className="absolute -bottom-24 -left-24 h-[32rem] w-[32rem] rounded-full blur-3xl" style={{ background: `linear-gradient(145deg, ${accentMap[0]}26, ${accentMap[1]}1f)`, transform: parallax(0.18) }} />
      <div className="absolute -top-28 -right-28 h-[28rem] w-[28rem] rounded-full blur-3xl" style={{ background: `linear-gradient(145deg, ${accentMap[1]}24, ${accentMap[0]}1a)`, transform: parallax(0.28) }} />

      {/* Film grain & vignette for cinematic feel */}
      <div className="noise-overlay" />
      <div className="vignette-overlay" />
    </div>
  );
}

export default SpaceBackground;
