/*
  LICENSE: MIT
  Created by: Lightnet
*/

import axios from "axios";
import React from "react";
import { parseJwt } from "../../lib/helper.mjs";
import { useAuth } from "./AuthProvider";

export default function TestDeleteRefreshToken(){
  const {
      token
    , setToken
    , expire
    , setExpire
  } = useAuth();

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(async (config) => {
    const currentDate = new Date();
    if (expire * 1000 < currentDate.getTime()) {
      const response = await axios.get('/token');
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
      const decoded = parseJwt(response.data.accessToken);
      //setName(decoded.name);
      setExpire(decoded.exp);
    }else{
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
      return Promise.reject(error);
  });

  async function clickRefreshTest(){
    const response = await axiosJWT.delete('/refreshdelete', {
      headers: {
        "Content-Type": "application/json"
      },
      data:{
        test:"text"
      }
    }).then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return  <>
    <button onClick={clickRefreshTest}> Test Refresh Token Delete </button>
  </>
}