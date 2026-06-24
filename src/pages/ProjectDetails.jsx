import {
  useParams,
  useNavigate,
} from "react-router-dom";

import {
  useEffect,
  useState,
} from "react";

import "./ProjectDetails.css";
import NavigationLayout from "../navigation/NavigationLayout";

import iconSource from "../assets/images/ikon_source.png";
import techIcon from "../assets/images/ikon_underline.png";
import codeIcon from "../assets/images/ikon_code.svg";

function ProjectDetails() {

  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchProject =
      async () => {

        try {

          const token =
            localStorage.getItem("token");

          const response =
            await fetch(
              `http://localhost:5000/projects/${id}`,
              {
                headers: {
                  Authorization:
                    `Bearer ${token}`,
                },
              }
            );

          const data =
            await response.json();

          console.log(
            "DETAIL PROJECT:",
            data
          );

          setProject(data);

        } catch (error) {

          console.error(error);

        } finally {

          setLoading(false);

        }
      };

    fetchProject();

  }, [id]);
  
  const nextImage = () => {

    if (!project?.images?.length)
      return;

    setCurrentImage(
      (prev) =>
        (prev + 1) %
        project.images.length
    );
  };

  const prevImage = () => {

    if (!project?.images?.length)
      return;

    setCurrentImage(
      (prev) =>
        prev === 0
          ? project.images.length - 1
          : prev - 1
    );
  };

  if (loading) {

    return (
      <div>
        Loading...
      </div>
    );
  }

  if (!project) {

    return (
      <div>
        Project tidak ditemukan
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

      <div className="p1-page">

      <main className="p1-main">
        <section className="p1-layout">
          <div className="p1-content">
            <button
              className="p1-back-btn"
              onClick={() => navigate(-1)}
            >
              ← Back
            </button>

            <h1> {project.name} </h1>

            <div className="p1-blue-line"></div>

            <p> {project.description} </p>

            <a
              href={project.links?.[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="p1-source-btn"
            >
              <img src={iconSource} alt="Source icon" />
              <span>Source</span>
            </a>

            <div className="p1-tech-area">
              <h4>
                <img src={techIcon} alt="Technology icon" />
                Skills and Tools
              </h4>

              <div className="p1-tech-list">

                {project.skills.map(
                  (skill) => (

                    <span
                      key={skill.id}
                    >
                      {skill.name}
                    </span>

                  )
                )}

              </div>
            </div>
          </div>

          <div className="p1-image-side">
            <div className="p1-image-wrapper">
              <img
                src={project.images?.[currentImage]}
                alt={project.name}
                className="p1-image"
              />

              {project.images.length > 1 && (
                <>
                  <button
                    className="slider-btn prev"
                    onClick={prevImage}
                  >
                    ❮
                  </button>

                  <button
                    className="slider-btn next"
                    onClick={nextImage}
                  >
                    ❯
                  </button>
                </>
              )}

              {project.images.length > 1 && (

                <div className="slider-dots">

                  {project.images.map(
                    (_, index) => (

                      <span
                        key={index}
                        className={
                          currentImage === index
                            ? "dot active"
                            : "dot"
                        }
                        onClick={() =>
                          setCurrentImage(index)
                        }
                      />
                    )
                  )}

                </div>

              )}


            </div>
          </div>
        </section>
      </main>
      </div>

    </NavigationLayout>
  );
}

export default ProjectDetails;