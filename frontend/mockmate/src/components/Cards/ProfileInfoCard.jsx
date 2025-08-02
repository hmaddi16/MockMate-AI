/**
 * Description:
 * A display card for logged in users with the default picture. 
 */


import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import profileAvatar from '../../assets/profilePicture.jpg'

const ProfileInfoCard = () => {
    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/");
    };

    return (
        user && (
            <div className="flex items-center">
                {/* Profile Picture */}
                <img
                    src={profileAvatar}
                    alt="Profile picture of user"
                    className="w-11 h-11 bg-gray-300 rounded-full mr-3"    
                />

                {/* Profile Name */}
                <div>
                    <div className="text-[15px] text-black font-bold leading-3">
                        {user.name || ""}
                    </div>
                    <button 
                    className="text-amber-600 text-sm font-semibold cursor-pointer hover:underline"
                    onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        )
    )
}

export default ProfileInfoCard;