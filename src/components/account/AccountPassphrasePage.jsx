/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from 'react';
import { API } from '../../lib/API.mjs';
import { useAuth } from '../auth/AuthProvider.jsx';
import useFetch from '../hook/useFetch.mjs';

export function AccountPassphrasePage() {
  
  const {user, setUser} = useAuth();
  const [currentPassphrase, setCurrentPassphrase] = useState("");
  const [newPassphrase, setNewPassphrase] = useState("");

  function typeCurrentPassphrase(e){
    setCurrentPassphrase(e.target.value);
  }

  function typeNewPassphrase(e){
    setNewPassphrase(e.target.value);
  }

  async function clickApplyChange(){
    let data = await useFetch("/passphrase",{
      method:'PUT'
      , headers: {'Content-Type': 'application/json'}
      , body:JSON.stringify({
          api:API.TYPES.UPDATE
        , currentPassphrase: currentPassphrase
        , newPassphrase:newPassphrase
      })
    })
    if(data.error){
      console.log(data.error)
      console.log('Fetch error update passphrase');
      return;
    }
    if(data.api=="UPDATE"){
      console.log(data);
    }
  }

  return (<>
    <label> Current Passphrase:</label><input type={"text"} value={currentPassphrase} onChange={typeCurrentPassphrase} />  <br/>
    <label> New Passphrase:</label><input type={"text"} value={newPassphrase} onChange={typeNewPassphrase}/>  <br/>
    <button onClick={clickApplyChange}> Change Passprhase! </button>  <br/>
  </>);
}