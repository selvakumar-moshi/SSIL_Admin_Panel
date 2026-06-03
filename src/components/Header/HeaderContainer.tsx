import { Layout, Avatar, Dropdown, Space, Badge, Button, theme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  SunOutlined,
  MoonOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const HeaderContainer = () => {
 
  return (
     <div className='header'>
        {/* Left Section - Logo and App Name */}
        <div className="header__left">
          <div className="header__logo">
            <UserOutlined />
          </div>
          <div className="header__app-name">
            SSIL Admin Panel
          </div>
        </div>

        {/* Right Section - User Info and Actions */}
        <div className="header__right">
          {/* User Greeting */}
          <div className="header__greeting">
            <span className="header__greeting-text">
              Hello <span className="header__user-name">Selva!</span>
            </span>
          </div>
          
          {/* User Role with Dropdown */}
          <Dropdown 
            dropdownRender={() => (
              <Menu className="header__profile-menu">
                <div className="header__profile-content">
                  <div className="header__profile-header">
                      <span className="header__profile-title">Profile</span>
                      <UserOutlined />
                  </div>
                    
                  <div className="header__profile-info">
                      <div className="header__profile-row">
                        <span className="header__profile-label">First Name</span>
                        <span className="header__profile-value">Selva</span>
                        <div className="header__border-line"></div>
                      </div>
                      <div className="header__profile-row">
                        <span className="header__profile-label">Last Name</span>
                        <span className="header__profile-value">kumar</span>
                        <div className="header__border-line"></div>
                      </div>
                      <div className="header__profile-row">
                        <span className="header__profile-label">Job Title</span>
                        <span className="header__profile-value">Admin</span>
                        <div className="header__border-line"></div>
                      </div>
                      <div className="header__profile-row">
                        <span className="header__profile-label">Email Address</span>
                        <span className="header__profile-value">selva@gmail.com</span>
                        <div className="header__border-line"></div>
                      </div>
                      <div className="header__profile-row">
                        <span className="header__profile-label">Roles</span>
                        <span className="header__profile-value">{displayUserRole}</span>
                      </div>
                  </div>
                </div>
              </Menu>
            )}
            trigger={['hover']}
            placement="bottomRight"
            overlayClassName="header__profile-dropdown"
            // open={isDropdownOpen}
            // onOpenChange={onDropdownVisibleChange}
            getPopupContainer={() => document.body}
          >
            <div className="header__role">
              <UserOutlined />
              <div className="header__role-text">Profile</div>
            </div>
          </Dropdown>

          {/* Logout */}
          <div className="header__logout">
            <UserOutlined />
            <span className="header__logout-text">Logout</span>
          </div>
        </div>
      </div>
  );
};

export default HeaderContainer;