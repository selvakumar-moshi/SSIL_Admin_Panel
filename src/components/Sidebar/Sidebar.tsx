/*
 * Copyright (c) 2024 Payhuddle. All rights reserved.
 */
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import imgFolderCopy from "../../assets/Folder.svg";
import tabIcon from "../../assets/tab_Icon.svg";
import yearIcon from "../../assets/yearIcon.svg";

export interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode | string;
  route: string;
  isActive?: boolean;
}

export interface SidebarProps {
  className?: string;
  activeRoute?: string;
  onNavigate?: (route: string) => void;
  collapsed?: boolean;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: imgFolderCopy, 
    route: "/dashboard",
  },
  {
    id: "reports",
    label: "Reports",
    icon: imgFolderCopy,
    route: "/reports",
  },
  {
    id: "financial",
    label: "Financial year",
    icon: yearIcon,
    route: "/financial",
  },
  {
    id: "tabSectionCreation",
    label: "Tab Section Creation",
    icon: tabIcon,
    route: "/tabSectionCreation",
  },
];

const Sidebar: React.FC<SidebarProps> = ({
  className,
  activeRoute,
  onNavigate,
  collapsed = false,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentRoute = activeRoute || location.pathname;

  const handleItemClick = (route: string) => {
    if (onNavigate) {
      onNavigate(route);
    } else {
      navigate(route);
    }
  };

  const isMenuItemActive = (itemRoute: string): boolean => {
    if (currentRoute === itemRoute) return true;
    if (currentRoute.startsWith(itemRoute + '/')) return true;
    return false;
  };

  // Helper function to render icon
  const renderIcon = (icon: React.ReactNode | string) => {
    if (typeof icon === 'string') {
      return <img src={icon} alt="icon" className="sidebar__icon" />;
    }
    return icon;
  };

  return (
    <div className={`sidebar-container ${className || ""} ${collapsed ? "sidebar--collapsed" : ""}`}>
      <div className="sidebar-bg"></div>
      <div className="sidebar">
        <div className="sidebar__menu">
          <ul className="sidebar__menu-list">
            {MENU_ITEMS.map((item: MenuItem) => {
              const isActive = isMenuItemActive(item.route);
              
              return (
                <li key={item.id} className="sidebar__menu-item">
                  <button
                    className={`sidebar__menu-button ${
                      isActive ? "sidebar__menu-button--active" : ""
                    }`}
                    onClick={() => handleItemClick(item.route)}
                    title={collapsed ? item.label : undefined}
                  >
                    <div className="sidebar__icon-container">
                      {renderIcon(item.icon)}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;