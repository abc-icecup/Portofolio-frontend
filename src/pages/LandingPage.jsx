import { Link } from "react-router-dom";
import "./LandingPage.css";

import logo from "../assets/images/logo_my_porto.svg";
import profile1 from "../assets/images/profile1.svg";
import profile2 from "../assets/images/profile2.svg";
import gambar1 from "../assets/images/gambar1.svg";
import gambar2 from "../assets/images/gambar2.svg";
import gambar3 from "../assets/images/gambar3.svg";

function LandingPage() {
  return (
    <div className="home-page">
      <header className="home-navbar">
        <div className="home-navbar-container">
          <div className="home-logo">
            <img src={logo} alt="Logo MyPorto" />
            <span>MyPorto</span>
          </div>

          <div className="home-nav-button">
            <Link to="/signin" className="home-nav-link">
              <button className="home-signin-button" type="button">
                Sign In
              </button>
            </Link>

            <Link to="/signup" className="home-nav-link">
              <button className="home-signup-button" type="button">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main className="home-main">
        <section className="home-hero">
          <div className="home-hero-content">
            <h1>MyPorto</h1>
            <p>Create your portfolio fastly</p>
          </div>
        </section>

        <section className="home-portfolio-section">
          <h2>Buat Portofolio Dalam Hitungan Menit</h2>

          <div className="home-portfolio-wrapper">
            <div className="home-portfolio-card">
              <div className="home-portfolio-text">
                <h3>Front End Developer</h3>
                <h4>James A. Snow</h4>
                <p>Frontend Developer yang berfokus pada pembuatan tampilan web yang responsif dan user-friendly menggunakan React dan Tailwind CSS, dengan perhatian pada pengalaman pengguna yang optimal.</p>
              </div>

              <img src={profile1} alt="Profile 1" />
            </div>

            <div className="home-portfolio-card">
              <div className="home-portfolio-text">
                <h3>Businessman & Content Creator</h3>
                <h4>David T. Eis</h4>
                <p>Seorang Businessman & Content Creator yang berfokus pada pengembangan layanan di bidang teknologi, serta memiliki kemampuan dalam menyampaikan ide dan nilai melalui konten digital yang kreatif dan relevan.</p>
              </div>

              <img src={profile2} alt="Profile 2" />
            </div>
          </div>
        </section>

        <section className="home-about-section">
          <h2>Mudah, Cepat, dan Siap Pakai</h2>
          <p>
            MyPorto membantumu membuat portofolio dengan mudah, cepat, dan siap
            digunakan.
          </p>
        </section>

        <section className="home-feature-section">
          <div className="home-feature-card">
            <img src={gambar1} alt="Tampilkan Proyek" />
            <h3>Tampilkan Proyek Anda</h3>
            <p>
              Tampilkan proyek terbaik Anda untuk memperkuat branding portofolio
              Anda.
            </p>
          </div>

          <div className="home-feature-card">
            <img src={gambar2} alt="Kelola Portofolio" />
            <h3>Kelola Portofolio Anda</h3>
            <p>
              Atur dan kelola portofolio Anda dengan mudah, rapi, dan
              profesional.
            </p>
          </div>

          <div className="home-feature-card">
            <img src={gambar3} alt="Publikasi Portofolio" />
            <h3>Publikasi dalam sekali klik</h3>
            <p>
              Publikasikan portofolio Anda dengan cepat dan mudah dibagikan.
            </p>
          </div>
        </section>

        <section className="home-cta-section">
          <Link to="/signup">
            <button type="button">Mulai Sekarang</button>
          </Link>
        </section>
      </main>
    </div>
  );
}

export default LandingPage;