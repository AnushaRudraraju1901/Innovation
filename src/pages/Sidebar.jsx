// Sidebar.jsx
import React, { useState } from 'react';
import {  FaBars, FaHome, FaChartLine, FaMapMarkedAlt, FaQuestionCircle, FaCommentAlt, FaUserCircle } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItem = [
    {
      path: "/home",
      name: "Home",
      icon: <FaHome />
    },
    {
      path: "/prediction",
      name: "Prediction",
      icon: <FaChartLine />
    },
    {
      path: "/maps",
      name: "Maps",
      icon: <FaMapMarkedAlt />
    },
    {
      path: "/faq",
      name: "FAQ",
      icon: <FaQuestionCircle />
    },
    {
      path: "/chatbot",
      name: "Chatbot",
      icon: <FaCommentAlt />
    },
    {
      path: "/admin-login",
      name: "Admin Login",
      icon: <FaUserCircle />
    }
  ];

  const handleLinkClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="container">
      <div style={{ width: isOpen ? "280px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">Logo</h1>
          <div style={{ marginLeft: isOpen ? "90px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {
          menuItem.map((item, index) => (
            <div
              key={index}
              className={`link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => handleLinkClick(item.path)}
            >
              <div className="icon">{item.icon}</div>
              <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
            </div>
          ))
        }
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;