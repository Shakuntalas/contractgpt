import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuroraBackground from "./components/effects/AuroraBackground";
import Particles from "./components/effects/Particles";

const Home = lazy(() => import("./pages/Home"));
const Upload = lazy(() => import("./pages/Upload"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Chat = lazy(() => import("./pages/Chat"));
const Summary = lazy(() => import("./pages/Summary"));
const RiskHeatmap = lazy(() => import("./pages/RiskHeatmap"));
const Compare = lazy(() => import("./pages/Compare"));
const ClauseExplainer = lazy(() => import("./pages/ClauseExplainer"));
const ClauseLibrary = lazy(() => import("./pages/ClauseLibrary"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Settings = lazy(() => import("./pages/Settings"));
const Profile = lazy(() => import("./pages/Profile"));
const Admin = lazy(() => import("./pages/Admin"));
const Help = lazy(() => import("./pages/Help"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const History = lazy(() => import("./pages/History"));

function PageLoader() {
  return (
    <div className="page-content min-h-[60vh] flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function App() {
  return (
    <>
      <AuroraBackground />
      <Particles count={25} />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/summary" element={<Summary />} />
              <Route path="/report" element={<Summary />} />
              <Route path="/heatmap" element={<RiskHeatmap />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/explainer" element={<ClauseExplainer />} />
              <Route path="/library" element={<ClauseLibrary />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/help" element={<Help />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/history" element={<History />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
