import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Box from "../pages/boxes/box";
import { loadAllBoxes } from "../pages/boxes/boxActions";
import Logout from "./logout";


const Header = () => {

    let navigate = useNavigate();
    let dispatch = useDispatch();

    const {searchCard} = useAuth();

    // const user = useSelector((state: RootState) => state.userManagement.user);
    const [searchTerm, setSearchTerm] = useState("")

    const {user} = useAuth();
    const handleGoHome = () => {
        //getBoxes(dispatch)
        navigate("/")
    }

    const routeChange = () => {
        //dispatch(goToLoginPage())
        navigate("/login")  
    }

    const handleSubmit = async (event: any) => {
        console.log("EVENT", event)
        //event.stopPropagation();
        searchCard(searchTerm)
        // .then((boxList: Box[]) => {
        //     dispatch(loadAllBoxes(boxList))
        // })
        // .then(() => {
        //     navigate("/search")
        // })
        
    }

    return (
        <div className="header">
            <div className="mb-d-flex mb-flex-row mb-justify-between mb-align-items-center navbar">
                <div className="mb-d-flex">
                {/* <img className="mb-nav-item-left" src={logo} style={{width: "50px"}} alt="logo" /> */}
                <div id="header-title" onClick={handleGoHome}>
                    <p>Magic Box</p>
                </div>
                </div>
                

                <div className="mb-d-flex mb-flex-row mb-align-items-center">

                    { user && 
                        <div className="search-container">
                            <form className="mb-d-flex" onSubmit={event => {event.preventDefault(); handleSubmit(event);}}>
                                <input className="search expandright" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} id="searchright" type="search" name="q" placeholder="Search" />
                                <label className="button searchbutton mb-d-flex" htmlFor="searchright">
                                    <span className="mglass">&#9906;</span>
                                    </label>
                                
                            </form>
                        </div>
                    }



                    
                    <div className="nav-user-management">
                        <Logout />
                        {!user && <button className="login-signup-button" onClick={routeChange}>Login/Sign up</button>}
                    </div>
                
                </div>
                
                
            </div>
            
            
        </div>
    )
}

export default Header;