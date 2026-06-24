import React, { useState, useEffect, } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavigationLayout from "../navigation/NavigationLayout";
import AddProjectModal from "../components/AddProjectModal";
import "./Projects.css";

import EditIcon from "../assets/edit.svg?react";
import DeleteIcon from "../assets/delete.svg?react";

function Projects() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

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

        if (!response.ok) {

          console.error(
            data.message
          );

          setProjects([]);

          return;
        }

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

  const confirmDelete =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        await axios.delete(
          `http://localhost:5000/projects/${selectedProject.id}`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        await fetchProjects();

        setShowDeleteModal(false);

        setSelectedProject(null);

      } catch (error) {

        console.error(
          "Gagal menghapus project:",
          error
        );

      }
    };

  useEffect(() => {

    fetchProjects();

  }, []);

  if (loading) {
    return (
      <NavigationLayout>
        <div style={{ padding: "40px" }}>
          Loading...
        </div>
      </NavigationLayout>
    );
  }

  return (
    <NavigationLayout>

      <div className="projects-container">
        <div className="projects-header">

          <h1>Your Projects</h1>

          <button
            className="add-btn"
            onClick={() => {

              setEditingProject(null);

              setShowModal(true);

            }}
          >
            + Add Project
          </button>

        </div>

        {showModal && (
          <AddProjectModal
            onClose={() => {

              setShowModal(false);

              setEditingProject(null);

            }}
            onProjectAdded={fetchProjects}
            editingProject={editingProject}
          />
        )}

        <div className="projects-page-grid">

          {projects.map((project) => (
            <div
              className="project-card"
              key={project.id}
              onClick={() =>
                navigate(`/projects/${project.id}`)
              }
            >

              <img
                src={project.thumbnail}
                alt={project.name}
              />

              <div className="project-overlay">

                <h3>{project.name}</h3>

                <button className="details-btn">
                  Details &gt;
                </button>

              </div>

              <div className="card-actions">

                <button
                  className="edit-btn"
                  onClick={async (e) => {

                    e.stopPropagation();

                    try {

                      const token =
                        localStorage.getItem("token");

                      const response =
                        await axios.get(
                          `http://localhost:5000/projects/${project.id}`,
                          {
                            headers: {
                              Authorization:
                                `Bearer ${token}`,
                            },
                          }
                        );

                      setEditingProject(
                        response.data
                      );

                      setShowModal(true);

                    } catch (error) {

                      console.error(
                        "Gagal mengambil detail project",
                        error
                      );

                    }

                  }}
                >
                  <EditIcon />
                </button>

                <button
                  className="delete-btn"
                  onClick={(e) => {

                    e.stopPropagation();

                    setSelectedProject(project);

                    setShowDeleteModal(true);

                  }}
                >
                  <DeleteIcon />
                </button>

              </div>

            </div>
          ))}

          {projects.length === 0 && (
            <div className="empty-projects">
              <p>Anda belum memiliki project.</p>

              <p>
                Klik "Add Project" untuk menambahkan project pertama.
              </p>
            </div>
          )}

        </div>

        {showDeleteModal && (
          <div className="delete-modal-overlay">

            <div className="delete-modal-content">

              <button
                className="close-delete-modal"
                onClick={() => {

                  setShowDeleteModal(false);

                  setSelectedProject(null);

                }}
              >
                ✕
              </button>

              <h3>
                Hapus Project
              </h3>

              <p>
                Project tidak dapat dikembalikan. <br />
                Anda yakin ingin menghapus project ini?
              </p>

              <div className="delete-modal-actions">

                <button
                  className="cancel-delete-btn"
                  onClick={() => {

                    setShowDeleteModal(false);

                    setSelectedProject(null);

                  }}
                >
                  Cancel
                </button>

                <button
                  className="confirm-delete-btn"
                  onClick={confirmDelete}
                >
                  Delete
                </button>

              </div>

            </div>

          </div>
        )}

      </div>

    </NavigationLayout>
  );
}

export default Projects;