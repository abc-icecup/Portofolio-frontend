import { useState } from "react";

import Topbar from "../navigation/Topbar";
import Sidebar from "../navigation/Sidebar";

import "./NavigationLayout.css";

export default function NavigationLayout({
  children,
  defaultSidebarOpen = true,
  isGuest = false,
}) {

  const [isSidebarOpen, setIsSidebarOpen] =
    useState(defaultSidebarOpen);

  const toggleSidebar = () => {
    setIsSidebarOpen(
      prev => !prev
    );
  };

  return (
    <div className="layout-container">

      <Topbar
        toggleSidebar={toggleSidebar}
      />

      {!isGuest && (

        <Sidebar
          isOpen={isSidebarOpen}
        />

      )}

      <main
        className={`layout-content ${
          isSidebarOpen
            ? "sidebar-open"
            : "sidebar-closed"
        }`}
      >
        {children}
      </main>

    </div>
  );
}