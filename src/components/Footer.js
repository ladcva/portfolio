import React from "react";
import {
  AiFillGithub,
  AiOutlineFacebook,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

const links = [
  { href: "https://github.com/ladcva", label: "GitHub", icon: <AiFillGithub /> },
  { href: "https://facebook.com/ladcva", label: "Facebook", icon: <AiOutlineFacebook /> },
  { href: "https://www.linkedin.com/in/ladcva/", label: "LinkedIn", icon: <FaLinkedinIn /> },
  { href: "https://www.instagram.com/leanhducpdp/", label: "Instagram", icon: <AiFillInstagram /> },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div>
        <strong>Le Anh Duc</strong>
        <span>Data engineering, cloud platforms, and applied ML.</span>
      </div>
      <span>© {year}</span>
      <ul className="footer-icons">
        {links.map((link) => (
          <li className="social-icons" key={link.href}>
            <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
              {link.icon}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}

export default Footer;
