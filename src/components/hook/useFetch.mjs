/*
  LICENSE: MIT
  Created by: Lightnet
*/
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

/*
// Example POST method implementation:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
*/

//import { useEffect, useState } from "react";

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// https://javascript.info/fetch
// https://github.github.io/fetch/
// https://medium.com/@9cv9official/what-are-get-post-put-patch-delete-a-walkthrough-with-javascripts-fetch-api-17be31755d28
// https://dev.to/tienbku/javascript-fetch-getpostputdelete-example-3dmp
// https://usehooks-ts.com/react-hook/use-fetch

//GET, POST, PUT, DELETE, PATCH

export default async function useFetch(url, options){
  try{
    if(!url){
      console.log("url error");
      return {error:'null url ERROR'}
    }
    if(!options){
      options={};
    }
    let response = await fetch(url, options);
    if (!response.ok) {
      //const message = 'Error with Status Code: ' + response.status;
      //throw new Error(message);
      console.log("RESPONSE FETCH ERROR");
      return {error:'SERVER FETCH ERROR'};// check if the server error
    }
    let data = await response.json();
    return data;
  }catch(e){
    console.log("TRY FETCH ERROR: ", e);
    return {error:'TRY FETCH ERROR'}; //check for json format error
  }
}