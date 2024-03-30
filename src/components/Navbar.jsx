import { React, useState } from "react";
import { RiCloseLine, RiMenu3Line } from "react-icons/ri";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiFillTwitterSquare,
} from "react-icons/ai";
import { Link, NavLink} from "react-router-dom";
import { drimes_avatar } from "../assets";
import { usePage } from "../contexts/PageContext";


const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const { setCurrentPage } = usePage();

  const handleClick = () => {
    setToggle(true);
  };
  const handleClick1 = () => {
    setToggle(false);
  };

  const handleLinkClick = (pageIndex) => {
    setCurrentPage(pageIndex);

    setToggle(false); 
  };


  return (
    <>
    <nav className="bg-[#1d1d20] w-[100%] p-4 sm:p-6 fixed left-0 right-0 top-0  z-[9999]  flex justify-between text-[#cacaca]  ">
      <Link to={"/"} >
        <img
          src={drimes_avatar}
          alt=""
          className="text-3xl font-bold w-10 h-10 rounded-lg border-2 border-[#54d5bb]"
          onClick={() => handleLinkClick(0)}
        />
      
      </Link>

      {/* Desktop Navbar */}
      <div className="hidden lg:flex justify-end text-sm">
        <ul className="flex items-center">
          <NavLink
            to="/"
            style={({ isActive }) => {
              return isActive ? { color: "#54d5bb" } : {};
            }}
            onClick={() => handleLinkClick(0)}
          >
            <li className="hover:text-[#54d5bb] mx-6 font-semibold cool-link ">
              Home
              <div className="bordered "></div>
            </li>
          </NavLink>

          <NavLink
            to="/aboutme"
            style={({ isActive }) => {
              return isActive ? { color: "#54d5bb" } : {};
            }}
            onClick={() => handleLinkClick(1)}
          >
            <li className="hover:text-[#54d5bb] mx-6 font-semibold cool-link ">
              About Me
              <div className="bordered "></div>
            </li>
          </NavLink>
          <NavLink
            to="/experience"
            style={({ isActive }) => {
              return isActive ? { color: "#54d5bb" } : {};
            }}
            onClick={() => handleLinkClick(2)}
          >
            <li className="hover:text-[#54d5bb] mx-6 font-semibold cool-link ">
              Experience
              <div className="bordered "></div>
            </li>
          </NavLink>

          <NavLink
            to="/projects"
            style={({ isActive }) => {
              return isActive ? { color: "#54d5bb" } : {};
            }}
            onClick={() => handleLinkClick(3)}
          >
            <li className="hover:text-[#54d5bb] mx-6 font-semibold cool-link ">
              Projects
              <div className="bordered "></div>
            </li>
          </NavLink>

          <NavLink
            to="/contact"
            style={({ isActive }) => {
              return isActive ? { color: "#54d5bb" } : {};
            }}

            onClick={() => handleLinkClick(4)}
          >
            <li className="hover:text-[#54d5bb] mx-6 font-semibold cool-link ">
              Contact
              <div className="bordered "></div>
            </li>
          </NavLink>

          <li>
            <a
              className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-cyan-500 text-white px-4 py-2 rounded-md ml-8"
              href="https://drive.google.com/file/d/1_4PkJ9dFicycXIAZujvzbw-i3UghY4Ic/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer" // Add rel="noopener noreferrer" for security reasons
            >
              Resume
            </a>
          </li>
        </ul>
      </div>

      {/* Mobile Navbar */}
      <div className="lg:hidden ">
        {toggle ? (
          <RiCloseLine size={40} onClick={handleClick1} />
        ) : (
          <RiMenu3Line
            className="cursor-pointer"
            onClick={handleClick}
            size={40}
          />
        )}
      </div>

      <div
        className={`min-h-screen overflow-y-hidden absolute top-16 left-0 w-full z-[99999] p-4 bg-[#1d1d20] px-8 lg:hidden transform transition-all duration-500 ease-in-out ${
          toggle ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col items-center">
          <NavLink
            to="/"
            style={({ isActive }) => {
              return isActive ? { color: "#54d5bb" } : {};
            }}
            onClick={() => handleLinkClick(0)}

          >
            <li className="hover:text-[#54d5bb] p-4 font-semibold cool-link ">
              Home
              <div className="bordered "></div>
            </li>
          </NavLink>

          <NavLink
            to="/aboutme"
            style={({ isActive }) => {
              return isActive ? { color: "#54d5bb" } : {};
            }}
            onClick={() => handleLinkClick(1)}
          >
            <li className="hover:text-[#54d5bb] p-4 font-semibold cool-link ">
              About Me
              <div className="bordered "></div>
            </li>
          </NavLink>
          <NavLink
            to="/experience"
            style={({ isActive }) => {
              return isActive ? { color: "#54d5bb" } : {};
            }}
            onClick={() => handleLinkClick(2)}

          >
            <li className="hover:text-[#54d5bb] p-4 font-semibold cool-link ">
              Experience
              <div className="bordered "></div>
            </li>
          </NavLink>

          <NavLink
            to="/projects"
            style={({ isActive }) => {
              return isActive ? { color: "#54d5bb" } : {};
            }}
            onClick={() => handleLinkClick(3)}

          >
            <li className="hover:text-[#54d5bb] p-4 font-semibold cool-link ">
              Projects
              <div className="bordered "></div>
            </li>
          </NavLink>

          <NavLink
            to="/contact"
            style={({ isActive }) => {
              return isActive ? { color: "#54d5bb" } : {};
            }}
            onClick={() => handleLinkClick(4)}

          >
            <li className="hover:text-[#54d5bb] p-4 font-semibold cool-link ">
              Contact
              <div className="bordered "></div>
            </li>
          </NavLink>

          <li className="p-4">
            <a
              className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-cyan-500 text-white px-4 py-2 rounded-md "
              href="https://drive.google.com/file/d/1_4PkJ9dFicycXIAZujvzbw-i3UghY4Ic/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer" // Add rel="noopener noreferrer" for security reasons
            >
              Resume
            </a>
          </li>

          <ul className="list-none flex gap-4 p-4 pt-8">
            <li
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
            </li>
            <li
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
            </li>

            <li
              initial={{ opacity: 0, x: -70 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 1.5 }}
              viewport={{ once: true }}
            >
              <a href="https://twitter.com/drimesbot" target="blank">
                <AiFillTwitterSquare size={30} />
              </a>
            </li>
          </ul>
        </ul>
      </div>


    </nav>
    <div className="border border-b-2 border-[#54d5bb]"></div>
    </>
  );
};

export default Navbar;
