import React from "react";
import { IoCaretForwardOutline } from "react-icons/io5";
import { useState } from "react";
import { FaAngleRight, FaRegStar, FaStar } from "react-icons/fa";
import { js, py, ts, c } from "../assets";
import solidity from "../assets/solidity.svg";
const Experience = () => {
  const experience = [
    {
      year: "2025",
      title: "IT & Software Engineer",
      company: "Megatrons",
      duration: "2025 – Present",
      description: () => (
        <ul>
          <li className="mt-2">
            <span className=" inline-block text-gray-500">
              <IoCaretForwardOutline />
            </span>
            Managing network infrastructure and ensuring reliable connectivity
            for a shared co-working space
          </li>
          <li className="mt-2">
            <span className=" inline-block text-gray-500">
              <IoCaretForwardOutline />
            </span>
            Troubleshooting electricity and hardware issues to keep operations
            running smoothly
          </li>
        </ul>
      ),
    },

    {
      year: "2024",
      title: "Software Engineer",
      company: "Genxr",
      duration: "September 2024 – February 2025",
      description: () => (
        <ul>
          <li className="mt-2">
            <span className=" inline-block text-gray-500">
              <IoCaretForwardOutline />
            </span>
            React Native engineer for a mobile AI-powered job interview
            preparation app
          </li>
          <li className="mt-2">
            <span className=" inline-block text-gray-500">
              <IoCaretForwardOutline />
            </span>
            Built performant, scalable mobile UI components from scratch using
            Expo + React Native
          </li>
          <li className="mt-2">
            <span className=" inline-block text-gray-500">
              <IoCaretForwardOutline />
            </span>
            Integrated REST APIs for AI-driven interview coaching, quiz
            generation, and feedback system
          </li>
          <li className="mt-2">
            <span className=" inline-block text-gray-500">
              <IoCaretForwardOutline />
            </span>
            Optimized render performance across Android and iOS, achieving 60FPS
            animations and reducing cold start time by 25%
          </li>
          <li className="mt-2">
            <span className=" inline-block text-gray-500">
              <IoCaretForwardOutline />
            </span>
            Built the company's web application alongside the mobile product
          </li>
          <li className="mt-2">
            <span className=" inline-block text-gray-500">
              <IoCaretForwardOutline />
            </span>
            Contributed to the backend using FastAPI and PostgreSQL, handling API
            endpoints and data modeling
          </li>
        </ul>
      ),
    },

    {
      year: "2024",
      title: "Frontend Developer",
      company: "myVtu",
      duration: "March 2024 – December 2024",
      description: () => (
        <ul>
          <li className="mt-2">
            <span className=" inline-block text-gray-500">
              <IoCaretForwardOutline />
            </span>
            Led frontend development of a payment platform using Next.js,
            handling recharge services for utilities and subscriptions
          </li>
          <li className="mt-2">
            <span className=" inline-block text-gray-500">
              <IoCaretForwardOutline />
            </span>
            Built responsive payment flows and real-time transaction updates,
            processing 100+ daily transactions
          </li>
          <li className="mt-2">
            <span className=" inline-block text-gray-500">
              <IoCaretForwardOutline />
            </span>
            Integrated multiple payment APIs and implemented error handling
            reducing failed transactions by 40%
          </li>
        </ul>
      ),
    },

    {
      year: "2023",
      title: "Python Tutor",
      company: "Personal",
      duration: "April 2023 – June 2023",
      description: () => (
        <ul className="">
          <li className="mt-2">
            <span className=" inline-block text-gray-500">
              <IoCaretForwardOutline />
            </span>
            Tutored a student on Python for their IGCSE Computer Science exam
          </li>
          <li className="mt-2">
            <span className=" inline-block text-gray-500">
              <IoCaretForwardOutline />
            </span>
            Ensured the student understood core concepts and could solve problems
            independently
          </li>
        </ul>
      ),
    },

    {
      year: "2022",
      title: "Frontend Developer",
      company: "Realtinic",
      duration: "August 2022 – July 2023",
      description: () => (
        <ul>
          <li className="mt-2">
            <span className=" inline-block text-gray-500">
              <IoCaretForwardOutline />
            </span>
            Developed responsive landing page and key dashboard components using
            Next.js, improving landlord platform engagement by 20%
          </li>
          <li className="mt-2">
            <span className=" inline-block text-gray-500">
              <IoCaretForwardOutline />
            </span>
            Built interactive property management interface for tracking tenant
            complaints and maintenance requests in real-time
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
      description: `JavaScript was my first real programming language after HTML and CSS. 
        I picked it up because I wanted my websites to actually do things, not just sit there looking pretty. 
        It's been my daily driver ever since. React, Next.js, TanstackStart, Node, you name it. 
        I still run into issues with it every day, but that's just JavaScript being JavaScript.`,
      rate: 5,
    },
    {
      name: "Python",
      start: new Date(2023, 3, 15),
      icon: py,
      description: `Started learning Python just for fun and somehow ended up tutoring someone with it. 
        My JavaScript background made picking it up pretty straightforward. I went deeper with 
        Data Structures and Algorithms on LeetCode, and now I use it for backend work with FastAPI. 
        It's my go-to when I need to build something quick or write scripts.`,
      rate: 5,
    },

    {
      name: "Typescript",
      start: new Date(2023, 10, 4),
      icon: ts,
      description: `TypeScript is basically JavaScript but it actually tells you when you're about to 
        do something stupid. I started using it in production at work and honestly can't go back, the 
        type safety alone saves so much debugging time. I use it with React, Next.js, and React Native now.`,
      rate: 5,
    },
    {
      name: "C",
      start: new Date(2022, 4, 9),
      icon: c,
      description: `Learned C through the ALX Software Engineering program. It was the first compiled 
        language I touched. I haven't used it much since, but it gave me a solid understanding of how 
        things work under the hood: memory management, pointers, all that low-level stuff. 
        It made me appreciate high-level languages a lot more.`,
      rate: 4,
    },
    {
      name: "Solidity",
      start: new Date(2025, 4, 11),
      icon: solidity,
      description: `I've been exploring blockchain development through hackathons. I've worked with 
        Solidity for EVM-based smart contracts and Sui Move for the Sui ecosystem. I'm still finding 
        my feet with both, but my goal is to combine my web and mobile skills with smart contracts 
        to build full-stack decentralized applications.`,
      rate: 2,
    },
  ];

  const [tab, setTab] = useState(0);
  return (
    <section>
      <section className="py-24 min-h-screen sm:grid grid-cols-2  sm:gap-12  md:px-8 ">
        <section id="experience" className="sm:max-h-[calc(100vh-4rem)] sm:overflow-y-auto scrollbar-hide">
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

        <section className="">
          <h2 className="text-3xl py-2 text-gray-500 font-medium text-center">
            Language Experience
          </h2>
          <p className="py-4 text-white">
            These are my experiences with languages, I've used and work with
          </p>

          <div className="flex overflow-x-auto scrollbar-hide">
            {languageExperience.map((data, index) => (
              <ul className=" my-3 flex flex-row justify-between w-full text-center border-t-2 border-gray-500 min-w-[80px]">
                <li
                  key={index}
                  className={`w-full h-12 pt-3 cursor-pointer hover:bg-ascent-200/40 -mt-0.5

${tab == index && "bg-ascent-200/30 border-t-2 border-ascent-200"}`}
                  onClick={() => setTab(index)}
                >
                  <p weight="bold" className="text-white">
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
