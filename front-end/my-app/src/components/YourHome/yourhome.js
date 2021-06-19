import React, {useEffect, useState} from 'react';
import { ListGroup } from 'react-bootstrap';
import service from '../../service/service';

/*
    @return data from auth route
*/
const requestPermissionAfterAccessTokenExpired = async () => {
     const refreshToken = localStorage.getItem("refreshToken");
     const responseToken = await service.getAccessToken(refreshToken);
     const newToken = responseToken?.data?.accessToken;
     localStorage.setItem("accessToken", newToken);
     return await service.fetchRoute(newToken);
}


const YourHome = () => {
    let accessToken = localStorage.getItem("accessToken");
    const [success,setSuccess] = useState(false);
    const [name, setName] = useState("");
     
    useEffect(async () => {
        let response = await service.fetchRoute(accessToken);
        //if repsonse does not exist, 
        if(Object.keys(response).length === 0){
            let secondTokenResponse = await requestPermissionAfterAccessTokenExpired();
            if(secondTokenResponse?.data?.success === true){
                const name = secondTokenResponse?.data?.testData?.users?.name;
                 setSuccess(true)
                 setName(name)
            }
        }else{
             const name  = response?.data?.testData?.users?.name;
              setSuccess(true);
              setName(name);
        }
    })
    return(
        <div>
            {success ? <p>{name}</p> : <p>not success</p>}
          
        </div>
    )
}

export default YourHome;
