import React from "react";
import { AiFillGithub, AiFillLinkedin, AiOutlineMail } from "react-icons/ai";
import { Link } from "react-router-dom";

const About = () => {
  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className=" flex flex-col justify-center py-10 ">
      <div className="max-w-screen-md mx-auto">
        <h3 className="text-[#54d5bb]">Hi, my name is</h3>
        <h1 className=" text-6xl py-2 text-[#cacaca] font-medium">Drimes</h1>
        <h3 className=" text-4xl py-2 text-[#8892b0]">Frontend Developer</h3>
        {/* <img className=" relative mx-auto bg-gradient-to-b from-teal-500 rounded-full w-80 h-80 mt-5 overflow-hidden" src="1682471997680.jpg" alt="profileImage"></img> */}
        <p className="text-lg py-5 leading-8 text-[#cacaca]">
          As a junior frontend developer, I bring creativity with a solid grasp
          of web technologies to create engaging and user-friendly interfaces.
          Passionate about building accessible websites, I am eager to
          contribute and learn in a collaborative development environment.{" "}
        </p>
      </div>
      <div className=" text-5xl flex justify-center gap-8 py-3 pb-8 ">
        <Link to={"/projects"}>
          <div className=" md:text-3xl text-xl active:scale-95 inline-block rounded-lg px-4 py-2 text-teal-500 border border-teal-500 bg-transparent">
            <span className="">Projects</span>
          </div>
        </Link>

        <Link to={"/contact"}>
          <div
            href="#contact"
            className=" md:text-3xl text-xl active:scale-95 inline-block px-4 py-2 rounded-lg text-teal-500 border border-teal-500 bg-transparent"
          >
            <span className="">Contact Me!</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default About;
