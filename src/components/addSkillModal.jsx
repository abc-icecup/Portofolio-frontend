import "./addSkillModal.css";

function AddSkillModal({
  show,
  onClose,
  onSave,
  isEditMode,
  skillName,
  setSkillName,
  skillIcon,
  category,
  setCategory,
  handleFileChange,
}) {

  if (!show) return null;

  return (
    <div className="skills-modal-overlay">
      <div className="skills-modal-content">

        <button
          onClick={onClose}
          className="modal-close"
        >
          <span className="material-icons">
            close
          </span>
        </button>

        <h3 className="modal-title">
          {isEditMode
            ? "Edit Skill Anda"
            : "Tambahkan Skill Anda"}
        </h3>

        <input
          type="file"
          id="icon-upload"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        <label
          htmlFor="icon-upload"
          className="preview-circle"
        >
          {skillIcon ? (
            <img
              src={
                skillIcon.startsWith("blob:")
                  ? skillIcon
                  : `http://localhost:5000/${skillIcon}`
              }
              alt="preview"
            />
          ) : (
            <span
              className="material-icons"
              style={{
                color: "#ccc",
                fontSize: "40px",
              }}
            >
              image
            </span>
          )}
        </label>

        <div className="input-group">
          <label>Nama Skill/Tools</label>

          <input
            type="text"
            value={skillName}
            onChange={(e) =>
              setSkillName(
                e.target.value
              )
            }
            placeholder="Contoh : Canva"
          />
        </div>

        <div className="input-group">
          <label>Kategori</label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
          >
            <option value="skill">
              Skill
            </option>

            <option value="tool">
              Tool
            </option>
          </select>
        </div>

        <div className="modal-footer">

          <button
            onClick={onClose}
            className="btn-cancel"
          >
            Batal
          </button>

          <button
            onClick={onSave}
            className="btn-save"
          >
            Simpan
          </button>

        </div>

      </div>
    </div>
  );
}

export default AddSkillModal;