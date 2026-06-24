import React, { useState, useEffect, } from "react";
import axios from "axios";
import "./AddProjectModal.css";
import AddSkillModal from "./AddSkillModal";
import { toast } from "react-toastify";

function AddProjectModal({ onClose, onProjectAdded, editingProject, }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState([]);
  // const [preview, setPreview] = useState(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [links, setLinks] = useState([""]);

  const [selectedItems, setSelectedItems] = useState([]);

  const [showSkillModal, setShowSkillModal] = useState(false);
  const [skillName, setSkillName] = useState("");
  const [skillIcon, setSkillIcon] = useState(null);
  const [category, setCategory] = useState("skill");  

  const [userSkills, setUserSkills] = useState([]);
  const [userTools, setUserTools] = useState([]);
  const [skillFile, setSkillFile] = useState(null);
  // const isEditMode = !!editingProject;

  useEffect(() => {
    fetchSkills();
  }, []);

  useEffect(() => {

    if (!editingProject)
      return;

    setName(
      editingProject.name || ""
    );

    setDesc(
      editingProject.description || ""
    );

    setLinks(
      editingProject.links?.length
        ? editingProject.links
        : [""]
    );

    setSelectedItems(

      editingProject.skills?.map(
        (skill) => skill.id
      ) || []

    );

    setImages(

      editingProject.images?.map(
        (image) => ({

          preview: image,

          existing: true,

        })
      ) || []

    );

  }, [editingProject]);  

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

      const data =
        response.data;

      setUserSkills(
        data.filter(
          (item) =>
            item.category ===
            "skill"
        )
      );

      setUserTools(
        data.filter(
          (item) =>
            item.category ===
            "tool"
        )
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Gagal mengambil data skill"
      );

    }

  };

  // Upload image preview
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (images.length >= 5) {
      toast.warning("Maksimal 5 gambar per project");
      return;
    }

    const remainingSlots = 5 - images.length;

    const selectedFiles =
      files.slice(0, remainingSlots);

    const newImages =
      selectedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

    setImages((prev) => [
      ...prev,
      ...newImages,
    ]);
  };

  const removeImage = (index) => {
    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  const handleSkillIconChange = (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    setSkillFile(file);

    setSkillIcon(
      URL.createObjectURL(file)
    );

  };

  const handleSaveSkill = async () => {

    try {

      if (
        !skillName.trim()
      ) {

        toast.warning(
          "Nama skill wajib diisi"
        );

        return;
      }

      if (!skillFile) {

        toast.warning(
          "Icon wajib diupload"
        );

        return;
      }

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

      formData.append(
        "icon",
        skillFile
      );

      const response =
        await axios.post(
          "http://localhost:5000/skills",
          formData,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      const newSkill =
        response.data.skill;

      if (
        newSkill.category ===
        "skill"
      ) {

        setUserSkills(
          (prev) => [
            newSkill,
            ...prev,
          ]
        );

      } else {

        setUserTools(
          (prev) => [
            newSkill,
            ...prev,
          ]
        );

      }

      toast.success(
        "Skill berhasil ditambahkan"
      );

      setShowSkillModal(false);

      setSkillName("");

      setSkillIcon(null);

      setSkillFile(null);

      setCategory("skill");

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data
          ?.message ||
        "Gagal menambahkan skill"
      );

    }

  };

  // Handle multiple links
  const handleLinkChange = (index, value) => {
    const newLinks = [...links];
    newLinks[index] = value;
    setLinks(newLinks);
  };

  const addLinkField = () => {
    setLinks([...links, ""]);
  };

  const removeLinkField = (index) => {
    const updatedLinks = links.filter(
      (_, i) => i !== index
    );

    setLinks(
      updatedLinks.length
        ? updatedLinks
        : [""]
    );
  };  

  const capitalizeFirstLetter = (
    text
  ) => {

    if (!text.trim()) return "";

    return (
      text.charAt(0).toUpperCase() +
      text.slice(1)
    );
  };

  const toggleItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(
        selectedItems.filter((i) => i !== item)
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    try {

// ======================
// VALIDASI FORM
// ======================

      if (!name.trim()) {

        toast.warning(
          "Nama project wajib diisi"
        );

        return;
      }

      if (!desc.trim()) {

        toast.warning(
          "Deskripsi project wajib diisi"
        );

        return;
      }

      if (images.length === 0) {

        toast.warning(
          "Minimal upload 1 gambar proyek"
        );

        return;
      }

      if (selectedItems.length === 0) {

        toast.warning(
          "Tambahkan minimal 1 Skill/Tool"
        );

        return;
      }

      const validLinks =
        links.filter(
          (link) => link.trim()
        );

      if (validLinks.length === 0) {

        toast.warning(
          "Masukkan minimal 1 link project"
        );

        return;
      }

      const token =
        localStorage.getItem("token");

      const formData =
        new FormData();

      formData.append(
        "name",
        capitalizeFirstLetter(
          name.trim()
        )
      );

      formData.append(
        "description",
        desc.trim()
      );

      formData.append(
        "links",
        JSON.stringify(

          links
            .map(
              (link) =>
                link.trim()
            )
            .filter(Boolean)

        )
      );

      formData.append(
        "skills",
        JSON.stringify(
          selectedItems
        )
      );

      const existingImages = images
        .filter((img) => img.existing)
        .map((img) => img.preview);

      formData.append(
        "existingImages",
        JSON.stringify(existingImages)
      );      

      images.forEach((img) => {

        if (!img.existing) {

          formData.append(
            "images",
            img.file
          );

        }

      });

      if (editingProject) {

        await axios.put(
          `http://localhost:5000/projects/${editingProject.id}`,
          formData,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        toast.success(
          "Project berhasil diperbarui"
        );

      } else {

        await axios.post(
          "http://localhost:5000/projects",
          formData,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        toast.success(
          "Project berhasil ditambahkan"
        );

      }

      // refresh data project
      if (onProjectAdded) {
        
        await onProjectAdded();
      }

      setName("");
      setDesc("");
      setLinks([""]);
      setImages([]);
      setSelectedItems([]);

      onClose();

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        (editingProject
          ? "Gagal memperbarui project"
          : "Gagal menambahkan project")
      );
    } finally {

      setIsSubmitting(false);

    }
  };

  return (
    <div className="project-modal-overlay">
      <div className="project-modal-content">
        
        {/* CLOSE */}
        <button className="close-btn" onClick={onClose}>✕</button>

        <h2>
          {
            editingProject
              ? "Edit Proyek Anda"
              : "Tambahkan Proyek Anda"
          }
        </h2>

        <form onSubmit={handleSubmit}>
          
          {/* UPLOAD */}
          <label>Upload Gambar</label>

          <div className="upload-images-wrapper">

            {images.map((img, index) => (

              <div
                key={index}
                className="upload-box"
              >

                <img
                  src={img.preview}
                  alt="preview"
                />

                <button
                  type="button"
                  className="remove-image-btn"
                  onClick={() =>
                    removeImage(index)
                  }
                >
                  ✕
                </button>

              </div>

            ))}

            {images.length < 5 ? (

              <div className="upload-box">

                <span>+</span>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                />

              </div>

) : (

  <div
    className="upload-box upload-disabled"
    onClick={() =>
      toast.warning("Maksimal 5 gambar")
    }
  >
    <span>+</span>
  </div>

)}

          </div>

          {/* NAMA */}
          <label>Nama Project</label>
          <input
            type="text"
            value={name}
            placeholder="Masukkan nama proyek Anda"
            onChange={(e) => setName(e.target.value)}
          />

          {/* DESKRIPSI */}
          <label>Deskripsi</label>
          <textarea
            value={desc}
            placeholder="Deskripsikan tentang proyek Anda"
            onChange={(e) => setDesc(e.target.value)}
          />

          {/* SKILL / TOOLS */}
          <label>Skill/Tools Proyek</label>

          <input
            type="text"
            readOnly
            placeholder="+ Tambahkan Skill/Tools Baru"
            onClick={() =>
              setShowSkillModal(true)
            }
            className="skill-trigger"
          />

          {(
            userSkills.length > 0 ||
            userTools.length > 0
          ) && (

            <p className="skills-helper">
              Atau pilih Skills/Tools anda di bawah
            </p>
          )}

          {userSkills.length > 0 && (
            <>
              <h4 className="section-title">Your Skills</h4>

              <div className="tags-container">
                {userSkills.map((skill) => (
                  <button
                    key={skill.id}
                    type="button"
                    className={`tag ${
                      selectedItems.includes(
                        skill.id
                      )
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      toggleItem(skill.id)
                    }
                  >
                    {skill.name}
                  </button>
                ))}
              </div>
            </>
          )}

          {userTools.length > 0 && (
            <>
              <h4 className="section-title">Your Tools</h4>

              <div className="tags-container">
                {userTools.map((tool) => (
                  <button
                    key={tool.id}
                    type="button"
                    className={`tag ${
                      selectedItems.includes(
                        tool.id
                      )
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      toggleItem(tool.id)
                    }
                  >
                    {tool.name}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* LINK */}
          <label>Link Dokumentasi/Demo Proyek</label>
          <div className="links-wrapper">

            {links.map((link, index) => (

              <div
                className="single-link-row"
                key={index}
              >

                <input
                  type="text"
                  value={link}
                  placeholder="Masukkan Link/Tautan dokumentasi proyek Anda"
                  onChange={(e) =>
                    handleLinkChange(
                      index,
                      e.target.value
                    )
                  }
                />

                {index === links.length - 1 ? (

                  <button
                    type="button"
                    className="add-link-btn"
                    onClick={addLinkField}
                  >
                    +
                  </button>

                ) : (

                  <button
                    type="button"
                    className="remove-link-btn"
                    onClick={() =>
                      removeLinkField(index)
                    }
                  >
                    ✕
                  </button>

                )}

              </div>

            ))}

          </div>

          {/* BUTTON */}
          <div className="modal-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={onClose}
            >
              Batal
            </button>

            <button
              type="submit"
              className="save-btn"
              disabled={isSubmitting}
            >
              {
                isSubmitting
                  ? "Menyimpan..."
                  : "Simpan"
              }
            </button>
          </div>
        </form>

        <AddSkillModal
          show={showSkillModal}
          onClose={() =>
            setShowSkillModal(false)
          }
          onSave={handleSaveSkill}
          isEditMode={false}
          skillName={skillName}
          setSkillName={setSkillName}
          skillIcon={skillIcon}
          category={category}
          setCategory={setCategory}
          handleFileChange={
            handleSkillIconChange
          }
        />

      </div>
    </div>
  );
}

export default AddProjectModal;