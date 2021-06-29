import React, {useEffect, useState} from 'react';
import { ListGroup } from 'react-bootstrap';
import service from '../../service/service';
import axios from 'axios';
/*
    @return data from auth route
*/
const requestPermissionAfterAccessTokenExpired = async () => {
     const refreshToken = localStorage.getItem("refreshToken");
     const responseToken = await service.getAccessToken(refreshToken);
     const newToken = responseToken?.data?.accessToken;
     if(newToken){
          localStorage.setItem("accessToken", newToken);
         return newToken
     }
     return false

}


const YourHome = () => {
    let accessToken = localStorage.getItem("accessToken");

    useEffect(async () => {
        if(accessToken){
              let response = await service.fetchRoute(accessToken);
              localStorage.removeItem('accessToken');
        }else{
            let token = await requestPermissionAfterAccessTokenExpired();
            if (token){
                let data = await service.fetchRoute(token);
          
            }
        }
    }, [])
    return(
        <div>
            {success ? <p>hello world</p> : <p>not success</p>}
          
        </div>
    )
}

export default YourHome;
