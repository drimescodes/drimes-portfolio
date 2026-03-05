import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiFillGithub } from "react-icons/ai";
import { FiExternalLink } from "react-icons/fi";
import { IoBookOutline } from "react-icons/io5";
import projects from "../constants/projects";
import ProjectDetail from "../components/ProjectDetail";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

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
                    {project.overview && (
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
