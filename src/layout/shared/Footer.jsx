import React from "react";
import { GrLinkedin, GrGithub } from "react-icons/gr";
import { FaDev } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="footer footer-horizontal footer-center text-base-content p-10 bg-base-300">
        <aside>
          <h1 className="text-3xl lg:text-5xl font-extrabold">snipEarn</h1>
          <p className="font-bold text-lg">
            Best Microtask Platform for Passive Income
          </p>
          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a
              href="https://www.linkedin.com/in/dev-abdullah-al-noman/"
              target="_blank"
              className="btn p-1"
            >
              <GrLinkedin size={30} />
            </a>
            <a
              href="https://github.com/devabdullahalnoman"
              target="_blank"
              className="btn p-1"
            >
              <GrGithub size={30} />
            </a>
            <a
              href="https://dev.to/devabdullahalnoman"
              target="_blank"
              className="btn p-1"
            >
              <FaDev size={30} />
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
