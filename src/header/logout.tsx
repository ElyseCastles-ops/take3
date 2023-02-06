import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signoutUser } from "../firebaseConfig";

const Logout = () => {
    const navigate = useNavigate();

    const {user} = useAuth();

    const handleLogout = () => {
        signoutUser()
        navigate("/")
    }

    return (
        <>
            {user && 
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            }
        </>
            
        
    )
}

export default Logout