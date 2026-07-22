import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Stats from "./components/Stats";
import UploadSection from "./components/UploadSection";
import AnalysisSection from "./components/AnalysisSection";
import ChatSection from "./components/ChatSection";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/upload" element={<Upload />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/chat" element={<Chat />} />

      </Routes>

    </div>
  );
}

export default App;