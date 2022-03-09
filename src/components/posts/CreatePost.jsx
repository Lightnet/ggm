/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://redux.js.org/tutorials/essentials/part-3-data-flow

import React, { useEffect, useState } from "react";
import { API } from "../../lib/API.mjs";
import useAxiosTokenAPI from "../hook/useAxiosTokenAPI.jsx";
import useFetch from "../hook/useFetch.mjs";

export default function CreatePost(){

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function typeTitle(e){
    setTitle(e.target.value);
  }

  function typeContent(e){
    setContent(e.target.value);
  }

  const [axiosJWT, isLoading] = useAxiosTokenAPI();
  //console.log(isLoading);

  //useEffect(()=>{
    //console.log("init...");
    //console.log(axiosJWT);
  //},[axiosJWT])

  async function createPost(e){
    axiosJWT.instance.post('/api/post',{
      api:API.TYPES.CREATE
      , title:title
      , content:content
    })
    .then(function (response) {
      //console.log(response);
      if((response.status==200)&&(response.statusText=="OK")){
        //console.log(response.data)
        let data = response.data;
        console.log(data);
        if(data.error){
          console.log(data.error)
          console.log('Fetch error create post');
          return;
        }
        if(data.api=="POST"){
          console.log(data.post);
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return <>
    <label> Title: </label><input value={title} onChange={typeTitle}/><br/>
    <label> Content: </label><br/>
    <textarea value={content} onChange={typeContent}/><br/>
    <button onClick={createPost}> Create Post </button>
  </>
}