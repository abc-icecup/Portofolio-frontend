import "./Topbar.css";
import { useNavigate, useLocation } from "react-router-dom";

import logo from "../assets/portoLogo.png";
import documentIcon from "../assets/images/ikon_dokumen.svg";
import menuIcon from "../assets/images/ikon_menu.svg";

export default function Topbar({ toggleSidebar }) {
  const isLogin =
    !!localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  const isPortfolioPage =
    location.pathname === "/portfolio";

  const username =
    localStorage.getItem(
      "username"
    );    

  return (
    <div className="topbar">

      {/* LEFT */}
      <div className="topbar-left">

        {isLogin && (
          <button
            className="menu-btn"
            onClick={toggleSidebar}
          >
            <img
              src={menuIcon}
              alt="Menu"
              className="menu-icon"
            />
          </button>
        )}

        <img
          src={logo}
          className="logo-img"
        />

        <span className="logo-text">
          MyPorto
        </span>

      </div>

      {/* RIGHT */}
      <div className="topbar-right">

        {isLogin ? (

          <button
            className={`icon-btn ${
              isPortfolioPage
                ? "active"
                : ""
            }`}
            onClick={() =>
              navigate("/portfolio")
            }
          >
            <img
              src={documentIcon}
              alt="Document Icon"
              className="document-icon"
            />
          </button>

        ) : (

          <>

            <button
              onClick={() =>
                navigate("/signin")
              }
            >
              Sign In
            </button>

            <button
              onClick={() =>
                navigate("/signup")
              }
            >
              Sign Up
            </button>

          </>

        )}

      </div>

    </div>
  );
}