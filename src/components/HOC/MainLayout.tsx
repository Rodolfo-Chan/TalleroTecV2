import { useState } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import style from "./main.module.css";

const MainLayout = ({ children, toggleSidebar, isSidebarOpen }: { children?: JSX.Element; toggleSidebar: () => void; isSidebarOpen: boolean }) => {
  return (
    <div className={`${style["app-container"]}`}>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className={`${style["content-container"]}`}>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`${style["main-content"]}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
