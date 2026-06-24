import { BrowserRouter, Routes, Route } from "react-router-dom";

// ===== LANDING PAGE =====
import LandingPage from "./pages/LandingPage";

// ===== DASHBOARD =====
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Certificates from "./pages/Certificates";
import Profile from "./pages/Profile";

// ===== PORTFOLIO =====
import HalamanPortfolioPengguna from "./pages/HalamanPortfolioPengguna";
import HalamanPortfolioTamu from "./pages/HalamanPortfolioTamu";

// ===== AUTH =====
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

// ===== PROJECT DETAIL =====
import ProjectDetails from "./pages/ProjectDetails";
// import ProjectHalamanTamu from "./pages/ProjectHalamanTamu";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ===== LANDING PAGE ===== */}
        <Route path="/" element={<LandingPage />} />

        {/* ===== DASHBOARD ===== */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />

        {/* ===== OPTIONAL PAGES ===== */}
        <Route path="/skills" element={<Skills />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/profile" element={<Profile />} /> 
       

        {/* ===== PORTFOLIO ===== */}
        <Route path="/portfolio" element={<HalamanPortfolioPengguna />} />
        <Route path="/portfolio-tamu" element={<HalamanPortfolioTamu />} />

        {/* ===== AUTH ===== */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* ===== PROJECT PENGGUNA ===== */}
        <Route path="/projects/:id" element={<ProjectDetails />} />
        {/* <Route
          path="/project-halaman-pengguna-1"
          element={<ProjectHalamanPengguna />}
        /> */}

        {/* ===== PROJECT TAMU ===== */}
        {/* <Route
          path="/project-halaman-tamu-1"
          element={<ProjectHalamanTamu />}
        />
        <Route
          path="/project-halaman-tamu-2"
          element={<ProjectHalamanTamu />}
        />
        <Route
          path="/project-halaman-tamu-3"
          element={<ProjectHalamanTamu />}
        /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;