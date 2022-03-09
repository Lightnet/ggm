/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from 'react';
import { API } from '../../lib/API.mjs';
import useAxiosTokenAPI from '../hook/useAxiosTokenAPI.jsx';

export default function Compose() {

  const [userName, setUserName] = useState("q")
  const [subject, setSubject] = useState("11")
  const [content, setContent] = useState("22")

  function typeUserName(e){
    setUserName(e.target.value);
  }
  function typeSubject(e){
    setSubject(e.target.value);
  }
  function typeContent(e){
    setContent(e.target.value);
  }

  const [axiosJWT, isLoading] = useAxiosTokenAPI();

  async function clickSendMessage(){

    axiosJWT.instance.post("/api/message",{
      api:API.TYPES.MESSAGE
      , userName
      , subject
      , content
    })
    .then(function (response) {
      //console.log(response);
      if((response.status==200)&&(response.statusText=="OK")){
        //console.log(response.data)
        let data = response.data;
        console.log(data);
        if(data.error){
          console.log(data.error)
          console.log('Fetch error create message');
          return;
        }
        if(data.api == API.TYPES.SENT){
          console.log("message sent")
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return <div>
    <div>
      <label>To:</label><input value={userName} onChange={typeUserName}/>
    </div>
    <div>
      <label>Subject:</label><input value={subject} onChange={typeSubject}/>
    </div>
    <div>
      <label>Content:</label>
    </div>
    <div>
      <textarea  value={content} onChange={typeContent}></textarea>
    </div>
    <div>
      <button onClick={clickSendMessage}> Send Message </button>
    </div>
  </div>
}