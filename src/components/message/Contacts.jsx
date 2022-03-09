/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useEffect, useState } from 'react';
import { API } from '../../lib/API.mjs';
import { isEmpty } from '../../lib/helper.mjs';
import useAxiosTokenAPI from '../hook/useAxiosTokenAPI.jsx';

export default function Contacts() {

  const [userName, setUserName] = useState("")
  const [selectName, setSelectName] = useState("")
  const [contacts, setContacts] = useState([])

  const [axiosJWT, isLoading] = useAxiosTokenAPI();

  useEffect(()=>{
    console.log("axiosJWT init...");
    console.log("isLoading: ", isLoading)
    if((typeof axiosJWT?.instance=="function")&&(isLoading == false)){
      console.log("GETTING...: ")
      getContacts();
    }
  },[axiosJWT,isLoading])

  function typeUserName(e){
    setUserName(e.target.value);
  }

  function onSelectName(e){
    setSelectName(e.target.value);
    console.log(e.target.value);
  }

  async function getContacts(){
    axiosJWT.instance.get("/api/contact")
    .then(function (response) {
      //console.log(response);
      if((response.status==200)&&(response.statusText=="OK")){
        //console.log(response.data)
        let data = response.data;
        console.log(data);
        if(data.error){
          console.log("Fetch contact fail!")
          return;
        }
        if(data.api == "CONTACTS"){
          setContacts(data.contacts)
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  async function clickAddContacts(){
    axiosJWT.instance.post("/api/contact",{
        api:API.TYPES.CREATE
      , userName
    })
    .then(function (response) {
      //console.log(response);
      if((response.status==200)&&(response.statusText=="OK")){
        //console.log(response.data)
        let data = response.data;
        console.log(data);
        if(data.error){
          console.log("Fetch create contact fail!")
          return;
        }
    
        if(data.api=="ADDED"){
          setContacts(state=>[...state,{
            id:data.id
            ,friend:data.friend
          }])
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  async function clickRemoveContacts(){
    let id = null;
    for(let idx in contacts){
      if(contacts[idx].friend == userName){
        id = contacts[idx].id;
        break;
      }
    }
    if(isEmpty(id)){
      return;
    }

    axiosJWT.instance.delete("/api/contact",{
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
    
        if(data.api=="DELETE"){
          setContacts(state=>state.filter(item=>item.id!=data.id))
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  function renderContacts(){

    return <select value={selectName} onChange={onSelectName}>
      <option value={""}> Select User </option>
      {contacts.map(item=>{
        return <option key={item.id} value={item.id} > {item.friend} </option>
      })}
    </select>
  }

  return <div>
    <div>
      <label>User Name:</label>
      <input value={userName} onChange={typeUserName} /> 
      <button onClick={clickAddContacts}> Add </button>
      <button onClick={clickRemoveContacts}> Remove </button>
    </div>
    <div>
      <label>Contacts:</label>
    </div>
    <div>
      {renderContacts()}
    </div>
  </div>
}