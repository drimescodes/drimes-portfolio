import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaLongArrowAltUp,
  FaLongArrowAltDown,
} from "react-icons/fa";
import {
  AiFillGithub,
  AiFillLinkedin,
} from "react-icons/ai";
import { RiTwitterXFill } from "react-icons/ri";

const Footer = () => {
  const pages = ['/', '/aboutme', '/experience', '/projects', '/contact'];
  const navigate = useNavigate();
  const location = useLocation();
  // Read the page from the URL so swipes and direct links stay in sync
  const currentPage = pages.indexOf(location.pathname);
  const isMainPage = currentPage !== -1;

  const handleNextPage = () => {
    navigate(pages[Math.min(currentPage + 1, pages.length - 1)]);
  };

  const handlePrevPage = () => {
    navigate(pages[Math.max(currentPage - 1, 0)]);
  };

  return (
    <footer className={`footer pt-8 ${isMainPage ? "pb-24" : "pb-8"} md:pb-8 text-sm text-[#8892b0]`}>
      <div className="hidden md:block fixed top-[50%] left-2 z-10">
        <ul className="list-none flex flex-col">
          <motion.li
            className="mb-5"
            initial={{ opacity: 0, x: -70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.75 }}
            viewport={{ once: true }}
          >
            <a
              href="https://github.com/drimescodes"
              target="_blank"
              rel="noreferrer"
            >
              <AiFillGithub size={30} />
            </a>
          </motion.li>
          <motion.li
            className="mb-5"
            initial={{ opacity: 0, x: -70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 1 }}
            viewport={{ once: true }}
          >
            <a
              href="https://www.linkedin.com/in/olamide-bamigbola-a30b9b232/"
              target="_blank"
              rel="noreferrer"
            >
              <AiFillLinkedin size={30} />
            </a>
          </motion.li>

          <motion.li
            initial={{ opacity: 0, x: -70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 1.5 }}
            viewport={{ once: true }}
          >
            <a href="https://x.com/drimesbot" target="blank">
              <RiTwitterXFill size={30} />
            </a>
          </motion.li>
        </ul>
      </div>

      {/* Mobile uses the bottom page bar in CubeSwipe instead */}
      <div className={`${isMainPage ? "md:block" : ""} hidden md:fixed md:top-[50%] md:right-[0rem] z-10`}>
        <ul className="list-none flex flex-col justify-center">
          <motion.button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className="mb-8 cursor-pointer disabled:opacity-30 disabled:cursor-default"
            initial={{ opacity: 0, x: 70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.75 }}
            viewport={{ once: true }}
          >
            <FaLongArrowAltUp size={30} />
          </motion.button>
          <motion.button
            onClick={handleNextPage}
            disabled={currentPage === pages.length - 1}
            className="cursor-pointer disabled:opacity-30 disabled:cursor-default"
            initial={{ opacity: 0, x: 70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 1 }}
            viewport={{ once: true }}
          >
            <FaLongArrowAltDown size={30} />
          </motion.button>
        </ul>
      </div>

      <div className="flex flex-col justify-center items-center mt-4">
        <p>Made by drimes</p>
        <p>@ 2026. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
