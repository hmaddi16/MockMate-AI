/** 
 * Description:
 * Displays a header section for a selected job role including metadata like experience,
 * question count, focus topics, and last updated date. 
 * 
 * Props:
 * - role: The job title (string)
 * - topicsToFocus: Key areas to prepare for this role (string)
 * - experience: Number of years of experience required (number)
 * - questions: Total number of Q&A available for this role (number)
 * - description: (optional) Additional text for the role (string)
 * - lastUpdated: Last updated timestamp or date string (string)
 */


import React from "react";

const RoleInfoHeader = ({
    role,
    topicsToFocus,
    experience, 
    questions,
    description,
    lastUpdated,
}) => {
    return (
        <div className="bg-white relative">
            {/* Main content container */}
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
                <div className="h-[200px] flex flex-col justify-center relative z-10">
                    {/* Role and focus area */}
                    <div className="flex items-start">
                        <div className="flex-grow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-2xl font-medium">{role}</h2>
                                    <p className="text-sm text-edmium text-gray-900 mt-1">
                                        {topicsToFocus}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tags: Experience | Q&A | Last Updated */}
                    <div className="flex items-center gap-3 mt-4">
                        <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
                            Experience: {experience} {experience == 1 ? "Year": "Years"}
                        </div>

                        <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
                            {questions} Q&A
                        </div>


                        <div className="text-[10px] font-semibold text-white bg-black px-3 py-1 rounded-full">
                            Last Updated: {lastUpdated}
                        </div>
                    </div>
                </div>
            </div>

            {/* Blurred background shapes */}
            <div className="w-[40vw] md:w-[30vw] h-[200px] flex items-center justify-center bg-white overflow-hidden absolute top-0 right-0">
                <div className="w-16 h-16 bg-lime-400 blur-[65px] animate-blob1"></div>
                <div className="w-16 h-16 bg-teal-400 blur-[65px] animate-blob2"></div>
                <div className="w-16 h-16 bg-cyan-300 blur-[65px] animate-blob3"></div>
                <div className="w-16 h-16 bg-fuchsia-200 blur-[65px] animate-blob1"></div>
            </div>
        </div>
    )
};

export default RoleInfoHeader;