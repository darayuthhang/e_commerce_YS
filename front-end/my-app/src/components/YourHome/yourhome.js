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
          console.log(newToken);
         return newToken
     }
     return false
    //  return await service.fetchRoute(newToken);
}


const YourHome = () => {
    let accessToken = localStorage.getItem("accessToken");

    const [success,setSuccess] = useState(null);

    // axios.interceptors.response.use(response => {
    //         return response;
    //     }, err => {
    //         return new Promise((resolve, reject) => {
    //             const originalReq = err.config;
    //             if ( err.response.status === 401 && err.config && !err.config.__isRetryRequest )
    //             {
    //                 originalReq._retry = true;

    //                 let res = fetch("http://localhost:3001/token", {
    //                     method: 'POST',
    //                     mode: 'cors',
    //                     cache: 'no-cache',
    //                     credentials: 'same-origin',
    //                     headers: {
    //                         'Content-Type': 'application/json',
    //                         'Device': 'device',
    //                         'Token': localStorage.getItem("token")
    //                     },
    //                     redirect: 'follow',
    //                     referrer: 'no-referrer',
    //                     body: JSON.stringify({
    //                         token: localStorage.getItem("token"),
    //                         refresh_token: localStorage.getItem("refresh_token")
    //                     }),
    //                 }).then(res => res.json()).then(res => {
    //                     console.log(res);
    //                     this.setSession({token: res.token, refresh_token: res.refresh});
    //                     originalReq.headers['token'] = res.token;
    //                     originalReq.headers['Device'] = "device";


    //                     return axios(originalReq);
    //                 });


    //                 resolve(res);
    //             }


    //             return Promise.reject(err);
    //         });
    //     });
    //wrong because response return {}
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
