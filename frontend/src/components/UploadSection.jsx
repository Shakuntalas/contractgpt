import { useState } from "react";
import { toast } from "react-toastify";
import { uploadContract } from "../api/api";
import { TailSpin } from "react-loader-spinner";

function UploadSection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.warning("Please select a file first.");
      return;
    }

    setMessage("");
    setLoading(true);

    try {
      const result = await uploadContract(selectedFile);

      toast.success("Contract uploaded successfully!");
      setMessage("✅ Contract uploaded successfully!");

      console.log(result);
    } catch (error) {
      toast.error("Upload failed. Please try again.");
      setMessage("❌ Upload failed. Please try again.");

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-8 bg-gradient-to-br from-slate-100 to-blue-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-12 border border-gray-200">

        <h2 className="text-4xl font-bold text-center mb-4">
          Upload Your Contract
        </h2>

        <p className="text-center text-gray-600 mb-10">
          Drag & Drop your PDF or click below to upload.
        </p>

        <div
          onClick={() => document.getElementById("contractFile").click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);

            if (e.dataTransfer.files.length > 0) {
              setSelectedFile(e.dataTransfer.files[0]);
            }
          }}
          className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-300 cursor-pointer ${
            dragActive
              ? "border-blue-600 bg-blue-100 scale-105 shadow-2xl"
              : "border-blue-400 bg-gradient-to-br from-blue-50 to-indigo-100 hover:shadow-2xl hover:scale-[1.02]"
          }`}
        >
          <div className="text-6xl mb-4">📄</div>

          <h3 className="text-2xl font-bold mb-2">
            Drag & Drop Contract Here
          </h3>

          <p className="text-gray-600">
            or click anywhere to choose a file
          </p>

          <input
            type="file"
            id="contractFile"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                setSelectedFile(e.target.files[0]);
              }
            }}
          />

          {selectedFile && (
            <div className="mt-8 p-5 bg-white rounded-xl shadow-lg border border-gray-200 text-left max-w-md mx-auto">
              <p className="font-bold text-gray-800">
                📄 {selectedFile.name}
              </p>

              <p className="text-sm text-gray-600 mt-2">
                📦 Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>

              <p className="text-sm text-gray-600">
                📑 Type: {selectedFile.type || "Unknown"}
              </p>
            </div>
          )}

          {selectedFile && (
            <div className="mt-6 flex justify-center gap-4 flex-wrap">

              <button
  onClick={(e) => {
    e.stopPropagation();
    handleUpload();
  }}
  disabled={loading}
  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-3 min-w-[220px]"
>
  {loading ? (
    <>
      <TailSpin
        height={22}
        width={22}
        color="#ffffff"
        ariaLabel="loading"
      />
      Uploading...
    </>
  ) : (
    "⬆ Upload Contract"
  )}
</button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                  setMessage("");
                  document.getElementById("contractFile").value = "";
                  toast.info("File removed.");
                }}
                className="bg-red-500 text-white px-8 py-3 rounded-xl hover:bg-red-600 transition"
              >
                🗑 Remove File
              </button>

            </div>
          )}

          {message && (
            <div
              className={`mt-6 p-4 rounded-xl font-semibold ${
                message.includes("✅")
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-red-100 text-red-700 border border-red-300"
              }`}
            >
              {message}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}

export default UploadSection;