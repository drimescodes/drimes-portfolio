import React from "react";
import { Link } from "react-router-dom";
import { drimes_avatar } from "../assets";

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 pt-24">
            <img
                src={drimes_avatar}
                alt="Drimes"
                className="w-24 h-24 rounded-full object-cover mb-6 opacity-80"
                
            />
            <h1 className="text-[#cacaca] text-6xl font-bold">404</h1>
            <p className="text-[#8892b0] mt-3 text-lg">
                This page doesn't exist. Maybe it will someday.
            </p>
            <Link
                to="/"
                className="mt-8 text-[#54d5bb] hover:underline text-sm"
            >
                ← Back home
            </Link>
        </div>
    );
};

export default NotFound;
