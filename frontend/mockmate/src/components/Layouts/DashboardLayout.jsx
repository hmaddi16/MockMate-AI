/**
 * Description:
 * Shared layout component used across the authenticated dashboard pages.
 * Includes the Navbar at the top and wraps child components within a container.
 */


import React, { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import Navbar from "./Navbar";


const DashboardLayout = ({ children }) => {
    const { user } = useContext(UserContext);
    return (
        <div>
            {/* Fixed Navbar at the top */}
            <Navbar />

            {/* Render main page content only if user is authenticated */}
            {user && (
            <div className="w-full">
                {children}
            </div>
            )}
        </div>
    );
};

export default DashboardLayout;