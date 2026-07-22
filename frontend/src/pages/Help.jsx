import { FaQuestionCircle, FaEnvelope, FaPhone, FaBook, FaRobot } from "react-icons/fa";

function Help() {
  const faqs = [
    {
      question: "How do I upload a contract?",
      answer: "Go to the Upload page and select a PDF or DOCX file."
    },
    {
      question: "Which file types are supported?",
      answer: "Currently PDF and DOCX files are supported."
    },
    {
      question: "Is my contract secure?",
      answer: "Yes. Uploaded contracts are processed securely and are not shared."
    },
    {
      question: "Can I download the AI report?",
      answer: "Yes. After analysis you can download the generated report."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-12">
          <FaRobot className="text-6xl text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold">
            Help & Support
          </h1>
          <p className="text-gray-500 mt-2">
            Find answers to common questions about ContractGPT.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <FaQuestionCircle className="text-blue-600" />
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">

              {faqs.map((faq, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-lg">
                    {faq.question}
                  </h3>

                  <p className="text-gray-600 mt-2">
                    {faq.answer}
                  </p>
                </div>
              ))}

            </div>

          </div>

          <div className="space-y-6">

            <div className="bg-white rounded-2xl shadow-lg p-8">

              <h2 className="text-2xl font-bold mb-5 flex items-center gap-3">
                <FaEnvelope className="text-green-600" />
                Contact Support
              </h2>

              <p className="text-gray-600">
                support@contractgpt.ai
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">

              <h2 className="text-2xl font-bold mb-5 flex items-center gap-3">
                <FaPhone className="text-blue-600" />
                Phone
              </h2>

              <p className="text-gray-600">
                +91 9876543210
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">

              <h2 className="text-2xl font-bold mb-5 flex items-center gap-3">
                <FaBook className="text-orange-500" />
                Documentation
              </h2>

              <p className="text-gray-600">
                Learn how to upload contracts, use AI chat, and understand analysis reports.
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Help;