/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://stackoverflow.com/questions/59335963/react-hooks-display-global-spinner-using-axios-interceptor

import axios from "axios";
import { useEffect, useState } from "react";
import { parseJwt } from "../../lib/helper.mjs";
import { useAuth } from "../auth/AuthProvider";

export default function useAxiosTokenAPI(){
  //const [tokenJWT, setTokenJWT] = useState();//can't use as return promise
  const [tokenJWT, setTokenJWT] = useState({instance:null});
  const [isLoading, setIsLoading] = useState(true);
  const { 
    API_URL,
    token, setToken,
    expire, setExpire,
    setStatus
  } = useAuth();

  //const instance = axios.create() // not here else when user typing it create same variable
  function createInstance(){
    //console.log("axios creating...")
    const instance = axios.create({
      baseURL: API_URL
      //baseURL: "http://localhost:3000"
      , headers: {
        //'X-Custom-Header': 'foobar'
        "Content-Type": "application/json"
      }
    });
    return instance
  }

  // create config for request check
  async function config(config){
    const currentDate = new Date();
    //console.log(expire)
    if (expire * 1000 < currentDate.getTime()) {
      //console.log("get update?")
      const response = await axios.get('/token');
      if(response.data.error){
        //console.log("NOT LOGIN");
        setStatus('unauth');
        return config;
      }
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
      const decoded = parseJwt(response.data.accessToken);
      //setName(decoded.name);
      setExpire(decoded.exp);
    }else{
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }

  //create error event
  function ErrorPromise(error){
    return Promise.reject(error);
  }

  //init instance
  useEffect(()=>{
    setTokenJWT({instance:createInstance()})
  },[])

  //watch variable, init interceptors and clean up
  useEffect(()=>{
    //console.log(instance);
    if(tokenJWT.instance!=null){
      const configInterceptor=tokenJWT.instance.interceptors.request.use(config, ErrorPromise);
      //console.log(configInterceptor);
      setIsLoading(false);
      return ()=>{
        //console.log("clean up");
        tokenJWT.instance?.interceptors.request.eject(configInterceptor);
        setIsLoading(false);
      }
    }else{
      setIsLoading(true);
    }
  },[tokenJWT.instance,token,expire]);//listen to three variables

  return [tokenJWT,isLoading];
}

/*
// usage

const [axiosJWT, isLoading] = useAxiosTokenAPI();
useEffect(()=>{
  console.log("axiosJWT init...");
  console.log("isLoading: ", isLoading)
  if((typeof axiosJWT?.instance=="function")&&(isLoading == false)){
    console.log("GETTING...: ")
    getPost();
  }
},[axiosJWT,isLoading])
*/