import React from 'react';
import './nav.css';

const NavBar = () => {
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

            <div id="list-of-country">list of country</div>
            <div>
                 <a href="#">Sigin</a>
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
