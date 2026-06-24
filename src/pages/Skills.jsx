import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Skills.css";

// Integrasi Navigasi Kelompok
import NavigationLayout from "../navigation/NavigationLayout";
// Import fitur "Add Skills/Tools"
import AddSkillModal from "../components/addSkillModal";


const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [tools, setTools] = useState([]);    
  
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [skillName, setSkillName] = useState('');
  const [skillIcon, setSkillIcon] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [category, setCategory] = useState("skill");
  const [selectedType, setSelectedType] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleAddClick = () => {
    setIsEditMode(false);
    setSkillName("");
    setSkillIcon("");
    setSelectedFile(null);
    setCategory("skill");
    setSelectedType(null);
    setShowModal(true);
  };

  const handleEditClick = (item, type) => {
    setIsEditMode(true);
    setSkillName(item.name);
    setSkillIcon(item.icon);
    setSelectedId(item.id);
    setSelectedType(type);
    setCategory(type);
    setSelectedFile(null);
    setShowModal(true);
  };

  const handleDeleteClick = (id, type) => {
    setSelectedId(id);
    setSelectedType(type);
    setShowDeleteModal(true);
  };

  const handleFileChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setSelectedFile(file);

    setSkillIcon(
      URL.createObjectURL(file)
    );
  };

  const handleSave = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const formData =
        new FormData();

      formData.append(
        "name",
        skillName
      );

      formData.append(
        "category",
        category
      );

      if (selectedFile) {

        formData.append(
          "icon",
          selectedFile
        );
      }

      // ===================
      // EDIT
      // ===================

      if (isEditMode) {

        await axios.put(

          `http://localhost:5000/skills/${selectedId}`,

          formData,

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      }

      // ===================
      // ADD
      // ===================

      else {

        await axios.post(

          "http://localhost:5000/skills",

          formData,

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );
      }

      fetchSkills();

      setShowModal(false);

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message
      );
    }
  };

  const confirmDelete = async () => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.delete(

        `http://localhost:5000/skills/${selectedId}`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      fetchSkills();

      setShowDeleteModal(false);

    } catch (error) {

      console.error(error);

    }
  };

  const fetchSkills = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await axios.get(
          "http://localhost:5000/skills",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      const allData =
        response.data;

      setSkills(
        allData.filter(
          item =>
            item.category === "skill"
        )
      );

      setTools(
        allData.filter(
          item =>
            item.category === "tool"
        )
      );

    } catch (error) {

      console.error(error);

    }
  };

  useEffect(() => {

    fetchSkills();

  }, []);

  return (
    <NavigationLayout>

      {/* Pembungkus Konten Utama Skills */}
      <div className="skills-content">
        <div className="skills-container" style={{ padding: '0 0 40px 0' }}>
          
          <div className="skills-header">
            <div>
              <h2>Your Skills</h2>
            </div>
            <button onClick={handleAddClick} className="btn-add-skill">
              <span className="material-icons">add</span>
              <span>Add Skills / Tools</span>
            </button>
          </div>

        {/* BAGIAN SKILL */}
        {skills.length === 0 ? (

          <p className="empty-message">
            Anda belum menambahkan Skill
          </p>

        ) : (
          <div className="skills-grid">
            {skills.map((skill) => (
              <div key={skill.id} className="skill-card">
                <div className="skill-icon-wrapper">
                  <img
                    src={`http://localhost:5000/${skill.icon}`}
                    alt={skill.name}
                  />
                </div>
                <span className="skill-name">{skill.name}</span>
                
                <div className="skill-actions">
                  <button onClick={() => handleEditClick(skill, "skill")} className="action-btn">
                    <span className="material-icons">edit</span>
                  </button>
                  <button onClick={() => handleDeleteClick(skill.id, "skill")} className="action-btn">
                    <span className="material-icons">close</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}  

          {/* SECTION TOOLS */}
          <div className="tools-section">

            <div className="skills-header section-spacing">
              <div>
                <h2>Your Tools</h2>
              </div>
            </div>

          {tools.length === 0 ? (

            <p className="empty-message">
              Anda belum menambahkan Tool
            </p>

          ) : (
            <div className="skills-grid">
              {tools.map((tool) => (
                <div key={tool.id} className="skill-card">
                  <div className="skill-icon-wrapper">
                    <img
                      src={`http://localhost:5000/${tool.icon}`}
                      alt={tool.name}
                    />
                  </div>

                  <span className="skill-name">
                    {tool.name}
                  </span>

                  <div className="skill-actions">
                    <button onClick={() => handleEditClick(tool, "tool")} className="action-btn">
                      <span className="material-icons">edit</span>
                    </button>

                    <button onClick={() => handleDeleteClick(tool.id, "tool")} className="action-btn">
                      <span className="material-icons">close</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          </div>

          <AddSkillModal
            show={showModal}
            onClose={() => setShowModal(false)}
            onSave={handleSave}
            isEditMode={isEditMode}
            skillName={skillName}
            setSkillName={setSkillName}
            skillIcon={skillIcon}
            category={category}
            setCategory={setCategory}
            handleFileChange={handleFileChange}
          />          

          {/* MODAL CONFIRM DELETE */}
          {showDeleteModal && (
            <div className="skills-modal-overlay">
              <div className="skills-modal-content" style={{maxWidth: '300px'}}>
                 <button onClick={() => setShowDeleteModal(false)} className="modal-close">
                  <span className="material-icons">close</span>
                </button>
                <p style={{fontWeight: 'bold', margin: '20px 0'}}>Anda yakin ingin menghapus skill ini??</p>
                <div className="modal-footer">
                  <button onClick={() => setShowDeleteModal(false)} className="btn-cancel">Cancel</button>
                  <button onClick={confirmDelete} className="btn-confirm-delete">Delete</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

    </NavigationLayout>
  );
};

export default Skills;