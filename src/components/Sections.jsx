import React from 'react';

export function ProfileSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Halo, Saya</h2>
      <p className="text-white/80 leading-relaxed">
        Frontend Engineer yang menyukai desain sistem, animasi halus, dan pengalaman pengguna yang menyenangkan.
        Berfokus pada React, Tailwind, dan arsitektur komponen modern.
      </p>
      <ul className="grid sm:grid-cols-2 gap-4">
        <li className="rounded-lg bg-white/10 border border-white/10 p-4 text-white">Pengalaman: 4+ tahun</li>
        <li className="rounded-lg bg-white/10 border border-white/10 p-4 text-white">Domisili: Indonesia</li>
        <li className="rounded-lg bg-white/10 border border-white/10 p-4 text-white">Minat: UI/UX, Animasi, 3D</li>
        <li className="rounded-lg bg-white/10 border border-white/10 p-4 text-white">Tools: React, Vite, Tailwind</li>
      </ul>
    </div>
  );
}

export function AboutSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Tentang Saya</h2>
      <p className="text-white/80 leading-relaxed">
        Saya percaya bahwa perangkat lunak yang hebat diciptakan di persimpangan antara desain dan teknologi. 
        Saya menikmati membangun antarmuka yang cepat, dapat diakses, dan mudah digunakan.
      </p>
      <div className="grid md:grid-cols-3 gap-4">
        {["Performance", "Aksesibilitas", "Desain Sistem"].map((v) => (
          <div key={v} className="rounded-lg bg-white/10 border border-white/10 p-4 text-white">
            <h3 className="font-semibold">{v}</h3>
            <p className="text-sm text-white/70">Fokus untuk memastikan pengalaman terbaik pada berbagai perangkat.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GallerySection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Galeri</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1,2,3,4,5,6].map((i) => (
          <div key={i} className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <div className="aspect-video w-full bg-gradient-to-br from-white/10 to-white/5" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 flex items-center justify-center text-white">Pratinjau {i}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const projects = [
    { name: 'Dashboard Analitik', stack: 'React, Tailwind, D3', desc: 'Visualisasi data real‑time dengan performa tinggi.' },
    { name: 'E‑Commerce UI Kit', stack: 'React, Tailwind', desc: 'Komponen reusable untuk toko online modern.' },
    { name: 'Landing 3D', stack: 'React, Three.js', desc: 'Landing page interaktif dengan elemen 3D ringan.' },
  ];
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Projek yang Dibuat</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((p) => (
          <div key={p.name} className="rounded-xl border border-white/10 bg-white/5 p-5 text-white">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{p.name}</h3>
              <span className="text-xs bg-white/10 px-2 py-1 rounded-md">{p.stack}</span>
            </div>
            <p className="mt-2 text-white/80 text-sm">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LinksSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Link & Pesan</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        <a href="https://instagram.com" target="_blank" className="rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 text-white px-4 py-3 text-center font-medium shadow hover:opacity-95">Instagram</a>
        <a href="https://tiktok.com" target="_blank" className="rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 text-white px-4 py-3 text-center font-medium shadow hover:opacity-95">TikTok</a>
        <a href="https://youtube.com" target="_blank" className="rounded-lg bg-gradient-to-br from-red-600 to-red-500 text-white px-4 py-3 text-center font-medium shadow hover:opacity-95">YouTube</a>
      </div>
      <form className="mt-4 grid gap-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <input className="rounded-md bg-white/10 border border-white/10 px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400" placeholder="Nama" />
          <input className="rounded-md bg-white/10 border border-white/10 px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400" placeholder="Email" type="email" />
        </div>
        <textarea rows={4} className="rounded-md bg-white/10 border border-white/10 px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400" placeholder="Tulis pesan untuk pemilik website" />
        <button type="button" onClick={() => alert('Pesan terkirim! (demo)')} className="inline-flex items-center justify-center rounded-md bg-cyan-500 px-4 py-2 font-semibold text-white hover:bg-cyan-400">Kirim Pesan</button>
      </form>
    </div>
  );
}
