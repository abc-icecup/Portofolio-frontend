//PROJECT.JSX

// PR : MODUL EDIT HALAMAN PROJECTS MASIH DUPLIKAT
//import "./HalamanPortfolioPengguna.css";

import React, { useState, useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import NavigationLayout from "../navigation/NavigationLayout";
import AddProjectModal from "../components/AddProjectModal";
import "./Projects.css";



function Projects() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProjects =
      async () => {

        try {

          const token =
            localStorage.getItem("token");

          const response =
            await fetch(
              "http://localhost:5000/projects",
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          const data =
            await response.json();

          setProjects(data);

        } catch (error) {

          console.error(
            "Gagal mengambil projects:",
            error
          );

        } finally {

          setLoading(false);

        }
      };

    fetchProjects();

  }, []);

  if (loading) {
    return (
      <NavigationLayout>

        <div className="projects-container">
          <div className="projects-header">
            <h1>Your Projects</h1>
            
              <button
                className="add-btn"
                onClick={() => setShowModal(true)}
              >
                + Add Project
              </button>
          </div>

          <div className="projects-page-grid">

            {projects.length === 0 && (
              <div
                style={{
                  padding: "20px",
                }}
              >
                Anda belum memiliki project.
              </div>
            )}

            {projects.map((project) => (
              <div className="project-card" key={project.id} onClick={() => navigate(`/projects/${project.id}`)}>
                <img src={project.thumbnail} alt={project.name} />

                <div className="project-overlay">
                  <h3>{project.name}</h3>
                  <button className="details-btn">Details &gt;</button>
                </div>

                <div className="card-actions">
                  <button
                    className="edit-btn"
                    onClick={(e) => {
                      e.stopPropagation();

                      console.log("edit");
                    }}
                  >✏️</button>
                  
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();

                      console.log("delete");
                    }}
                  >🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MODAL (INI YANG PENTING) */}
        {showModal && (
          <AddProjectModal onClose={() => setShowModal(false)} />
        )}

      </NavigationLayout>
    );
  }
}

export default Projects;

          {/* ================= SECTION TOOLS ================= */}
          <section className="pf-tools">
            <h3>Tools</h3>

            <div className="pf-tool-list">
              {/* Hanya menampilkan 1 contoh tool saja yaitu Canva */}
                            <div className="pf-tool-card">
                <img src={canvaIcon} alt="Canva" />
                <span>Canva</span>
              </div>
            </div>
          </section>