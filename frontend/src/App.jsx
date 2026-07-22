import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import History from "./pages/History";
import Admin from "./pages/Admin";
import Analytics from "./pages/Analytics";
import Notifications from "./pages/Notifications";
import Report from "./pages/Report";
import Compare from "./pages/Compare";
import ClauseLibrary from "./pages/ClauseLibrary";
import RiskHeatmap from "./pages/RiskHeatmap";
import ClauseExplainer from "./pages/ClauseExplainer";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/history" element={<History />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/report" element={<Report />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/clauses" element={<ClauseLibrary />} />
        <Route path="/risk-heatmap" element={<RiskHeatmap />} />
        <Route path="/clause-explainer" element={<ClauseExplainer />} />

      </Routes>

      <Footer />
    </>
  );
}

export default App;