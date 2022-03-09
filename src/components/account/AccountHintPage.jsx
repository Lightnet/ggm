/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from 'react';
import { useAuth } from '../auth/AuthProvider.jsx';

export function AccountHintPage() {
  
  const {user, setUser} = useAuth();
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [hint, setHint] = useState("");

  function typeQuestion1(e){
    setQuestion1(e.target.value);
  }

  function typeQuestion2(e){
    setQuestion2(e.target.value);
  }

  function typeHint(e){
    setHint(e.target.value);
  }

  async function clickApplyHint(){

  }

  return (<>
    <label> Question 1:</label><input type={"text"} value={question1} onChange={typeQuestion1} />  <br/>
    <label> Question 2:</label><input type={"text"} value={question2} onChange={typeQuestion2} />  <br/>
    <label> Hint:</label><input type={"text"} value={hint} onChange={typeHint} />  <br/>
    <button onClick={clickApplyHint}> Set Hint! </button>  <br/>
  </>);
}