import React, { useState, useContext }  from 'react';
import { Route, Redirect } from "react-router-dom";
import service from './service/service';
import Cookies from 'js-cookie'




 

 

export const ProtectedRoute =  ({
  component: Component,
  ...rest
}) => {
   let refreshToken =  localStorage.getItem("refreshToken") || "";
  return (
    <Route
      {...rest}
      render={props => {
        if (refreshToken !== null || refreshToken !== undefined) {
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



