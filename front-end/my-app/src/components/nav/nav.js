import React from 'react';
import './nav.css';
import { useHistory, Link } from "react-router-dom";
const NavBar = () => {
    let refreshToken =  localStorage.getItem("refreshToken") || "";

    const handleLogout = () => {
        localStorage.clear();
    }
    return (
        <nav id="nav-bar">
          
            <h1>Logo</h1>
            
            <div>
             <a href="#">Hello select your address </a>
            </div>
           
            <div id="search-box">
               <label>All</label>
               <input type="search" />
               <button>Search</button>
            </div>
            {refreshToken ?
            <Link onClick={handleLogout}>logout</Link> :
            <Link to="/login">Login</Link> 
            }
           
            <div>
                 <Link to="/register">Sign up</Link>
            </div>
            <div>
                <a href="#">Return </a>
            </div>
              
            <div>
                <a href="#">Cart</a>
            </div>
            

        </nav>
    )
}

export default NavBar;
