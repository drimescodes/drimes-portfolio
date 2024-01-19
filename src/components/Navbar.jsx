import React from "react";
import { motion } from "framer-motion";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { Link, useLocation, NavLink } from "react-router-dom";

const Navbar = () => {
  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="py-10 mb-12 flex justify-between text-[#cacaca]">
      <Link to={"/"}>
        <HiOutlineDesktopComputer className="text-3xl font-bold w-10 h-10" />
      </Link>

      <div className="flex justify-end text-sm">
        <ul className="flex items-center">
  

<NavLink to="/"
style={({ isActive }) => {
  return isActive ? { color: "#54d5bb" } : {};
}}>
  <li
    className="hover:text-[#54d5bb] mx-6 font-semibold cool-link "
  >
    Home
    <div className="bordered "></div>
    
  </li>
</NavLink>


<NavLink to="/aboutme"
style={({ isActive }) => {
  return isActive ? { color: "#54d5bb" } : {};
}}>
  <li
    className="hover:text-[#54d5bb] mx-6 font-semibold cool-link "
  >
    About Me
    <div className="bordered "></div>
    
  </li>
</NavLink>
<NavLink to="/experience"
style={({ isActive }) => {
  return isActive ? { color: "#54d5bb" } : {};
}}>
  <li
    className="hover:text-[#54d5bb] mx-6 font-semibold cool-link "
  >
    Experience
    <div className="bordered "></div>
    
  </li>
</NavLink>

<NavLink to="/projects"
style={({ isActive }) => {
  return isActive ? { color: "#54d5bb" } : {};
}}>
  <li
    className="hover:text-[#54d5bb] mx-6 font-semibold cool-link "
  >
    Projects
    <div className="bordered "></div>
    
  </li>
</NavLink>

<NavLink to="/contact"
style={({ isActive }) => {
  return isActive ? { color: "#54d5bb" } : {};
}}>
  <li
    className="hover:text-[#54d5bb] mx-6 font-semibold cool-link "
  >
    Contact
    <div className="bordered "></div>
    
  </li>
</NavLink>

          <li>
            <a
              className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-cyan-500 text-white px-4 py-2 rounded-md ml-8"
              href="https://drive.google.com/file/d/1rhmXrkVmYROLt2MUlb-ERt6tfg3YzdH6/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer" // Add rel="noopener noreferrer" for security reasons
            >
              Resume
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
