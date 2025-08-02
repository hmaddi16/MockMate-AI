/**
 * Description:
 * A Sticky top navigation bar for the app that displays the project title and the user's profile information.
 */

import React from 'react';
import { Link } from "react-router-dom";
import ProfileInfoCard from '../Cards/ProfileInfoCard';

const Navbar = () => {
    return (
        // Sticky top nav with subtle blur and border
        <div className='h-16 bg-white border border-gray-200/50 backdrop-blur-[2px] py-2.5 px-4 md:px-8 sticky top-0 z-30'>
            <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
                
                {/* App Title - clicking it returns to Dashboard */}
                <Link to="/dashboard">
                    <h2 className='text-lg md:text-xl font-bold text-black leading-5'>
                        Interview Prep AI
                    </h2>
                </Link>

                {/* Profile Card Section */}
                <ProfileInfoCard />
            </div>
        </div>
    );
};

export default Navbar;