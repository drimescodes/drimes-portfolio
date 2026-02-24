import React from "react";
import { drimes1 } from "../assets";
import { NowPlayingYTM, VersionHistory } from "../components";
import { Link } from "react-router-dom";

const Introduction = () => {
  return (
    <div
      id="about"
      className="flex justify-center min-h-screen items-center md:px-4 mt-16 sm:mt-24"
    >
      <div className="container mx-auto max-w-screen-lg">
        <div className="flex flex-col md:flex-row justify-center">
          <div className="md:w-2/3 mx-6">
            <h2 className=" text-gray-400 font-bold text-2xl">About Me</h2>

            <p className="text-[#cacaca] mt-4 text-[16px] leading-6">
              I'm Olamide, also known as Drimes. I'm a
              software engineer currently in my 4th year studying Computer
              Engineering. I build mobile apps, web
              platforms, APIs, browser extensions, and pretty much anything that
              needs to exist.
            </p>
            <p className="text-[#cacaca] mt-4 mb-8 text-[16px] leading-6">
              I've been building and shipping for a few years now, across
              mobile, web, and everything in between. I'm always picking up
              whatever tool the problem needs and figuring it out. The full
              origin story is on{" "}
              <a
                href="https://drimes-portfolio.vercel.app/v1/aboutme"
                target="_blank"
                className="text-[#54d5bb] hover:underline"
              >
                v1 of this portfolio
              </a>
              .
            </p>
            <p className="text-[#cacaca] mt-4 mb-8 text-[16px] leading-6">
              Outside of code, music is a huge part of my life. I spend a considerable amount of
              time on{" "}
              <a
                href="https://genius.com/"
                target="_blank"
                className="text-[#54d5bb]"
              >
                Genius
              </a>{" "}
              reading annotations and I plan on making beats someday. I'm also
              into animated movies and hope to make one or at least a comic one
              day. Sometimes I{" "}
              <Link to="/thoughts" className="text-[#54d5bb] hover:underline">
                write down my thoughts
              </Link>
              .
            </p>
            <p className="text-[#cacaca] mb-4">
              You can peep what I'm listening to rn
            </p>
            <NowPlayingYTM />
            {/* Profile image - mobile only, before version history */}
            <div className="md:hidden flex justify-center mt-8">
              <img
                loading="lazy"
                src={drimes1}
                className="w-60 h-60 rounded-lg object-cover"
                alt="profileImage"
              />
            </div>
            <VersionHistory />
          </div>
          <div className="hidden md:flex md:w-1/3 justify-center md:justify-start mt-5">
            <img
              loading="lazy"
              src={drimes1}
              className="w-60 h-60 mt-10 rounded-lg object-cover"
              alt="profileImage"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
