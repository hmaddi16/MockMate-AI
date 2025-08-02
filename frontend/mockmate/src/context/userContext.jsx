/**
 * Description:
 * This file defines the global user authentication context using React's Context API.
 * It provides a central place to manage the current user's session data across the app.
 * The context includes login state, user details, a loading indicator, and helper methods
 * to update or clear the user session.
 * 
 * Usage:
 * Wrap this provider around the root app in `App.jsx` to provide global auth state.
 */


import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";


// Create the UserContext object
export const UserContext = createContext();


const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // New state to track loading 

    useEffect(() => {
        if (user) return;

        // Try to get the access token from localStorage
        const accessToken = localStorage.getItem("token");
        if(!accessToken) {
            setLoading(false);
            return;
        }

        // Fetch the authenticated user's profile using the stored token
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
                setUser(response.data);
            }
            catch (error) {
                console.error("User not authenticated", error);
                clearUser();
            }
            finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);


    /**
     * updateUser
     * Called after signup/login to store user data and save token to localStorage.
     */
    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem("token", userData.token); // Save token
        setLoading(false);
    };


    /**
     * clearUser
     * Logs the user out by removing the token and clearing the user state.
     */

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        // Provide user data and helper methods to the rest of the application
        <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;