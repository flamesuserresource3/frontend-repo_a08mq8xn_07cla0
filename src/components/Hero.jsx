import { Rocket, Star } from 'lucide-react';

function Hero() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-indigo-700 text-xs font-medium">
              <Star size={14} /> Dibuat untuk developer Indonesia
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
              Bangun Aplikasi Cepat dengan Bantuan AI
            </h1>
            <p className="mt-4 text-gray-600">
              Platform coding interaktif yang membantu Anda membuat, menjalankan, dan mempratinjau aplikasi secara instan.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#fitur" className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-5 py-2.5 text-white font-semibold shadow hover:bg-indigo-700">
                <Rocket size={18} /> Mulai Sekarang
              </a>
              <a href="#cara-kerja" className="inline-flex rounded-md px-5 py-2.5 font-semibold text-indigo-700 border border-indigo-200 hover:bg-indigo-50">
                Pelajari Lebih Lanjut
              </a>
            </div>
          </div>
          <div>
            <div className="relative rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
              <div className="aspect-[4/3] w-full rounded-lg bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-6xl">🚀</span>
                  <p className="mt-2 text-gray-700 font-medium">Jalankan proyek dalam hitungan detik</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
