function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">

      <div className="max-w-6xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center">

        <div>
          <h2 className="text-3xl font-bold text-blue-400">
            ContractGPT
          </h2>

          <p className="text-gray-400 mt-2">
            AI-powered legal document analysis made simple.
          </p>
        </div>

        <div className="flex gap-8 mt-6 md:mt-0">

          <a href="#" className="hover:text-blue-400">
            Home
          </a>

          <a href="#" className="hover:text-blue-400">
            Features
          </a>

          <a href="#" className="hover:text-blue-400">
            Contact
          </a>

        </div>

      </div>

      <div className="text-center text-gray-500 mt-8">
        © 2026 ContractGPT. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;