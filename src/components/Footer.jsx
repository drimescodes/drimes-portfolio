import React from "react";
import { motion } from "framer-motion";
import { usePage } from "../contexts/PageContext";
import { useNavigate } from "react-router-dom";
import {
  FaLongArrowAltUp,
  FaLongArrowAltDown,
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
} from "react-icons/fa";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterSquare,
} from "react-icons/ai";

const Footer = () => {
  const { currentPage, setCurrentPage } = usePage();
  const pages = ['/', '/aboutme', '/experience', '/projects', '/contact'];
  const navigate = useNavigate();



  const handleNextPage = () => {
    const nextPageIndex = Math.min(currentPage + 1, pages.length - 1);
    setCurrentPage(nextPageIndex);
    navigate(pages[nextPageIndex]);

    console.log(nextPageIndex);
  };

  const handlePrevPage = () => {
    const prevPageIndex = Math.max(currentPage - 1, 0);
    setCurrentPage(prevPageIndex);
    navigate(pages[prevPageIndex]);

    console.log(prevPageIndex);
  };

  return (
    <footer className="footer py-8 text-sm text-[#8892b0]">
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
              href="httbps://github.com/drimescodes"
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
            <a href="https://twitter.com/drimesbot" target="blank">
              <AiFillTwitterSquare size={30} />
            </a>
          </motion.li>
        </ul>
      </div>

      <div className="md:block sm:fixed sm:top-[50%] sm:right-[0rem] z-10 ">
        <ul className="list-none flex flex-row sm:flex-col justify-center ">
          <motion.button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className="mr-8 sm:mb-8 cursor-pointer"
            initial={{ opacity: 0, x: 70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.75 }}
            viewport={{ once: true }}
          >
            <FaLongArrowAltUp size={30} className="hidden sm:block" />
            <FaLongArrowAltLeft size={30} className="sm:hidden block" />
          </motion.button>
          <motion.button
            onClick={handleNextPage}
            disabled={currentPage === pages.length - 1}
            className=" cursor-pointer"
            initial={{ opacity: 0, x: 70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 1 }}
            viewport={{ once: true }}
          >
            <FaLongArrowAltDown size={30} className="hidden sm:block" />
            <FaLongArrowAltRight size={30} className="sm:hidden block" />
          </motion.button>
        </ul>
      </div>

      <div className="flex flex-col justify-center items-center mt-4">
        <p>Made by drimes</p>
        <p>@ 2024. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
