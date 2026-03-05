import React from "react";
import { versions } from "../constants/versions";

const VersionHistory = () => {
    return (
        <div className="mt-10">
            <h3 className="text-gray-400 font-bold text-xl mb-2">Version History</h3>
            <p className="text-[#8892b0] text-sm mb-4">Past versions of this portfolio, preserved for the memories and an indicator of growth.</p>
            <div className="flex flex-col gap-3">
                {versions.map((v) => (
                    <a
                        key={v.version}
                        href={v.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#cacaca] hover:text-[#54d5bb] transition-colors duration-300 flex items-center gap-2 group"
                    >
                        <span className="font-mono text-sm border border-gray-600 rounded px-2 py-1 group-hover:border-[#54d5bb]">
                            v{v.version}
                        </span>
                        <span className="text-sm">View Version {v.version}</span>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default VersionHistory;
