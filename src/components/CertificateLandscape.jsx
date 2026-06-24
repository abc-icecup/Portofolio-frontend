import "./CertificateLandscape.css";

function CertificateLandscape({ image, onClose }) {
  return (
    <div
      className="cert-land-popup-overlay cert-land-popup-view-overlay"
      onClick={onClose}
    >
      <div
        className="cert-land-popup-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="cert-land-popup-close"
          onClick={onClose}
          aria-label="Close certificate"
        >
          ×
        </button>

        <img
          src={image}
          alt="Certificate Landscape"
          className="cert-land-popup-img cert-land-popup-img-landscape"
        />
      </div>
    </div>
  );
}

export default CertificateLandscape;