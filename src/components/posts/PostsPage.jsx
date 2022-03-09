/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://redux.js.org/tutorials/essentials/part-3-data-flow

import React, { useEffect, useState } from "react";
import { API } from "../../lib/API.mjs";
import useAxiosTokenAPI from "../hook/useAxiosTokenAPI.jsx";
import useFetch from "../hook/useFetch.mjs";

export default function PostsPage(){

  const [posts, setPosts] = useState([]);

  const [isEdit, setIsEdit] = useState(false);
  const [postID, setPostID] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [axiosJWT, isLoading] = useAxiosTokenAPI();

  //console.log("isLoading ",isLoading);
  useEffect(()=>{
    console.log("axiosJWT init...");
    console.log("isLoading: ", isLoading)
    if((typeof axiosJWT?.instance=="function")&&(isLoading == false)){
      console.log("GETTING...: ")
      getPost();
    }
  },[axiosJWT,isLoading])

  async function getPost(){
    axiosJWT.instance.get('/api/post')
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
        if(data.api=="POSTS"){
          setPosts(data.posts);
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  async function deletePost(id){
    axiosJWT.instance.delete('/api/post',{
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
          console.log('Fetch error delete post');
          return;
        }
        if(data.api==API.DELETE){
          setPosts(state=>state.filter(item=>item.id !=data.id));
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
  function editPost(id){
    let post = posts.find(item=>item.id == id);
    console.log(post);
    if(post){
      setIsEdit(true);
      setPostID(id)
      setTitle(post.title)
      setContent(post.content)
    }
  }

  function typeTitle(e){
    setTitle(e.target.value);
  }

  function typeContent(e){
    setContent(e.target.value);
  }

  async function updatePost(e){

    axiosJWT.instance.put('/api/post',{
        api:API.TYPES.UPDATE
      , id: postID
      , title:title
      , content:content
    })
    .then(function (response) {
      //console.log(response);
      if((response.status==200)&&(response.statusText=="OK")){
        //console.log(response.data)
        let data = response.data;
        //console.log(data);
        if(data.error){
          console.log(data.error)
          console.log('Fetch error update post');
          return;
        }
        if(data.api=="UPDATE"){
          console.log(data.post);
          setPosts(state=>state.map(item=>{
            if(item.id ==data.post.id){
              item.title = data.post.title;
              item.content = data.post.content;
              return item;
            }
            return item;
          }))
        }
        setIsEdit(false);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return <>
    <label> Posts: </label>
    {isEdit ?(
      <div>
        <label> ID: {postID} </label><br/>
        <label> Title: </label><input value={title} onChange={typeTitle}/><br/>
        <label> Content: </label><br/>
        <textarea value={content} onChange={typeContent}/><br/>
        <button onClick={updatePost}> Update Post </button>
      </div>
    ):(
    <div>
      {posts.map(item=><div key={item.id}>
        <label> Title: {item.title} </label> 
        <button onClick={()=>editPost(item.id)}> Edit </button> 
        <button onClick={()=>deletePost(item.id)}> Delete </button> <br/>
        <label> Content:</label><br/>
        <section> {item.content}</section>
        </div>)}
    </div>)}
  </>
}