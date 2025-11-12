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
        <nav className="grid grid-cols-5 md:grid-cols-1 gap-2 p-3 md:p-4 bg-white/70 backdrop-blur border-b md:border-b-0 md:border-r border-gray-200">
          {items.map((it) => (
            <button
              key={it.key}
              onClick={() => onChange(it.key)}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                current === it.key ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <it.icon size={18} /> {it.label}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
