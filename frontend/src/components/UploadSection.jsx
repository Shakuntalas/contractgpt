import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { FaCloudUploadAlt, FaFilePdf, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
import { uploadContract } from "../api/api";
import { useApp } from "../context/AppContext";
import GlassCard from "./ui/GlassCard";

function UploadSection({ compact = false }) {
  const navigate = useNavigate();
  const { addContract } = useApp();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [success, setSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const validateFile = (file) => {
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      toast.error("Only PDF files are supported.");
      return false;
    }
    if (file.size > 20 * 1024 * 1024) {
      toast.error("File must be under 20 MB.");
      return false;
    }
    return true;
  };

  const handleFileSelect = (file) => {
    if (!validateFile(file)) return;
    setSelectedFile(file);
    setSuccess(false);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.warning("Please select a PDF file first.");
      return;
    }

    setLoading(true);
    setProgress(0);
    setSuccess(false);

    try {
      const result = await uploadContract(selectedFile, setProgress);
      addContract({
        document_id: result.document_id,
        original_filename: result.original_filename,
        total_chunks: result.total_chunks,
        total_pages: result.total_pages,
      });
      setSuccess(true);
      toast.success("Contract uploaded successfully!");
      setTimeout(() => navigate("/chat"), 1500);
    } catch (error) {
      toast.error(error.message || "Upload failed. Please try again.");
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }, []);

  const clearFile = (e) => {
    e?.stopPropagation();
    setSelectedFile(null);
    setSuccess(false);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
  };

  return (
    <div className={compact ? "" : "w-full"}>
      <motion.div
        onClick={() => !loading && document.getElementById("contractFile")?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={onDrop}
        animate={dragActive ? { scale: 1.02 } : { scale: 1 }}
        className={`relative border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all ${
          dragActive
            ? "border-indigo-400 bg-indigo-500/10 neon-glow"
            : success
            ? "border-emerald-400/50 bg-emerald-500/5"
            : "border-white/20 hover:border-indigo-400/50 hover:bg-white/5"
        }`}
        role="button"
        tabIndex={0}
        aria-label="Upload contract PDF"
        onKeyDown={(e) => e.key === "Enter" && document.getElementById("contractFile")?.click()}
      >
        <input
          type="file"
          id="contractFile"
          className="hidden"
          accept=".pdf"
          onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
        />

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <TailSpin height={48} width={48} color="#818cf8" ariaLabel="uploading" />
              <p className="mt-4 text-indigo-300 font-medium">Processing your contract...</p>
              <div className="mt-4 max-w-xs mx-auto h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-slate-500 mt-2">{progress}%</p>
            </motion.div>
          ) : success ? (
            <motion.div key="success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              <FaCheckCircle className="text-6xl text-emerald-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-emerald-300">Upload Successful!</h3>
              <p className="text-slate-400 mt-2">Redirecting to AI Chat...</p>
            </motion.div>
          ) : (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <FaCloudUploadAlt className="text-6xl text-indigo-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Drag & Drop Your Contract</h3>
              <p className="text-slate-400 text-sm">PDF only · Max 20 MB · Click to browse</p>
            </motion.div>
          )}
        </AnimatePresence>

        {selectedFile && !loading && !success && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 glass rounded-xl p-4 max-w-md mx-auto text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <FaFilePdf className="text-3xl text-red-400 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-medium text-white truncate">{selectedFile.name}</p>
                <p className="text-xs text-slate-500">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
              <button onClick={clearFile} className="text-slate-400 hover:text-red-400 p-1" aria-label="Remove file">
                <FaTimesCircle />
              </button>
            </div>

            {previewUrl && (
              <iframe
                src={previewUrl}
                title="PDF Preview"
                className="mt-4 w-full h-48 rounded-lg border border-white/10"
              />
            )}

            <div className="flex gap-3 mt-4">
              <button onClick={(e) => { e.stopPropagation(); handleUpload(); }} className="btn-primary flex-1 justify-center">
                Upload & Analyze
              </button>
              <button onClick={clearFile} className="btn-ghost py-2 px-4">Remove</button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default UploadSection;
