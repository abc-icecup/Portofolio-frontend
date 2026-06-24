import { NavLink } from "react-router-dom";

import DashboardIcon from "../assets/dashboardLogo.svg?react";
import ProjectsIcon from "../assets/projectsLogo.svg?react";
import SkillsIcon from "../assets/skillsLogo.svg?react";
import CertificatesIcon from "../assets/certificatesLogo.svg?react";
import ProfileIcon from "../assets/profileLogo.svg?react";

import "./Sidebar.css";

export default function Sidebar({ isOpen }) {
  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <ul>

        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/projects"
            end
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            <ProjectsIcon className="icon" />
            <span>Projects</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/skills"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <SkillsIcon className="icon" />
            <span>Skills</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/certificates"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <CertificatesIcon className="icon" />
            <span>Certificates</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <ProfileIcon className="icon" />
            <span>Profile</span>
          </NavLink>
        </li>

      </ul>
    </div>
  );
}