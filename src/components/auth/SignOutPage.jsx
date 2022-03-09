/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect } from 'react';

import {
  useNavigate
} from "react-router-dom";
import { useAuth } from './AuthProvider.jsx';
import { parseJwt } from '../../lib/helper.mjs';
import axios from 'axios';
import { API } from '../../lib/API.mjs';

export function SignOutPage() {

  const {
      status
    , setStatus
    , setUser
    , token
    , setToken
    , expire
    , setExpire
  } = useAuth();
  const navigate = useNavigate();

  useEffect(()=>{
    if(status=="unauth"){
      navigate('/signin');
    }
  },[status])

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

  async function clickSignOut(){
    console.log("clickSignOut")

    axiosJWT.post('/signout',
      {
        api:API.AUTHS.LOGOUT
      }
      ,{
        headers: {
        "Content-Type": "application/json"
      }
    }).then(response=>{
      if(response.status==200){

      }else{
        console.log("Error Sign out!")
        return;
      }
      let data=response.data;
      console.log(data)
      if(data.error){
        console.log('Fetch error Sign Up');
        return;
      }
      if(data?.api==API.AUTHS.LOGOUT){
        console.log('LOGOUT');
        setToken('');
        setUser('');
        setStatus('unauth')
        navigate('/');
      }
    }).catch(error=>{
      console.log(error)
    });
  }

  function clickCancel(){
    console.log("index")
    navigate('/')
  }

  return (<>
    <label>[ Are you sure? ]</label><br />
    <button onClick={clickSignOut}>Logout</button><span> | </span>
    <button onClick={clickCancel}>Cancel</button>
  </>);
}