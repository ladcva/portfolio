import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import { FiMail, FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/project", label: "Projects" },
  { to: "/blog", label: "Blog" },
  { to: "/resume", label: "Resume" },
];

function NavBar({ theme, toggleTheme }) {
  const [expanded, setExpanded] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      expanded={expanded}
      fixed="top"
      expand="md"
      className={isScrolled ? "site-nav site-nav--scrolled" : "site-nav"}
    >
      <Container className="site-nav__container">
        <Navbar.Brand as={NavLink} to="/" className="site-brand" onClick={() => setExpanded(false)}>
          <span className="site-brand__mark">LD</span>
          <span className="site-brand__text">Le Anh Duc</span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="site-nav__toggle"
          onClick={() => setExpanded((current) => !current)}
        >
          {expanded ? <FiX /> : <FiMenu />}
        </Navbar.Toggle>

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto site-nav__links">
            {navItems.map((item) => (
              <Nav.Item key={item.to}>
                <Nav.Link
                  as={NavLink}
                  to={item.to}
                  end={item.to === "/"}
                  onClick={() => setExpanded(false)}
                >
                  {item.label}
                </Nav.Link>
              </Nav.Item>
            ))}
            <Nav.Item className="site-nav__cta">
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
              <Button href="mailto:me@anhducle.com" className="button button--primary">
                <FiMail />
                Contact
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
