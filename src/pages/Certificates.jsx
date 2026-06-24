import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './Certificates.css';

// Integrasi Navigasi Kelompok
import NavigationLayout from "../navigation/NavigationLayout";
import DeleteIcon from "../assets/delete.svg?react";

const Certificates = () => {
  const [certs, setCerts] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);
  const [showView, setShowView] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [tempImg, setTempImg] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const fetchCertificates = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/certificates",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCerts(response.data);
    } catch (error) {
      console.error("Gagal mengambil certificate:", error);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const openView = (cert) => { setSelectedCert(cert); setShowView(true); };
  const openDelete = (cert) => { setSelectedCert(cert); setShowDelete(true); };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/certificates/${selectedCert.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchCertificates();
      setShowDelete(false);
    } catch (error) {
      console.error("Gagal menghapus:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setTempImg(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("image", selectedFile);

      await axios.post(
        "http://localhost:5000/certificates",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await fetchCertificates();
      setTempImg(null);
      setSelectedFile(null);
      setShowAdd(false);
    } catch (error) {
      console.error("Upload gagal:", error);
    }
  };

  return (
    <NavigationLayout>
      <div className="certificates-content">
        <div className="certs-container">
          
          <div className="certs-header">
            <div>
              <h2>Your Certificates</h2>
            </div>
            <button onClick={() => setShowAdd(true)} className="btn-add-cert">
              <span className="material-icons" style={{ fontSize: '16px' }}>add</span>
              Add Certificate
            </button>
          </div>

          {certs.length === 0 ? (
            <div className="empty-certificates">
              Anda belum menambahkan sertifikat
            </div>
          ) : (
            <div className="certs-dashboard-style">
              {certs.map((cert) => (
                <div key={cert.id} className="cert-item-box">
                  {/* Gambar Utama */}
                  <img 
                    src={`http://localhost:5000/${cert.image}`}
                    alt="Sertifikat"
                    onClick={() => openView(cert)}
                    className="cert-image-clickable"
                    onError={(e) => {
                      e.target.src =
                        'https://via.placeholder.com/310x350?text=Sertifikat';
                    }}
                  />
                  
                  {/* Container Tombol Aksi Melayang di Kanan Atas Gambar */}
                  <div className="cert-actions-top-right">
                    <button
                      onClick={() => openDelete(cert)}
                      className="action-btn-box btn-del-box"
                      title="Hapus"
                    >
                      <DeleteIcon />
                    </button>
                    <button onClick={() => openView(cert)} className="action-btn-box btn-view-box" title="Perbesar">
                      <span className="material-icons">fullscreen</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* MODAL VIEW (FULLSCREEN) */}
          {showView && (
            <div className="certificates-modal-overlay view-overlay">
              <div className="view-container" style={{ position: 'relative', textAlign: 'center' }}>
                <button onClick={() => setShowView(false)} style={{ position: 'absolute', top: '-50px', right: '0', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
                  <span className="material-icons" style={{ fontSize: '40px' }}>close</span>
                </button>
                <img src={`http://localhost:5000/${selectedCert?.image}`} alt="Full View" className="view-img" />
              </div>
            </div>
          )}

          {/* MODAL DELETE */}
          {showDelete && (
            <div className="certificates-modal-overlay">
              <div className="certificates-modal-content" style={{ maxWidth: '320px' }}>
                <button onClick={() => setShowDelete(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', cursor: 'pointer' }}>
                  <span className="material-icons">close</span>
                </button>
                <p style={{ fontWeight: 'bold', color: '#333', margin: '20px 0', fontSize: '15px' }}>
                  Anda yakin ingin menghapus sertifikat ini?
                </p>
                <div className="modal-footer">
                  <button onClick={() => setShowDelete(false)} className="btn-modal btn-cancel">Cancel</button>
                  <button onClick={confirmDelete} className="btn-modal btn-red">Delete</button>
                </div>
              </div>
            </div>
          )}

          {/* MODAL ADD */}
          {showAdd && (
            <div className="certificates-modal-overlay">
              <div className="certificates-modal-content">
                <button onClick={() => { setShowAdd(false); setTempImg(null); }} className="btn-close-modal">
                  <span className="material-icons">close</span>
                </button>
                <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '25px', fontSize: '20px' }}>Tambahkan Sertifikat Anda</h3>
                
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" style={{ display: 'none' }} />

                <div className="upload-zone" onClick={() => fileInputRef.current.click()}>
                  {tempImg ? (
                    <img src={tempImg} alt="Preview" />
                  ) : (
                    <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#999', letterSpacing: '1px' }}>PILIH FILE GAMBAR</span>
                  )}
                </div>

                <div className="modal-footer">
                  <button onClick={() => { setShowAdd(false); setTempImg(null); }} className="btn-modal btn-cancel">Batal</button>
                  <button onClick={handleSave} disabled={!tempImg} className="btn-modal btn-confirm" style={{ opacity: tempImg ? 1 : 0.5 }}>
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </NavigationLayout>
  );
};

export default Certificates;