import { User, Info, Images, Hammer, Link } from 'lucide-react';

function Sidebar({ current, onChange }) {
  const items = [
    { key: 'profile', label: 'Profil', icon: User },
    { key: 'about', label: 'About Me', icon: Info },
    { key: 'gallery', label: 'Galeri', icon: Images },
    { key: 'projects', label: 'Projek', icon: Hammer },
    { key: 'links', label: 'Link & Pesan', icon: Link },
  ];

  return (
    <aside className="w-full md:w-64 shrink-0 md:h-[calc(100vh-64px)] md:sticky md:top-16">
      <div className="md:h-full overflow-hidden md:overflow-auto">
        <nav className="grid grid-cols-5 md:grid-cols-1 gap-2 p-3 md:p-4 bg-white/5 backdrop-blur-xl border-b md:border-b-0 md:border-r border-white/10">
          {items.map((it) => (
            <button
              key={it.key}
              onClick={() => onChange(it.key)}
              className={`group relative overflow-hidden flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all ${
                current === it.key ? 'bg-gradient-to-r from-indigo-500/90 to-cyan-500/90 text-white shadow-[0_8px_30px_rgba(59,130,246,0.35)]' : 'text-white/85 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className={`relative z-[1]`}><it.icon size={18} /></span>
              <span className="relative z-[1]">{it.label}</span>
              {current === it.key && (
                <span className="absolute inset-0 bg-[radial-gradient(120px_40px_at_10%_120%,rgba(255,255,255,0.35),transparent_60%)]" />
              )}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
