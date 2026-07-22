import UploadSection from "../components/UploadSection";
import {
  FaCloudUploadAlt,
  FaFileContract,
  FaShieldAlt,
  FaRobot,
} from "react-icons/fa";

function Upload() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 py-16 px-8">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="text-center mb-16">

          <div className="flex justify-center mb-6">
            <FaCloudUploadAlt className="text-7xl text-blue-600" />
          </div>

          <h1 className="text-5xl font-extrabold text-gray-900">
            Upload Your Contract
          </h1>

          <p className="text-gray-600 text-lg mt-5 max-w-3xl mx-auto">
            Upload your legal document and let ContractGPT analyze,
            summarize, and identify important clauses using AI.
          </p>

        </div>

        {/* Main Content */}

        <div className="grid lg:grid-cols-3 gap-10">

          {/* Upload Area */}

          <div className="lg:col-span-2">

            <div className="bg-white rounded-3xl shadow-xl p-8">

              <UploadSection />

            </div>

          </div>

          {/* Information Panel */}

          <div className="space-y-6">

            <div className="bg-white rounded-3xl shadow-lg p-8">

              <FaRobot className="text-5xl text-blue-600 mb-5" />

              <h2 className="text-2xl font-bold mb-3">
                AI Analysis
              </h2>

              <p className="text-gray-600 leading-7">
                Our AI reviews contracts, highlights important clauses,
                summarizes content, and detects potential risks.
              </p>

            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8">

              <FaShieldAlt className="text-5xl text-green-600 mb-5" />

              <h2 className="text-2xl font-bold mb-3">
                Secure Upload
              </h2>

              <p className="text-gray-600 leading-7">
                Your uploaded documents are processed securely and
                remain private throughout the analysis.
              </p>

            </div>

            <div className="bg-white rounded-3xl shadow-lg p-8">

              <FaFileContract className="text-5xl text-indigo-600 mb-5" />

              <h2 className="text-2xl font-bold mb-3">
                Supported Files
              </h2>

              <ul className="space-y-3 text-gray-600">

                <li>✅ PDF Documents</li>

                <li>✅ DOCX Files</li>

                <li>✅ TXT Files</li>

                <li>✅ Up to 20 MB</li>

              </ul>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Upload;