import React, { useState, useContext }  from 'react';
import { Route, Redirect } from "react-router-dom";
import service from './service/service';
import Cookies from 'js-cookie'

const hasToken = async () => {
  let accessToken = localStorage.getItem("accessToken") || "";

  let refreshToken =  localStorage.getItem("refreshToken") || "";
 
  if(accessToken === null || accessToken === undefined){
      if(refreshToken !== null || refreshToken !== undefined){
        //make request to get new accesstoken
        let respose =  await service.getAccessToken(refreshToken);
      }
  }
  return refreshToken;
}

export const ProtectedRoute =  ({
  component: Component,
  ...rest
}) => {
  let token = hasToken();
  console.log(token);
  return (
    <Route
      {...rest}
      render={props => {
        if (token !== null || token !== undefined) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to="/"
            />
          );
        }
      }}
    />
  );
};



