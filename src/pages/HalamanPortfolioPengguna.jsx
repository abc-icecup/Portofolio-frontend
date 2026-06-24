
import { Link } from "react-router-dom";
import NavigationLayout from "../navigation/NavigationLayout";
import { useEffect, useState } from "react";

import "./HalamanPortfolioPengguna.css";
import linkIcon from "../assets/images/ikon_link.svg";

function HalamanPortfolioPengguna() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [tools, setTools] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [loading, setLoading] = useState(true);
    
  useEffect(() => {

    const fetchPortfolio = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [
          profileRes,
          skillsRes,
          projectsRes,
          certificatesRes,
        ] = await Promise.all([

          fetch(
            "http://localhost:5000/profile",
            { headers }
          ),

          fetch(
            "http://localhost:5000/skills",
            { headers }
          ),

          fetch(
            "http://localhost:5000/projects",
            { headers }
          ),

          fetch(
            "http://localhost:5000/certificates",
            { headers }
          ),

        ]);

        const profileData =
          await profileRes.json();

        const skillsData =
          await skillsRes.json();

        const projectsData =
          await projectsRes.json();

        const certificatesData =
          await certificatesRes.json();

        console.log(
          "PROFILE:",
          profileData
        );

        console.log(
          "SKILLS:",
          skillsData
        );

        console.log(
          "PROJECTS:",
          projectsData
        );

        console.log(
          "CERTIFICATES:",
          certificatesData
        );

        setProfile(profileData);

        setSkills(
          skillsData.filter(
            item =>
              item.category === "skill"
          )
        );

        setTools(
          skillsData.filter(
            item =>
              item.category === "tool"
          )
        );

        setProjects(projectsData);

        setCertificates(
          certificatesData
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }
    };

    fetchPortfolio();

  }, []);  

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
  };

  if (loading) {

    return (
      <div>
        Loading...
      </div>
    );

  }

  return (

    <NavigationLayout
      defaultSidebarOpen={false}
      isGuest={
        !localStorage.getItem(
          "token"
        )
      }
    >

      <div className="pf-page">

      <main className="pf-main">
        <section className="pf-card">
          <h2>Welcome To My Portofolio</h2>

          <section className="pf-intro">
            <div className="pf-intro-text">
              <h4>Hello, I’m</h4>

              <h1>
                {profile?.username}
              </h1>

              <p>
                {profile?.Profile?.bio}
              </p>
            </div>

            <div
              className="pf-photo-wrapper"
              onClick={() =>
                openImageModal(
                  `http://localhost:5000/${profile.Profile.profile_image.replaceAll("\\", "/")}`
                )
              }
            >

              <img
                src={
                  profile?.Profile?.profile_image
                    ? `http://localhost:5000/${profile.Profile.profile_image.replaceAll("\\", "/")}`
                    : ""
                }
                alt="Profile"
                className="pf-photo"
              />

            </div>
          </section>

          <section className="pf-skills">
            <h3>Skills</h3>

            <div className="pf-skill-list">

              {skills.map((skill) => (

                <div
                  className="pf-skill-card"
                  key={skill.id}
                >

                  <img
                    src={`http://localhost:5000/${skill.icon.replaceAll("\\", "/")}`}
                    alt={skill.name}
                  />

                  <span>
                    {skill.name}
                  </span>

                </div>

              ))}

            </div>
          </section>

          {/* ================= SECTION TOOLS ================= */}
          <section className="pf-tools">
            <h3>Tools</h3>

            <div className="pf-tool-list">

              {tools.map((tool) => (

                <div
                  className="pf-tool-card"
                  key={tool.id}
                >

                  <img
                    src={`http://localhost:5000/${tool.icon.replaceAll("\\", "/")}`}
                    alt={tool.name}
                  />

                  <span>
                    {tool.name}
                  </span>

                </div>

              ))}

            </div>
          </section>

          <section className="pf-projects">
            <h3>Projects</h3>

            <div className="pf-project-list">

              {projects.map((project) => (

                <div
                  className="pf-project-card"
                  key={project.id}
                >

                  <img
                    src={project.thumbnail}
                    alt={project.name}
                  />

                  <div className="pf-project-overlay">

                    <div className="pf-project-text">

                      <h4>
                        {project.name}
                      </h4>

                      <Link
                        to={`/projects/${project.id}`}
                      >

                        <button type="button">
                          Detail
                        </button>

                      </Link>

                    </div>

                  </div>

                </div>

              ))}

            </div>
          </section>

          <section className="pf-certificates">
            <h3>Certificates</h3>

            <div className="pf-certificate-list">

              {certificates.map(
                (certificate) => (

                  <div
                    className="pf-certificate-card"
                    key={certificate.id}
                  >

                    <img
                      src={`http://localhost:5000/${certificate.image.replaceAll("\\", "/")}`}
                      alt="certificate"
                      onClick={() =>
                        openImageModal(
                          `http://localhost:5000/${certificate.image.replaceAll("\\", "/")}`
                        )
                      }
                    />

                  </div>

                )
              )}

            </div>
          </section>

          <section className="pf-contact">
            <h3>Contact</h3>

            {profile?.Profile?.SocialLinks?.map((link) => (

              <div
                className="pf-contact-item"
                key={link.id}
              >

                <span className="pf-contact-icon">
                  <img
                    src={linkIcon}
                    alt="Link Contact"
                  />
                </span>

                <a
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.url}
                </a>

              </div>

            ))}
          </section>

          {showImageModal && (
            <div className="pf-image-modal-overlay">

              <div className="pf-image-modal-container">

                <button
                  className="pf-image-close"
                  onClick={() => setShowImageModal(false)}
                >
                  ✕
                </button>

                <img
                  src={selectedImage}
                  alt="Preview"
                  className="pf-image-modal"
                />

              </div>

            </div>
          )}

        </section>
      </main>
      </div>

    </NavigationLayout>
  );
}

export default HalamanPortfolioPengguna;