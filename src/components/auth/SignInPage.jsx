/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from 'react';
//import useFetch from "../hook/useFetch.mjs";

import {
  useNavigate
} from "react-router-dom";
import { useAuth } from './AuthProvider.jsx';
import { parseJwt } from '../../lib/helper.mjs';
import axios from 'axios';
import { API } from '../../lib/API.mjs';

export function SignInPage() {

  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const {
      setUser
    , setToken
    , setExpire
    , setStatus
    , baseToken
    , setBaseToken
    , baseExpire
    , setBaseExpire
  } = useAuth();

  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(async (config) => {
    const currentDate = new Date();
    //console.log("PROCESS???")
    if (baseExpire * 1000 < currentDate.getTime()) {
        //console.log("EXPIRE? base token????>>>>")
        const response = await axios.get('/basetoken');
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        //console.log(response.data.accessToken);
        setBaseToken(response.data.accessToken);
        const decoded = parseJwt(response.data.accessToken);
        setBaseExpire(decoded.exp);
      }else{
        config.headers.Authorization = `Bearer ${baseToken}`;
      }
      return config;
  }, (error) => {
      return Promise.reject(error);
  });


  async function clickLogin(){

    axiosJWT.post('/signin',
      {
        api:API.AUTHS.LOGIN
        , userName:userName
        , password:password
      }
      ,{
        headers: {
        "Content-Type": "application/json"
      }
    }).then(response=>{
      let data=response.data;
      console.log(data)
      if(data.error){
        if(data.error=='PASSWORDFAIL'){
          console.log('Password Fail!');
        }
        return;
      }
      if(data?.api=='LOGIN'){
        setUser(data.user);
        setToken(data.token);
        let datatoken = parseJwt(data.token)
        setExpire(datatoken.exp);
        console.log(datatoken);
        setStatus('auth')
        navigate('/')
      }
      if(data?.api=='NONEXIST'){
        setStatus('Non Exist!');
        //navigate('/')
      }
    }).catch(error=>{
      console.log(error)
    });




    /*
    //console.log("login")
    let data = await useFetch('/signin',{
        method:'POST'
      , headers: {'Content-Type': 'application/json'}
      , body:JSON.stringify({userName,password})
    })
    console.log(data)
    if(data.error){
      console.log('Fetch error Login');
      if(data.error=='PASSWORDFAIL'){
        //setStatus('Password Fail!');
      }
      return;
    }
    if(data.action){

      if(data.action=='LOGIN'){
        setUser(data.user);
        setToken(data.token);
        let datatoken = parseJwt(data.token)
        setExpire(datatoken.exp);
        console.log(datatoken);
        setStatus('auth')
        navigate('/')
      }

      if(data.action=='NONEXIST'){
        //navigate('/')
        //setStatus('Non Exist!');
      }
    }
    */
  }

  function clickCancel(){
    console.log("index")
    navigate('/')
  }

  function typingUser(e){
    setUserName(e.target.value);
  }

  function typingPassword(e){
    setPassword(e.target.value);
  }

  return (<>
    <label>Login:</label>
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <label> User: </label>
            </td>
          </tr>
          <tr>
            <td>
              <input value={userName} onChange={typingUser}></input>
            </td>
          </tr>
          <tr>
            <td>
              <label> Password: </label>
            </td>
          </tr>
          <tr>
            <td>
              <input value={password} onChange={typingPassword}></input>
            </td>
          </tr>
          <tr>
            <td>
              <button onClick={clickLogin}>Login</button>
              <button onClick={clickCancel}>Cancel</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </>);
}
