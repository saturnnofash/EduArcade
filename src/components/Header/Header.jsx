import React from 'react';
import { Container } from "reactstrap";
import { NavLink } from "react-router-dom";
import "./header.css";

const navLinks = [
  {
    display: "Home",
    url: "/"
  },
  {
    display: "About",
    url: "/about"
  },
  {
    display: "Games",
    url: "/game"
  },
  {
    display: "Login",
    url: "/login"
  }
];

const Header = () => {
  return (
    <header className="header">
      <Container>
        <div className="navigation d-flex align-items-center justify-content-between">
          <div className="logo">
            <h2 className="d-flex align-items-center">
              <i className="ri-copilot-fill" style={{ color: '#F4B942' }}></i> LearnHub
            </h2>
          </div>

          <div className="nav d-flex align-items-center gap-5">
            <div className="nav_menu">
              <ul className="nav_list">
                {navLinks.map((item, index) => (
                  <li key={index} className="nav_item">
                    <NavLink
                      to={item.url}
                      className={({ isActive }) => 
                        `${isActive ? "active" : ""} ${item.display === "Login" ? "login-link" : ""}`
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;