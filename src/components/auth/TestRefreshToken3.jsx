/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://itnext.io/create-custom-fetch-hook-for-multiple-axios-instances-661a73701f73

//import axios from "axios";
import React from "react";
import useAxiosTokenAPI from "../hook/useAxiosTokenAPI";
//import { parseJwt } from "../../lib/helper.mjs";
//import { useAuth } from "./AuthProvider";

export default function TestRefreshToken2(){

  //const {
    //axiosJWT
  //} = useAuth();

  const [axiosJWT, isLoading] = useAxiosTokenAPI();

  function clickRefreshTest(){
    //console.log(token)
    //console.log(axiosJWT)
    axiosJWT.instance.get('/refreshtest').then(function (response) {
      //console.log(response);
      if((response.status==200)&&(response.statusText=="OK")){
        console.log(response.data)
      }
    })
    .catch(function (error) {
      console.log(error.message);
    });
  }
  return  <>
    <button onClick={clickRefreshTest}> Test Refresh Token 3 </button>
  </>
}