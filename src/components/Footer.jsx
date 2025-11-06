function Footer() {
  return (
    <footer id="kontak" className="mt-20 border-t border-gray-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <p>
            © {new Date().getFullYear()} Flames Blue. Dibuat dengan ❤️ untuk komunitas developer Indonesia.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-gray-900">Kebijakan Privasi</a>
            <a href="#" className="hover:text-gray-900">Syarat & Ketentuan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
