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
        className=" text-3xl mt-16 sm:mt-24 py-2 text-gray-500 font-medium text-center "
      >
        <h2>Projects</h2>
      </section>
      <section className=" max-w-screen-xl m-auto md:px-8 py-14 ">
        <motion.div
          className="w-full grid md:grid-cols-2 gap-8"
          variants={animateProject}
          initial="hidden"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <a href={project.deployed} target="_blank">
              <motion.div
                key={project.title}
                className=" relative group"
                variants={animateProjectItem}
                viewport={{ once: true }}
              >
                {/* modifyiong */}
                <div
                  className="relative overflow-hidden rounded-lg bg-cover bg-no-repeat text-center opacity-90 hover:opacity-100 transition-all shadow-lg dark:shadow-gray-900"
                  style={{
                    backgroundImage: `url(${project.thumbnail})`,
                    height: "300px",
                  }}
                >
                  <div
                    className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-fixed transition-all duration-700 lg:opacity-0 opacity-80 bg-gradient-to-t from-[#222222] via-slate-600 to-opacity-30 lg:group-hover:opacity-80 px-4"
                    // style={{backgroundColor: 'rgba(0, 0, 0, 0.6)'}}
                  >
                    <div className="  flex h-full items-center justify-center ">
                      <div className="text-white ">
                        <h3 className="mb-2 font-semibold text-sky-200 text-2xl uppercase drop-shadow-md tracking-tighter">
                          {project.title}
                        </h3>
                        <p className="text-white text-sm tracking-tight leading-snug drop-shadow-md font-semibold">
                          {project.description}
                        </p>
                        <p className="text-sky-200 text-sm font-semibold py-4">
                          {project.technology}
                        </p>
                        <div className="hidden lg:flex flex-row justify-center align-center text-center text-5xl text-gray-900">
                          <a
                            href={project.github}
                            target="_blank"
                            className="mr-10 "
                          >
                            <AiFillGithub />
                          </a>
                          <a
                            href={project.deployed}
                            target="_blank"
                            className=""
                          >
                            <FiExternalLink />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </a>
          ))}
        </motion.div>
      </section>
    </>
  );
};

export default Projects;
