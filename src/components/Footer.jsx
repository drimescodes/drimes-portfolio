import React from "react";
import {motion} from "framer-motion";
import { FaLongArrowAltUp, FaLongArrowAltDown} from "react-icons/fa";
import {AiFillGithub, AiFillLinkedin, AiFillTwitterSquare} from "react-icons/ai";
import { useState} from "react";
import { useNavigate } from "react-router";

const Footer = ()=>{


  const [currentPage, setCurrentPage] = useState(0);
  const pages = ['/','/aboutme', '/experience', '/projects', '/contact'];
const navigate = useNavigate();
const handleNextPage = () => {
  setCurrentPage((prevPage) => Math.min(prevPage + 1, pages.length - 1));
  navigate(pages[currentPage + 1]);
};

const handlePrevPage = () => {
  setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  navigate(pages[currentPage - 1]);

  
};




    return(
    <footer className="footer py-8 text-sm text-[#8892b0]"> 
        <div className="flex flex-col justify-center items-center">
            <p>Made by drimes</p>
            <p>@ 2024. All rights reserved</p>
        </div>


        <div className="social hidden md:block fixed top-[50%] left-2 z-10">
        <ul className="list-none flex flex-col">
          <motion.li className="mb-5" initial={{ opacity: 0, x: -70 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: .75 }} viewport={{ once: true }}>
            <a href="https://github.com/drimescodes" target="_blank" rel="noreferrer"><AiFillGithub size={30} /></a>
          </motion.li>
          <motion.li className="mb-5" initial={{ opacity: 0, x: -70 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 1 }} viewport={{ once: true }}>
            <a href="https://www.linkedin.com/in/olamide-bamigbola-a30b9b232/" target="_blank" rel="noreferrer"><AiFillLinkedin size={30} /></a>
          </motion.li>
          
          <motion.li initial={{ opacity: 0, x: -70 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 1.5 }} viewport={{ once: true }}>
            <a href="https://twitter.com/drimesbot" target="blank"><AiFillTwitterSquare size={30} /></a>
          </motion.li>
        </ul>
      </div>

      <div className="social  md:block fixed top-[50%] right-3 z-10 ">
        <ul className="list-none flex flex-col ">
          <motion.button onClick={handlePrevPage} disabled={currentPage === 0} className="mb-8 cursor-pointer" initial={{ opacity: 0, x: 70 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: .75 }} viewport={{ once: true }}>
          <FaLongArrowAltUp  size={30}/>

          </motion.button>
          <motion.button onClick={handleNextPage} disabled={currentPage === pages.length - 1} className=" cursor-pointer" initial={{ opacity: 0, x: 70 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 1 }} viewport={{ once: true }}>
          <FaLongArrowAltDown size={30}/>
          </motion.button>
          
          
        </ul>
      </div>
    </footer>
    )
    }

export default Footer;