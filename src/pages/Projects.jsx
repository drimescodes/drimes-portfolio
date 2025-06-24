import React from "react";
import { motion } from "framer-motion";
import { AiFillGithub } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import {
  eklektos,
  hangman,
  swiftinvoice,
  getlinked,
  reactgrabstar,
  multistepform,
} from "../assets";
const Projects = () => {
  const projects = [
    {
      title: "Hangman Game",
      thumbnail: hangman,
      description:
        "A word web game, you are to guess a word letter by letter which you are given 7 tries for each word ",
      technology: "VanillaJs / Tailwind",
      github: "#",
      deployed: "https://hangman-game-sooty.vercel.app/",
    },
    {
      title: "Eklektos Blog",
      thumbnail: eklektos,
      description:
        "A full stack blog application using strapi CMS as the backend ",
      technology: "Strapi/ ReactJS / Tailwind",
      github: "https://github.com/drimescodes/eklektos-blog-fe",
      deployed: "https://eklektos-blog-fe.vercel.app/",
    },
    {
      title: "Swift Invoice",
      thumbnail: swiftinvoice,
      description: `A four-member hackathon project, An invoice management, we launching it into a live product soon`,
      technology: "NextJS / Tailwind / MongoDB",
      github: "#",
      deployed: "https://swiftinvoice.vercel.app/",
    },

    {
      title: "Get Linked Hackathon",
      thumbnail: getlinked,
      description:
        "A two-member hackathon project submission, a captivating animated landing page built for getlinked  ",
      technology: "ReactJS, Tailwind, GSAP",
      github: "https://github.com/Jude-dev46/getLinkedHackathon",
      deployed: "https://getlinked-nu.vercel.app/",
    },
    {
      title: "React Grabster",
      thumbnail: reactgrabstar,
      description: "A landing page clone of the react grabstar website",
      technology: "ReactJS, Tailwind",
      github: "https://github.com/drimescodes/react-grabstar",
      deployed: "https://react-grabstar.vercel.app/",
    },

    {
      title: "Multistep Form",
      thumbnail: multistepform,
      description: "A frontend mentor challenge",
      technology: "VanillaJs, Tailwind",
      github: "https://github.com/drimescodes/multistep-form",
      deployed: "https://multisteo-form.vercel.app/",
    },
  ];

  const animateProject = {
    hidden: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1,
        duration: 0.1,
        type: "tween",
        delayChildren: 0.2,
        staggerChildren: 0.2,
      },
    },
  };
  const animateProjectItem = {
    hidden: { opacity: 0, y: 50 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.2,
        type: "tween",
      },
    },
  };
  return (
    <>
      <section
        id="projects"
        className="text-3xl mt-16 sm:mt-24 py-2 text-gray-500 font-medium text-center"
      >
        <h2>Projects</h2>
      </section>
      <section className="max-w-screen-xl m-auto md:px-8 py-14  min-h-screen overflow-hidden">
        <motion.div
          className="w-full grid md:grid-cols-2 gap-8 "
          variants={animateProject}
          initial="hidden"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              className="relative rounded-lg overflow-hidden h-[350px] flex flex-col "
              variants={animateProjectItem}
              viewport={{ once: true }}
            >
              {/* Project Thumbnail */}
              <div 
                className="h-48 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${project.thumbnail})`,
                }}
              ></div>
              
              {/* Project Details */}
              <div className="p-5 bg-[#222222] flex-1 flex flex-col">
                <h3 className="mb-2 font-semibold text-[#54d5bb] text-xl uppercase tracking-tighter">
                  {project.title}
                </h3>
                
                <p className="text-white text-sm tracking-tight leading-snug font-medium mb-3 flex-1">
                  {project.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-[#54d5bb] text-xs font-semibold">
                    {project.technology}
                  </span>
                  
                  <div className="flex space-x-4">
                    {project.github !== "#" && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-sky-300 transition-colors"
                        aria-label="View GitHub repository"
                      >
                        <AiFillGithub className="text-2xl hover:bg-sky-300" />
                      </a>
                    )}
                    
                    <a
                      href={project.deployed}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-sky-300 transition-colors"
                      aria-label="View live project"
                    >
                      <FiExternalLink className="text-2xl" />
                    </a>
                  </div>
                </div>
              </div>
              
             
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
};

export default Projects;
