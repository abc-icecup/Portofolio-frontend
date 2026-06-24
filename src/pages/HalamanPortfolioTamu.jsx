import { useState } from "react";
import { Link } from "react-router-dom";
import "./HalamanPortfolioTamu.css";

import CertificatePortrait from "../components/CertificatePortrait";
import CertificateLandscape from "../components/CertificateLandscape";

import logo from "../assets/images/logo_my_porto.svg";
import profile1 from "../assets/images/profile1.svg";

import project1 from "../assets/images/project1.png";
import project2 from "../assets/images/project2.png";
import project3 from "../assets/images/project3.png";

import serti1 from "../assets/cert1.jpg";
import serti2 from "../assets/cert2.jpg";

import figmaIcon from "../assets/images/ikon_figma.png";
import reactIcon from "../assets/images/ikon_react.png";
import nodeIcon from "../assets/images/ikon_nodejs.png";
import canvaIcon from "../assets/images/ikon_canva.png";
import linkIcon from "../assets/images/ikon_link.svg";

function HalamanPortfolioTamu() {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  return (
    <div className="gt-page">
      <header className="gt-navbar">
        <div className="gt-navbar-container">
          <div className="gt-logo">
            <img src={logo} alt="Logo MyPorto" />
            <span>MyPorto</span>
          </div>

          <div className="gt-auth-buttons">
            <Link to="/signin" className="gt-auth-btn gt-sign-in-btn">
              Sign In
            </Link>

            <Link to="/signup" className="gt-auth-btn gt-sign-up-btn">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main className="gt-main">
        <section className="gt-card">
          <h2>Welcome To My Portofolio</h2>

          <section className="gt-intro">
            <div className="gt-intro-text">
              <h4>Hello, I’m</h4>
              <h1>Jamal</h1>
              <p>
                Seorang engineer yang berfokus pada pengembangan aplikasi web
                modern dengan pengalaman dalam membangun antarmuka interaktif,
                menggunakan React dan sistem backend pendukung. Memiliki
                ketertarikan kuat pada desain yang bersih, performa aplikasi,
                serta pengalaman pengguna yang baik untuk kebutuhan proyek
                profesional.
              </p>
            </div>

            <div className="gt-photo-wrapper">
              <img src={profile1} alt="Profile Jamal" className="gt-photo" />
            </div>
          </section>

          {/* ================= SECTION SKILLS ================= */}
          <section className="gt-skills">
            <h3>Skills</h3>

            <div className="gt-skill-list">
              <div className="gt-skill-card">
                <img src={figmaIcon} alt="Figma" />
                <span>Figma</span>
              </div>

              <div className="gt-skill-card">
                <img src={reactIcon} alt="React" />
                <span>React</span>
              </div>

              <div className="gt-skill-card">
                <img src={nodeIcon} alt="Node.js" />
                <span>Node.Js</span>
              </div>

              <div className="gt-skill-card">
                <img src={canvaIcon} alt="Canva" />
                <span>Canva</span>
              </div>
            </div>
          </section>

          {/* ================= SECTION TOOLS (BARU - SYNC WITH USER PAGE) ================= */}
          <section className="gt-tools">
            <h3>Tools</h3>

            <div className="gt-tool-list">
              {/* Hanya menampilkan 1 contoh tool saja yaitu Canva */}
              <div className="gt-tool-card">
                <img src={canvaIcon} alt="Canva" />
                <span>Canva</span>
              </div>
            </div>
          </section>

          {/* ================= SECTION PROJECTS ================= */}
          <section className="gt-projects">
            <h3>Projects</h3>

            <div className="gt-project-list">
              <div className="gt-project-card">
                <img src={project1} alt="Website E-commerce" />

                <div className="gt-project-overlay">
                  <div className="gt-project-text">
                    <h4>Website E-Commerce Fashion (Frontend)</h4>

                    <Link to="/project-halaman-tamu-1">
                      <button type="button">Detail</button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="gt-project-card">
                <img src={project2} alt="UI/UX Design Aplikasi Mobile" />

                <div className="gt-project-overlay">
                  <div className="gt-project-text">
                    <h4>UI/UX Design Aplikasi Mobile Travel Online</h4>

                    <Link to="/project-halaman-tamu-2">
                      <button type="button">Detail</button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="gt-project-card">
                <img src={project3} alt="Poster Promosi Event" />

                <div className="gt-project-overlay">
                  <div className="gt-project-text">
                    <h4>Poster Promosi Event Seminar Arkeologi</h4>

                    <Link to="/project-halaman-tamu-3">
                      <button type="button">Detail</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ================= SECTION CERTIFICATES ================= */}
          <section className="gt-certificates">
            <h3>Certificates</h3>

            <div className="gt-certificate-list">
              <button
                type="button"
                className="gt-certificate-card"
                onClick={() => setSelectedCertificate("portrait")}
              >
                <img src={serti1} alt="Certificate 1" />
              </button>

              <button
                type="button"
                className="gt-certificate-card"
                onClick={() => setSelectedCertificate("landscape")}
              >
                <img src={serti2} alt="Certificate 2" />
              </button>
            </div>
          </section>

          {/* ================= SECTION CONTACT ================= */}
          <section className="gt-contact">
            <h3>Contact</h3>

            <div className="gt-contact-item">
              <span className="gt-contact-icon">
                <img src={linkIcon} alt="Contact link" />
              </span>

              <a href="mailto:jamal@gmail.com">jamal@gmail.com</a>
            </div>
          </section>
        </section>
      </main>

      {selectedCertificate === "portrait" && (
        <CertificatePortrait
          image={serti1}
          onClose={() => setSelectedCertificate(null)}
        />
      )}

      {selectedCertificate === "landscape" && (
        <CertificateLandscape
          image={serti2}
          onClose={() => setSelectedCertificate(null)}
        />
      )}
    </div>
  );
}

export default HalamanPortfolioTamu;