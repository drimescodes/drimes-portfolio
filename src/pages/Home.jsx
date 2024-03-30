import React from "react";
import { Link } from "react-router-dom";
import { usePage } from "../contexts/PageContext";
const About = () => {
  const { setCurrentPage } = usePage();
  const handleLinkClick = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className=" flex flex-col justify-center  min-h-screen mt-16 sm:mt-0">
      <div className="max-w-screen-md mx-auto">
        <h3 className="text-[#54d5bb]">Hi, my name is</h3>
        <h1 className=" text-6xl py-2 text-[#cacaca] font-medium">Drimes</h1>
        <h3 className=" text-4xl py-2 text-[#8892b0]">Frontend Developer</h3>
        {/* <img className=" relative mx-auto bg-gradient-to-b from-teal-500 rounded-full w-80 h-80 mt-5 overflow-hidden" src="1682471997680.jpg" alt="profileImage"></img> */}
        <p className="text-lg py-5 leading-8 text-[#cacaca]">
          As a frontend developer, I bring creativity with a solid grasp of web
          technologies to create engaging and user-friendly interfaces.
          Passionate about building accessible websites, I am eager to
          contribute and learn in a collaborative development environment.{" "}
        </p>
      </div>
      <div className=" text-5xl flex justify-center gap-8 py-3 pb-8 ">
        <Link to={"/projects"}>
          <div
            className=" md:text-3xl sm:text-xl text-sm active:scale-95 inline-block rounded-lg px-4 py-2 text-teal-500 border border-teal-500 bg-transparent"
            onClick={() => {
              handleLinkClick(3);
              scrollToTop();
            }}
          >
            <span className="">Projects</span>
          </div>
        </Link>

        <Link to={"/contact"}>
          <div
            href="#contact"
            className=" md:text-3xl sm:text-xl text-sm active:scale-95 inline-block px-4 py-2 rounded-lg text-teal-500 border border-teal-500 bg-transparent"
            onClick={() => {
              handleLinkClick(3);
              scrollToTop();
            }}
          >
            <span className="">Contact Me!</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default About;
