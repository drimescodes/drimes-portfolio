import React from "react";
import { drimes1 } from "../assets";

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
              Hello! My name is Bamigbola Olamide Dickson, but you can call me
              Drimes. I'm a passionate programmer who finds joy in bringing
              applications to life. My coding journey began in high school when
              a mentor introduced me to the endless possibilities of
              programming. Armed with a little laptop, I started with HTML,
              creating small sites and exploring the world of codes. Life took
              me away from programming for a while as I moved to process my
              college admission. Despite a brief hiatus, I almost made a
              comeback during the COVID lockdown, but my aging laptop couldn't
              keep up. Fast forward to another 8-month long hiatus from
              academics caused by an ASUU strike, I found myself with time on my
              hands. Bored and with nothing to do, I recalled my coding days and
              picked it up again, initially on my phone. After two months of
              mobile learning, I saved up and invested in a new laptop,
              reigniting my journey into the fascinating world of programming
              with the support of friends.
            </p>
            <p className="text-[#cacaca]  mt-4 mb-8 text-[16px] leading-6">
              I am eager to refine and expand my skills through collaborative
              development experiences. Seeking an environment that not only
              introduces me to industry standards and tools but also fosters
              personal growth, I promise to dedicate my utmost effort.
            </p>
            <p className="text-[#cacaca]  mt-4 mb-8 text-[16px] leading-6">
              Beyond coding, I am passionate about table tennis, animated
              movies, music, and video games. After a lengthy coding session, I
              find solace in visiting the{" "}
              <a
                href="https://genius.com/"
                target="_blank"
                className="text-[#54d5bb]"
              >
                Genius
              </a>{" "}
              website, where I immerse myself in the annotations of rap lyrics I
              aim to learn more about. It serves as a refreshing way to clear my
              mind.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center md:justify-start mt-5">
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
