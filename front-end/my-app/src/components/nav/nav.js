import React, {useState} from 'react';
import './nav.css';
import { useHistory, Link } from "react-router-dom";
import service from '../../service/service';


import {useDispatch, useSelector} from 'react-redux';
import { Sigin } from '../../redux/action/siginAction';
     
const NavBar = () => {
    let refreshToken =  localStorage.getItem("refreshToken") || "";
    const [route, setRoute] = useState(false);
    const handleLogout = async () => {
        console.log(refreshToken);
        let response = await service.fetchLogoutRoute(refreshToken);
        if(response?.status === 200){
            localStorage.clear();
            setRoute(true)
        }
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
