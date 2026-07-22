import { useState } from "react";
import { uploadContract } from "../api/api";

function UploadSection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
  alert("Button Clicked");

  try {
    const result = await uploadContract(selectedFile);
    console.log(result);
    alert("Success");
  } catch (error) {
    console.error(error);
    alert("Failed");
  }
};

  return (
    <section className="py-20 px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-12 border border-gray-200">
        <h2 className="text-4xl font-bold text-center mb-4">
          Upload Your Contract
        </h2>

        <p className="text-center text-gray-600 mb-10">
          Drag & Drop your PDF or click below to upload.
        </p>

        <div className="border-2 border-dashed border-blue-400 rounded-2xl p-16 text-center bg-blue-50 hover:bg-blue-100 transition">
          <div className="text-6xl mb-4">📄</div>

          <h3 className="text-2xl font-semibold mb-3">
            Drag & Drop Contract Here
          </h3>

          <p className="text-gray-500 mb-6">
            Supported formats: PDF, DOCX
          </p>

          <input
            type="file"
            id="contractFile"
            className="hidden"
            onChange={(event) => {
              setSelectedFile(event.target.files[0]);
            }}
          />

          <label
            htmlFor="contractFile"
            className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 cursor-pointer"
          >
            Choose File
          </label>

          {selectedFile && (
            <p className="mt-4 text-green-600 font-medium">
              Selected File: {selectedFile.name}
            </p>
          )}

          {selectedFile && (
            <>
              <button
                onClick={handleUpload}
                disabled={loading}
                className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {loading ? "Uploading..." : "Upload Contract"}
              </button>

              {message && (
                <p className="mt-4 text-center font-medium">
                  {message}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default UploadSection;