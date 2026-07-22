import {
  FaRobot,
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-8">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <FaRobot className="text-4xl text-blue-500" />
              <h2 className="text-3xl font-bold">
                ContractGPT
              </h2>
            </div>

            <p className="text-gray-400 leading-7">
              AI-powered contract analysis platform that helps users
              understand legal documents faster, identify risks,
              and simplify complex agreements.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/upload"
                  className="text-gray-400 hover:text-white transition"
                >
                  Upload
                </Link>
              </li>

              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-400 hover:text-white transition"
                >
                  Dashboard
                </Link>
              </li>

              <li>
                <Link
                  to="/chat"
                  className="text-gray-400 hover:text-white transition"
                >
                  AI Chat
                </Link>
              </li>

            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-5">
              Services
            </h3>

            <ul className="space-y-3 text-gray-400">
              <li>AI Contract Analysis</li>
              <li>Risk Detection</li>
              <li>Clause Summary</li>
              <li>Legal Insights</li>
            </ul>
          </div>

          {/* Contact */}
          <div>

            <h3 className="text-xl font-semibold mb-5">
              Contact
            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-500" />
                <span className="text-gray-400">
                  support@contractgpt.ai
                </span>
              </div>

              <div className="flex gap-5 mt-6 text-2xl">

                <a
                  href="#"
                  className="hover:text-blue-500 transition"
                >
                  <FaGithub />
                </a>

                <a
                  href="#"
                  className="hover:text-blue-500 transition"
                >
                  <FaLinkedin />
                </a>

                <a
                  href="#"
                  className="hover:text-blue-500 transition"
                >
                  <FaTwitter />
                </a>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500">

          © {new Date().getFullYear()} ContractGPT. All Rights Reserved.

        </div>

      </div>
    </footer>
  );
}

export default Footer;