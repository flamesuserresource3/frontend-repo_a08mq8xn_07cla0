import { Code2, Database, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Code2,
    title: 'Frontend Modern',
    desc: 'Bangun UI responsif dengan React, Vite, dan Tailwind.',
  },
  {
    icon: Database,
    title: 'Backend Andal',
    desc: 'API cepat dengan FastAPI dan dukungan database bawaan.',
  },
  {
    icon: Sparkles,
    title: 'AI Assistant',
    desc: 'Bantu menulis kode, membuat fitur, dan mempratinjau secara live.',
  },
];

function Features() {
  return (
    <section id="fitur" className="py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Fitur Utama</h2>
        <p className="mt-2 text-gray-600">Semua yang Anda butuhkan untuk membangun aplikasi modern.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="h-10 w-10 rounded-md bg-indigo-600 text-white flex items-center justify-center">
                <f.icon size={20} />
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">{f.title}</h3>
              <p className="mt-1 text-gray-600 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
