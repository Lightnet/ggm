/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from 'react';
import {
  useNavigate
} from "react-router-dom";
import { API } from '../../lib/API.mjs';
import { useAuth } from './AuthProvider.jsx';
import { parseJwt } from '../../lib/helper.mjs';
import axios from 'axios';

export function SignUpPage() {

  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const {
    baseToken, setBaseToken,
    baseExpire, setBaseExpire
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
  
  async function clickRegister(){
    console.log(baseToken)
    axiosJWT.post('/signup',
      {
        api:API.AUTHS.SIGNUP
        , user:user
        , password:password
      }
      ,{
        headers: {
        //Authorization: `Bearer ${baseToken}`, //ingore this as from the interceptors config
        "Content-Type": "application/json"
      }
    }).then(response=>{
      let data=response.data;
      console.log(data)
      if(data.error){
        console.log('Fetch error Sign Up');
        return;
      }
      if(data?.api==API.TYPES.CREATE){
        console.log('CREATE');
        //navigate('/');
      }
      if(data?.api==API.TYPES.EXIST){
        console.log('EXIST');
      }
    }).catch(error=>{
      console.log(error)
    });
  }

  function clickCancel(){
    console.log("index")
    navigate('/')
  }

  function typingUser(e){
    setUser(e.target.value);
  }

  function typingPassword(e){
    setPassword(e.target.value);
  }

  return (<>
    <div>
      <label>Register:</label>
    </div>
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
              <input value={user} onChange={typingUser}></input>
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
              <button onClick={clickRegister}>Submit</button>
              <button onClick={clickCancel}>Cancel</button>
            </td>
          </tr>

        </tbody>
      </table>
    </div>
  </>);
}