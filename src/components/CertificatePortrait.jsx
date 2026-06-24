import "./CertificatePortrait.css";

function CertificatePortrait({ image, onClose }) {
  return (
    <div className="cert-popup-overlay cert-popup-view-overlay" onClick={onClose}>
      <div className="cert-popup-container" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="cert-popup-close"
          onClick={onClose}
          aria-label="Close certificate"
        >
          ×
        </button>

        <img
          src={image}
          alt="Certificate Portrait"
          className="cert-popup-img cert-popup-img-portrait"
        />
      </div>
    </div>
  );
}

export default CertificatePortrait;