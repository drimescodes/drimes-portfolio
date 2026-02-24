import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiFillGithub } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import { IoBookOutline } from "react-icons/io5";
import {
  eklektos,
  hangman,
  swiftinvoice,
  getlinked,
  reactgrabstar,
  multistepform,
  bimpe,
} from "../assets";
import ProjectDetail from "../components/ProjectDetail";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const projects = [
    {
      title: "Bímpé",
      thumbnail: bimpe,
      description:
        "An all-in-one celebration platform — WhatsApp birthday bot, card studio, flipbooks, and surprise calls.",
      backstory:
        "Bímpé started as a simple WhatsApp birthday bot for group communities. The idea was straightforward: set it up once, collect birthdays with a form link, and it handles timely birthday wishes without anyone having to remember. But it grew into something much bigger. I added a card studio where you can design and download personalized cards with different templates, textures, and fonts. Then came interactive flipbooks — full storybooks with text, photos, and videos with realistic page-turn effects. The latest addition is surprise voice calls through Athena. It's currently serving 50+ WhatsApp groups across different countries and I'm still building it out.",
      technology: "TanStack Start / Bun / SQLite / Drizzle",
      github: "#",
      deployed: "https://bimpe.xyz",
    },
    {
      title: "Hangman Game",
      thumbnail: hangman,
      description:
        "A word web game, you are to guess a word letter by letter which you are given 7 tries for each word",
      backstory:
        "This was one of my earliest projects. I wanted to build something fun to practice vanilla JavaScript and DOM manipulation. The game picks a random word and you have to guess it letter by letter with only 7 tries. Simple concept, but it taught me a lot about state management before I even knew what state management was.",
      technology: "VanillaJs / Tailwind",
      github: "#",
      deployed: "https://hangman-game-sooty.vercel.app/",
    },
    {
      title: "React Grabster",
      thumbnail: reactgrabstar,
      description: "A landing page clone of the react grabstar website",
      backstory:
        "A pixel-perfect clone I built to sharpen my React and CSS skills. The original site had some interesting layout patterns that challenged me to think about responsive design differently.",
      technology: "ReactJS / Tailwind",
      github: "https://github.com/drimescodes/react-grabstar",
      deployed: "https://react-grabstar.vercel.app/",
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
      <section className="max-w-screen-xl m-auto md:px-8 py-14 min-h-screen overflow-hidden">
        <motion.div
          className="w-full grid md:grid-cols-2 gap-8"
          variants={animateProject}
          initial="hidden"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              className="relative rounded-lg overflow-hidden h-[350px] flex flex-col"
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
                <h3 className="mb-2 font-semibold text-[#54d5bb] text-xl">
                  {project.title}
                </h3>

                <p className="text-white text-sm tracking-tight leading-snug font-medium mb-3 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <span className="text-[#54d5bb] text-xs font-semibold">
                    {project.technology}
                  </span>

                  <div className="flex space-x-4 items-center">
                    {/* Read more icon */}
                    {project.backstory && (
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="text-gray-300 hover:text-[#54d5bb] transition-colors"
                        aria-label="Read more about this project"
                      >
                        <IoBookOutline className="text-2xl" />
                      </button>
                    )}

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

      {/* Project detail modal / bottom sheet */}
      <ProjectDetail
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};

export default Projects;
