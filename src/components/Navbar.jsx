function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 px-8 py-4 flex justify-between items-center">

      <h1 className="text-3xl font-bold text-blue-600">
        ContractGPT
      </h1>

      <div className="space-x-6">

        <a href="#" className="text-gray-700 hover:text-blue-600">
          Home
        </a>

        <a href="#" className="text-gray-700 hover:text-blue-600">
          Features
        </a>

        <a href="#" className="text-gray-700 hover:text-blue-600">
          Contact
        </a>

        <button className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700">
          Login
        </button>

      </div>

    </nav>
  );
}

export default Navbar;