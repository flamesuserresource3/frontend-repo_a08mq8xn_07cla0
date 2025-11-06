import { Menu } from 'lucide-react';

function Navbar() {
  return (
    <header className="sticky top-0 z-20 w-full backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-gray-100">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-blue-500 text-white font-bold">FB</span>
          <span className="font-semibold text-gray-800">Flames Blue</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <a href="#fitur" className="hover:text-gray-900">Fitur</a>
          <a href="#cara-kerja" className="hover:text-gray-900">Cara Kerja</a>
          <a href="#kontak" className="hover:text-gray-900">Kontak</a>
        </nav>
        <button className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-md hover:bg-gray-100 text-gray-700" aria-label="Buka menu">
          <Menu size={20} />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
