/*
 * Copyright (c) 2024 Payhuddle. All rights reserved.
 */
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  BarChartOutlined,
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import imgFolderCopy from "../../assets/Folder.svg";

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

// Static menu configuration - 4 main menus
const MENU_ITEMS: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: imgFolderCopy, // This is a string path
    route: "/dashboard",
  },
  {
    id: "reports",
    label: "Reports",
    icon: <BarChartOutlined />, // This is a React element
    route: "/reports",
  },
  {
    id: "financial",
    label: "Financial year",
    icon: <UserOutlined />,
    route: "/financial",
  },
  {
    id: "tabSectionCreation",
    label: "Tab Section Creation",
    icon: <SettingOutlined />,
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
      // It's an image path, render as img tag
      return <img src={icon} alt="icon" className="sidebar__icon" />;
    }
    // It's a React component, render directly
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