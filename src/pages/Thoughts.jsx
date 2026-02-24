import React from "react";
import { Link } from "react-router-dom";
import thoughts from "../constants/thoughts";

const Thoughts = () => {
    return (
        <div className="flex justify-center min-h-screen md:px-4 mt-16 sm:mt-24">
            <div className="container mx-auto max-w-screen-md">
                <h2 className="text-gray-400 font-bold text-2xl">Thoughts</h2>
                <p className="text-[#8892b0] mt-2 text-[15px]">
                    Things on my mind, written down.
                </p>

                {thoughts.length === 0 ? (
                    <p className="text-[#cacaca] mt-12 text-center text-lg">
                        Nothing here yet. Check back soon.
                    </p>
                ) : (
                    <div className="mt-8 space-y-6">
                        {thoughts.map((thought) => (
                            <Link
                                to={`/thoughts/${thought.slug}`}
                                key={thought.slug}
                                className="block p-5 rounded-xl bg-[#2b2b2e] hover:bg-[#333336] transition duration-300 border border-[#3a3a3d]"
                            >
                                <h3 className="text-[#cacaca] text-lg font-medium">
                                    {thought.title}
                                </h3>
                                <p className="text-[#8892b0] text-sm mt-1">{thought.date}</p>
                                <p className="text-[#8892b0] text-sm mt-2 line-clamp-2">
                                    {thought.content[0]}
                                </p>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Thoughts;
