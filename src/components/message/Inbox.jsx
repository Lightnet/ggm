/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from 'react';
import { API } from '../../lib/API.mjs';
import useAxiosTokenAPI from '../hook/useAxiosTokenAPI.jsx';

export default function Inbox() {

  const [messages, setMessages] = useState([]);
  const [messageID, setMessageID] = useState("");
  const [message, setMessage] = useState("");
  const [fromName, setFromName] = useState("");
  const [subject, setSubject] = useState("");
  const [isMessage, setIsMessage] = useState(false);

  const [axiosJWT, isLoading] = useAxiosTokenAPI();

  useEffect(()=>{
    console.log("axiosJWT init...");
    console.log("isLoading: ", isLoading)
    if((typeof axiosJWT?.instance=="function")&&(isLoading == false)){
      console.log("GETTING...: ")
      getMessages();
    }
  },[axiosJWT,isLoading])

  async function getMessages(){
    axiosJWT.instance.get("/api/message")
    .then(function (response) {
      //console.log(response);
      if((response.status==200)&&(response.statusText=="OK")){
        //console.log(response.data)
        let data = response.data;
        console.log(data);
        if(data.error){
          console.log('Fetch error posts');
          return;
        }
        if(data.api == API.TYPES.MESSAGES){
          console.log("messages")
          setMessages(data.messages);
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  async function clickDelete(id){
    console.log("delete?")

    axiosJWT.instance.delete("/api/message",{
      data:{
          api:API.DELETE
        , id:id
      }
    })
    .then(function (response) {
      //console.log(response);
      if((response.status==200)&&(response.statusText=="OK")){
        //console.log(response.data)
        let data = response.data;
        console.log(data);
        if(data.error){
          console.log("Fetch delete contact fail!")
          return;
        }
    
        if(data.api == API.DELETE){
          console.log("message delete",data.id)
          setMessages(state=>state.filter(item=>item.id != data.id))
          if(data.id == messageID){
            clearMessage(messageID)
          }
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }

  function viewMessageID(id){
    for(let idx in messages){
      if(messages[idx].id==id){
        setMessageID(messages[idx].id);
        setFromName(messages[idx].from);
        setMessage(messages[idx].message);
        setSubject(messages[idx].subject);
        setIsMessage(true)
      }
    }
  }

  function clearMessage(id){
    setMessageID("");
    setMessage("");
    setSubject("");
    setIsMessage(false)
  }

  return <div>
    <div>
      <label>Actions:</label>
    </div>
    {isMessage ? (<div>
      <button onClick={clearMessage}> Close </button><button onClick={()=>clickDelete(messageID)}> Delete </button><br/>
      <label> [ From: {fromName} ] </label><br/>
      <label> [ Subject: {subject} ] </label><br/>
      <label> [ Message ] </label>
      <p> {message} </p>
          
    </div>):(<div>
      {messages.map(item=>{
        return <div key={item.id}> 
          <label> [ From: {item.from} ] </label>
          <label> [ Subject: {item.subject} ] </label>
          <button onClick={()=>viewMessageID(item.id)}> View </button>
          <button onClick={()=>clickDelete(item.id)}> Delete </button>
        </div>
      })}
    </div>)}
  </div>
}