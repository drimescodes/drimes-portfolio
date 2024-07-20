import React from "react";
import { IoCaretForwardOutline } from "react-icons/io5";
import { useState } from "react";
import { FaAngleRight, FaRegStar, FaStar } from "react-icons/fa";
import { js, py, ts, c } from "../assets";
const Experience = () => {
  const experience = [
    {
      year: "2022",
      title: "Frontend Developer Intern",
      company: "Realtinic",
      duration: "January 2022 - June 2022",
      description: () => (
        <ul>
          <li className="mt-2">
            <span className=" inline-block text-gray-500">
              <IoCaretForwardOutline />
            </span>
            Implemented a responsive landing page, improving user engagement by 20%.          </li>
          <li className="mt-2">
            {" "}
            <span className=" inline-block text-gray-500">
              <IoCaretForwardOutline />
            </span>
            Optimized web app performance, reducing load time by 30%
          </li>
        </ul>
      ),
    },

    {
      year: "2023",
      title: "Python Tutor",
      company: "Personal Tutor",
      duration: "April 2023 - June 2023",
      description: () => (
        <ul className=""> 
          <li className="mt-2">
            <span className=" inline-block text-gray-500">
              <IoCaretForwardOutline />
            </span>
            Tutored a student wanting to gain admission into college on his
            IGSCE exam, computer science
          </li>
          <li className="mt-2">
            {" "}
            <span className=" inline-block text-gray-500">
              <IoCaretForwardOutline />
            </span>
            Made Sure he understood the concepts well and could attempt
            questions on his own
          </li>
        </ul>
      ),
    },
  ];

  const languageExperience = [
    {
      name: "Javascript",
      start: new Date(2022, 0, 5),
      icon: js,
      description: `I delved into the world of JavaScript following a solid grasp of HTML5 and CSS. 
        It became the logical next step in my learning journey, not only to enhance my websites but also to inject 
        interactivity into the projects I was working on, The journey with JavaScript has been both challenging and 
        enjoyable. Initially, I encountered a plethora of issues, a sentiment that still echoes in my daily coding endeavors.
         However, with each passing day, the challenges transform into valuable learning experiences,
         contributing to a continuous improvement in my coding skills.`,
      rate: 4,
    },
    {
      name: "Python",
      start: new Date(2023, 3, 15),
      icon: py,
      description: `I started learning Python just for fun, and it unexpectedly led to a teaching gig. 
      While initially stronger in theory than practice, my background in JavaScript made me an effective instructor.
       This past summer, I delved deeper, mastering Python through hands-on experience with 
       Data Structures and Algorithms on platforms like LeetCode.
       As I continue, I'm gearing up to apply my Python skills in backend development.`,
      rate: 4,
    },

    {
      name: "Typescript",
      start: new Date(2023, 10, 4),
      icon: ts,
      description: `Exploring TypeScript, a relatively new language for me, has been a fun journey. 
        As a superset of JavaScript, they share common ground, yet TypeScript introduces powerful 
        features. I've been reading the documentation in my spare time, I like the fact that it can execute 
        JavaScript while enhancing type safety. I like that TypeScript effectively minimizes the potential messiness 
        and chaos that can arise in pure JavaScript.`,
      rate: 3,
    },
    {
      name: "C",
      start: new Date(2022, 4, 9),
      icon: c,
      description: `I first encountered C during an online software engineering program called ALX, it was the first 
      language we were taught and my first compiled language. While I haven't yet applied it extensively, 
      the journey into C has provided valuable insights into fundamental programming concepts, particularly 
      in areas like memory management. Although I haven't actively utilized C beyond the learning phase, 
      its foundational principles have enriched my understanding of programming.`,
      rate: 4,
    },
  ];

  const [tab, setTab] = useState(0);
  return (
    <section>
    <section className="py-24 min-h-screen sm:grid grid-cols-2  sm:gap-12  md:px-8 ">
      <section id="experience" className="">
        <h2 className="text-3xl pt-2 pb-10 text-gray-500 font-medium text-center">
          Job Experience
        </h2>
        
        {experience.map((data) => (
          <ol className="flex flex-col md:flex-row relative border-l border-stone-300">
            <li className="mb-10 ml-4">
              <div className="absolute mt-1.5 -left-1.5 w-3 h-3 bg-stone-300 rounded-full"></div>
              <p className="flex flex-wrap flex-row justify-start items-center text-xs md:text-sm">
                <span className="inline-blox py-1 px-2 mr-4 font-medium text-white bg-gray-600 rounded-md">
                  {data.year}
                </span>
                <span className="mr-1 text-base md:text-lg font-medium text-slate-400">
                  {data.title}{" "}
                </span>
                <span className="text-[#cacaca] ml-1 font-medium text-lg">
                  {" "}
                  @ {data.company}
                </span>
              </p>
              <p className="mt-3 text-xs sm:text-sm font-normal text-stone-400">
                {data.duration}
              </p>
              <p className="my-2 font-normal text-[#cacaca]">
                {data.description()}
              </p>
            </li>
          </ol>
        ))}
      </section>

      <section className="min-h-screen">
        <h2 className="text-3xl py-2 text-gray-500 font-medium text-center">
          Language Experience
        </h2>
        <p className="py-4 text-white">
          These are my experiences with languages, I've used and work with
        </p>

        <div className="flex">
          {languageExperience.map((data, index) => (
            <ul className=" my-3 flex flex-row justify-between w-full text-center border-t-2 border-gray-500">
              <li
                key={index}
                className={`w-full h-12 pt-3 cursor-pointer hover:bg-ascent-200/40 -mt-0.5

${tab == index && "bg-ascent-200/30 border-t-2 border-ascent-200"}`}
                onClick={() => setTab(index)}
              >
                <p weight="bold"  className="text-white">
                  {data.name}
                </p>
              </li>
            </ul>
          ))}
        </div>
        <article>
          <div className="my-2 mx-auto w-14 h-14 grid place-items-center hover:scale-110 text-3xl rounded-full bg-gradient-to-br from-ascent-200/40 shadow-md">
            <img
              src={languageExperience[tab].icon}
              alt="Language Icon"
              className="h-8 w-8"
            />
          </div>
          <h2 className="my-2 text-gray-400">
            <p>
              Started
              <FaAngleRight className="inline" />
            </p>
            {languageExperience[tab].start.toDateString()}
          </h2>
          <div className="my-2">
            <p className="text-[#54d5bb]">
              Description
              <FaAngleRight className="inline" />
            </p>
            <span className="text-gray-400">
              {languageExperience[tab].description}
            </span>
          </div>
          <div className="flex flex-row gap-1 items-center text-[#54d5bb]">
            <p>
              Level
              <FaAngleRight className="inline" />
            </p>
            {Array.from(Array(languageExperience[tab].rate).keys()).map((i) => (
              <FaStar key={i} />
            ))}
            {Array.from(Array(6 - languageExperience[tab].rate).keys()).map(
              (i) => (
                <FaRegStar key={i} />
              )
            )}
          </div>
        </article>
      </section>
    </section>

    {/* <section className="mt=5">
      Volunteer and Open Source
    </section> */}
    
    </section>
  );
};

export default Experience;
