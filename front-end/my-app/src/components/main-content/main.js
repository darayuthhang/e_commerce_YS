import React from 'react';
import './main.css';

const MainContent = () => {
    const testImage = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80";

    return(
        <div className="wrapper">
            Main content
            <div className="grid-image-wrapper">
                <div className="container">
                    <h1>Gift</h1>
                    <img src={testImage}/>
                </div>
                <div  className="container">
                    <h1>Customer most love</h1>
                   <img src={testImage}/>
                </div>
                <div  className="container">
                    <h1>Prime Day</h1>
                    <img src={testImage}/>               
             </div>
               <div  className="container">
                   <h1>Book</h1> 
                <img src={testImage}/>                     
                 </div>
            </div>

         </div>
    )
    
}
export default MainContent;
