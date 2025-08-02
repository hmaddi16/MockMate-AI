/**
 * Description:
 * This component serves as the main landing page for the application.
 * It introduces users to the platform and features.
 */


import React, { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../context/userContext.jsx";
import Modal from "../components/Modal.jsx";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard.jsx";
import Login from "./Auth/Login.jsx";
import SignUp from "./Auth/SignUp.jsx";
import {APP_FEATURES} from "../utils/data";
import { ROLES } from "../utils/data";
import HERO_IMG from "../assets/hero-img.jpg";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { LuSparkles, LuMoon, LuSun } from 'react-icons/lu';



const LandingPage = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [openAuthModal, setOpenAuthModal] = useState(false);
    const [currentPage, setCurrentPage] = useState("login");
    
    const [index, setIndex] = useState(0); 
    const current = ROLES[index];

    const [isDark, setIsDark] = useState(() =>
        document.documentElement.classList.contains("dark")
    );

    // Handle CTA (Get Started Button)
    const handleCTA = () => {
        if (!user) {
            setCurrentPage("signup");
            setOpenAuthModal(true);
        }
        else {
            navigate("/dashboard");
        }
    };

    // Toggle dark mode on <html> element
    const toggleDarkMode = () => {
        document.documentElement.classList.toggle("dark");
        setIsDark(!isDark);
    };

    // Role Carosuel Items
    const next = () => setIndex((index + 1) % ROLES.length);
    const prev = () => setIndex((index - 1 + ROLES.length) % ROLES.length);


    
    return (
        <>
            {/* Part 1- Main LandingPage */}
            <div className="w-full min-h-full bg-[#FFFCEF]">
                {/* Background Blur */}
                <div className="w-[500px] h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0"/>

                {/* Hero Content */}
                <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 pt-6 pb-[200px] relative z-10">
                    {/* Header */}
                    <header className="flex justify-between items-center mb-16">
                        <div className="text-xl text-black font-bold">
                            MockMate.
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Dark Mode Toggle */}
                            <button
                                onClick={toggleDarkMode}
                                className={`w-11 h-11 flex items-center justify-center rounded-full border border-white transition-all duration-300 ease-in-out cursor-pointer 
                                    hover:bg-black hover:text-white hover:rotate-180 ${
                                    isDark
                                        ? "bg-zinc-800 text-white/80"
                                        : "bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-white"
                                    }`}
                                title="Toggle Dark Mode"
                                >
                                {isDark ? (
                                    <LuMoon size={20} />
                                ) : (
                                    <LuSun size={20} />
                                )}
                            </button>

                            {/* Log In Button */}
                            {user ? (
                                <ProfileInfoCard/>
                            ) : (
                                <button
                                    onClick={() => setOpenAuthModal(true)}
                                    className="relative text-sm font-semibold text-white px-7 py-2.5 rounded-full border border-white cursor-pointer
                                                bg-gradient-to-r from-[#FF9324] to-[#e99a4b]
                                                hover:bg-black hover:from-black hover:to-black transition-all duration-300 ease-in-out"
                                >
                                    Log In
                                </button>
                            )}
                        </div>
                    </header>

                    {/* Text, Description */}
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="w-full md:w-1/2 pr-4 mb-8 md:mb-0">
                            <div className="flex items-center justify-left mb-2">
                                <div className="flex items-center gap-2 text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                                <LuSparkles/>    Google Gemini
                                </div>
                            </div>

                            <h1 className="text-5xl text-black font-medium mb-6 leading-tight">
                                Interview Prep with <br/> 
                                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold]">AI-Powered</span> {" "}
                                Learning
                            </h1>        
                        </div>

                        <div className="w-full md:w-1/2">
                            <p className="text-[17px] text-gray-900 mr-0 md:mr-20 mb-6">
                                Get role-specific questions, expand answers when you need them, 
                                dive deeper into concepts, and organize your way. 
                                From preparation to mastery - your ultimate interview toolkit is
                                here!
                            </p>

                            <button
                                className="bg-black text-sm text-white font-semibold px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer"
                                onClick={handleCTA}
                            >
                                Get Started 
                            </button>    
                        </div>
                    </div>
                </div>
            </div>

            {/* Containter for Remaining Page */}
            <div className="w-full min-h-full relative z-10">
                {/* Part 2- Image */}
                <div>
                    <section className="flex items-center justify-center -mt-36">
                        <img
                            src={HERO_IMG}
                            alt="Hero Image"
                            className="w-[78vw] rounded-lg"
                        />
                    </section>
                </div>

                {/* Part 3- Features Cards */}
                <div className="w-full min-h-full bg-[#FFFCEF] mt-10">
                    <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 pt-14 pb-20">
                        <section className="mt-12">
                            <h2 className="text-3xl font-bold text-center mb-12">Features That Make You Shine.</h2>

                            <div className="flex flex-col items-center gap-8">
                                {/* Place Cards Row 1 */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                                    {APP_FEATURES.slice(0, 3).map((feature) => (
                                        <div 
                                            key={feature.id}
                                            className="bg-[#FFFEF8] p-5 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition-transform duration-300 transform hover:-translate-y-2 border border-amber-100"
                                        >
                                            <h3 className="text-base font-semibold mb-3">{feature.title}</h3>
                                            <p className="text-gray-600">{feature.description}</p>
                                    </div>
                                    ))}  
                                </div>

                                {/* Place Cards Row 2 */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {APP_FEATURES.slice(3).map((feature) => (
                                        <div 
                                            key={feature.id}
                                            className="bg-[#FFFEF8] p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition-transform duration-300 transform hover:-translate-y-2 border border-amber-100"
                                        >
                                            <h3 className="text-base font-semibold mb-3">{feature.title}</h3>
                                            <p className="text-gray-600">{feature.description}</p>
                                    </div>
                                    ))}  
                                </div>
                            </div>
                        </section>
                    </div>
                </div>

                {/* Part 4- Roles Caroseul */}
                <section className="w-full bg-[#FFFCEF] py-14 px-12">
                    {/* Section Header */}
                    <h2 className="text-3xl font-bold text-center mb-8">Learn for the Leading Roles.</h2>

                    {/* Role Card */}
                    <div className="relative bg-[#FFFEF8] text-black px-6 py-10 rounded-xl shadow-lg mx-auto w-full sm:w-[90%] md:w-[80%] border-b-[6px] border-yellow-400">
                        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">

                            {/* Left Side – Tags and Salary */}
                            <div className="md:w-1/2 w-full text-center md:text-left pl-16">
                                <h3 className="text-xl font-semibold mb-3">{current.title}</h3>

                                {/* Tech Tags */}
                                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-3">
                                    {current.tools.map((tool, i) => (
                                    <span
                                        key={i}
                                        className="bg-amber-100 text-amber-800 px-3 py-1 text-sm rounded-full"
                                    >
                                        {tool}
                                    </span>
                                    ))}
                                </div>

                                {/* Salary Fact */}
                                <p className="text-xs text-gray-500">{current.fact}</p>
                            </div>

                            {/* Right Side – Description */}
                            <div className="md:w-1/2 w-full text-gray-700 text-md text-center md:text-left pl-10 pr-16">
                                <p>{current.description}</p>
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            onClick={prev}
                            className="absolute top-1/2 left-[-36px] -translate-y-1/2 text-indigo-300 hover:text-indigo-500"
                        >
                            <FaChevronLeft size={25} />
                        </button>
                        <button
                            onClick={next}
                            className="absolute top-1/2 right-[-36px] -translate-y-1/2 text-indigo-300 hover:text-indigo-500"
                        >
                            <FaChevronRight size={25} />
                        </button>
                    </div>
                </section>


                {/* Part 5- Goodluck Closing */}
                <section className="w-full bg-[#FFFCEF] py-24">
                    <div className="max-w-7xl mx-auto px-12 text-center">
                        
                        {/* Section Heading */}
                        <h2 className="text-3xl font-bold mb-6">You've Got This!</h2>

                        {/* Encouraging Message */}
                        <p className="text-gray-700 text-md mb-12 px-22">
                        Remember — these tools are here to support you, but real preparation comes from consistent effort and confidence. 
                        Your journey is unique to you, and there's no one-size-fits-all. Explore freely and don’t forget to take breaks!
                        </p>

                        {/* Resource Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-left">
                        {[
                            { name: "LeetCode", url: "https://leetcode.com", desc: "Practice technical coding questions" },
                            { name: "freeCodeCamp", url: "https://www.freecodecamp.org", desc: "Learn to code for free with hands-on projects" },
                            { name: "Geeks for Geeks", url: "https://www.geeksforgeeks.org", desc: "Computer science concepts and tutorials" },
                            { name: "HackerRank", url: "https://www.hackerrank.com", desc: "Coding challenges and competitions" },
                            { name: "Neetcode", url: "https://neetcode.io", desc: "Systematic interview prep with curated questions" },
                            { name: "Udemy", url: "https://www.udemy.com", desc: "Online courses on programming & tech skills" },
                            { name: "Coursera", url: "https://www.coursera.org", desc: "University-level courses and certifications" },
                            { name: "CodeSignal", url: "https://codesignal.com", desc: "Assessment platform for coding skills" },
                        ].map((res, idx) => (
                            <a
                            key={idx}
                            href={res.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#FFFEF8] border border-amber-200 p-4 rounded-lg hover:shadow-lg shadow-amber-100 transition-transform duration-300 transform hover:-translate-y-2"
                            >
                            <h3 className="text-lg font-semibold mb-1">{res.name}</h3>
                            <p className="text-sm text-gray-600">{res.desc}</p>
                            </a>
                        ))}
                        </div>

                        {/* Closing Note */}
                        <p className="text-sm text-gray-500 mt-10 italic">
                        These are just a few suggestions — your journey might involve many more paths and platforms. Explore, adapt, and keep growing. 🌱
                        </p>
                    </div>
                </section>
            </div>


            {/* Part 6 */}
            <footer className="bg-[linear-gradient(to_right,rgba(255,147,36,0.7),rgba(233,154,75,0.7))] text-white py-10">
                <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 text-center">
                    <p className="text-sm mb-1">© 2025 MockMate. All rights reserved.</p>
                    <p className="text-xs">Made with ❤️ by <span className="font-semibold">Your Tech Friend</span></p>
                </div>
            </footer>

            
            {/* Setting Up Page Routes */}
            <Modal
                isOpen={openAuthModal}
                onClose={() => {
                    setOpenAuthModal(false);
                    setCurrentPage("login");
                }}
                hideHeader
            >
                <div>
                    {currentPage === "login" && (
                        <Login setCurrentPage={setCurrentPage}/>
                    )}
                    {currentPage === "signup" && (
                        <SignUp setCurrentPage={setCurrentPage}/>
                    )}
                </div>
            </Modal>
        </>
    )
}

export default LandingPage;