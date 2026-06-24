import NavigationLayout from "../navigation/NavigationLayout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./Dashboard.css";

import ProjectsIcon from "../assets/projectsLogo.svg?react";
import SkillsIcon from "../assets/skillsLogo.svg?react";
import CertificatesIcon from "../assets/certificatesLogo.svg?react";

export default function Dashboard() {
  const navigate = useNavigate();

  const [projectsData, setProjectsData] = useState([]);
  const [certificatesData, setCertificatesData] = useState([]);
  const [skillsData, setSkillsData] = useState([]); 
  const [selectedCert, setSelectedCert] = useState(null);
  const [showView, setShowView] = useState(false); 

  useEffect(() => {

    const fetchData = async () => {

      try {

        const token =
          localStorage.getItem("token");

        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const [
          projectsRes,
          certificatesRes,
          skillsRes,
        ] = await Promise.all([

          fetch(
            "http://localhost:5000/projects",
            { headers }
          ),

          fetch(
            "http://localhost:5000/certificates",
            { headers }
          ),

          fetch(
            "http://localhost:5000/skills",
            { headers }
          ),

        ]);

        const projects =
          await projectsRes.json();

        const certificates =
          await certificatesRes.json();

        const skills =
          await skillsRes.json();

        console.log(
          "PROJECTS:",
          projects
        );

        console.log(
          "CERTIFICATES:",
          certificates
        );

        console.log(
          "SKILLS:",
          skills
        );

        setProjectsData(projects);
        setCertificatesData(certificates);
        setSkillsData(skills);

      } catch (error) {

        console.error(error);

      }
    };

    fetchData();

  }, []);

  const openCertificate = (certificate) => {

    setSelectedCert(certificate);

    setShowView(true);

  };

  return (
    <NavigationLayout>

      <div className="content">
        <div className="title">
          <h1>Your Portofolio</h1>
          <span>⭐</span>
        </div>

        {/* STAT */}
        <div className="stats">
          <div
            className="card"
            onClick={() => navigate("/projects")}
          >
            <div className="card-text">
              <p>Total Projects</p>
              <h2>{projectsData.length}</h2>
            </div>

            <div className="card-icon">
              <ProjectsIcon />
            </div>
          </div>

          <div
            className="card"
            onClick={() => navigate("/certificates")}
          >
            <div className="card-text">
              <p>Total Certificates</p>
              <h2>{certificatesData.length}</h2>
            </div>

            <div className="card-icon">
              <CertificatesIcon />
            </div>
          </div>

          <div
            className="card"
            onClick={() => navigate("/skills")}
          >
            <div className="card-text">
              <p>Total Skills and Tools</p>
              <h2>{skillsData.length}</h2>
            </div>

            <div className="card-icon">
              <SkillsIcon />
            </div>
          </div>
        </div>

        {/* PROJECT */}
        <h2>Projects</h2>

        <div className="dashboard-projects-grid">
          {projectsData.slice(0, 3).map((project) => (

            <div
              className="dashboard-project-card"
              key={project.id}
              onClick={() =>
                navigate(`/projects/${project.id}`)
              }
            >

              <img
                src={project.thumbnail}
                alt={project.name}
              />

              <div className="dashboard-overlay">

                <h3>
                  {project.name}
                </h3>

                <button
                  className="details-btn"
                >
                  Details &gt;
                </button>

              </div>

            </div>

          ))}
        </div>

        {projectsData.length > 3 && (

          <button
            className="see-all-btn"
            onClick={() => navigate("/projects")}
          >
            See All »
          </button>

        )}

        {/* SKILLS */}
        <h2>Skills</h2>

        <div className="skills-grid">
          {skillsData
            .filter(
              (item) =>
                item.category === "skill"
            )
            .slice(0, 6)
            .map((skill) => (

              <div
                className="skill-chip"
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

        {skillsData.filter(
          item => item.category === "skill"
        ).length > 6 && (

          <button
            className="see-all-btn"
            onClick={() => navigate("/skills")}
          >
            See All »
          </button>

        )}        

        <h2>Tools</h2>

        <div className="skills-grid">
          {skillsData
            .filter(
              (item) =>
                item.category === "tool"
            )
            .slice(0, 6)
            .map((tool) => (

              <div
                className="skill-chip"
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

        {skillsData.filter(
          item => item.category === "tool"
        ).length > 6 && (

          <button
            className="see-all-btn"
            onClick={() => navigate("/skills")}
          >
            See All »
          </button>

        )}

        {/* CERTIFICATE */}
        <h2>Certificates</h2>

        <div className="cert">
          {certificatesData.slice(0, 3).map(
            (certificate) => (

              <img
                key={certificate.id}
                src={`http://localhost:5000/${certificate.image.replaceAll("\\", "/")}`}
                alt="certificate"
                onClick={() =>
                  openCertificate(certificate)
                }
              />

            )
          )}
        </div>

        {certificatesData.length > 3 && (

          <button
            className="see-all-btn"
            onClick={() => navigate("/certificates")}
          >
            See All »
          </button>

        )}

      </div>

    {showView && (

      <div className="certificates-modal-overlay">

        <div
          className="view-container"
          style={{
            position: "relative",
          }}
        >

          <button
            onClick={() =>
              setShowView(false)
            }
            className="close-preview-btn"
          >
            ✕
          </button>

          <img
            src={`http://localhost:5000/${selectedCert?.image.replaceAll("\\", "/")}`}
            alt="certificate"
            className="view-img"
          />

        </div>

      </div>

    )}

    </NavigationLayout>
  );
}