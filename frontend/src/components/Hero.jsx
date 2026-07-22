import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRobot, FaFileContract, FaComments } from "react-icons/fa";

function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold mb-6"
          >
            🤖 AI Powered Contract Analysis
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-6xl font-extrabold leading-tight text-gray-900"
          >
            Analyze Contracts
            <br />
            <span className="text-blue-600">
              in Seconds
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-600 text-lg mt-6 leading-8"
          >
            ContractGPT helps you upload, analyze, summarize and chat
            with legal contracts using Artificial Intelligence.
            Save hours of manual review with instant AI insights.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex gap-5 mt-10"
          >
            <Link
              to="/upload"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 transition"
            >
              Upload Contract
            </Link>

            <Link
              to="/chat"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition"
            >
              AI Chat
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center"
        >
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
            className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md"
          >
            <div className="flex justify-center mb-8">
              <FaRobot className="text-7xl text-blue-600" />
            </div>

            <div className="space-y-5">

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-blue-50"
              >
                <FaFileContract className="text-3xl text-blue-600" />

                <div>
                  <h3 className="font-bold">
                    Smart Contract Analysis
                  </h3>

                  <p className="text-sm text-gray-600">
                    Detect risky clauses instantly.
                  </p>
                </div>

              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-indigo-50"
              >
                <FaComments className="text-3xl text-indigo-600" />

                <div>
                  <h3 className="font-bold">
                    Chat with AI
                  </h3>

                  <p className="text-sm text-gray-600">
                    Ask questions about your contract.
                  </p>
                </div>

              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-5 text-white text-center"
              >
                <h2 className="text-3xl font-bold">
                  99%
                </h2>

                <p>AI Accuracy</p>
              </motion.div>

            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;