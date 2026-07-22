import { motion } from "framer-motion";
import {
  FaFileContract,
  FaRobot,
  FaUsers,
  FaShieldAlt,
} from "react-icons/fa";

function Stats() {
  const stats = [
    {
      icon: <FaFileContract className="text-5xl text-blue-600" />,
      value: "10K+",
      title: "Contracts Analyzed",
    },
    {
      icon: <FaRobot className="text-5xl text-indigo-600" />,
      value: "99%",
      title: "AI Accuracy",
    },
    {
      icon: <FaUsers className="text-5xl text-green-600" />,
      value: "5K+",
      title: "Happy Users",
    },
    {
      icon: <FaShieldAlt className="text-5xl text-red-500" />,
      value: "24/7",
      title: "Secure Processing",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-r from-blue-600 to-indigo-700 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white">
            Trusted by Thousands
          </h2>

          <p className="text-blue-100 text-lg mt-4">
            Our AI platform helps users review contracts faster and smarter.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
              }}
              whileHover={{
                scale: 1.08,
                rotate: 2,
              }}
              className="bg-white rounded-3xl p-8 text-center shadow-2xl cursor-pointer"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                }}
                className="flex justify-center mb-5"
              >
                {item.icon}
              </motion.div>

              <h3 className="text-5xl font-extrabold text-gray-900">
                {item.value}
              </h3>

              <p className="text-gray-600 mt-3 text-lg">
                {item.title}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Stats;