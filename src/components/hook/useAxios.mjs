/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://towardsdev.com/what-is-better-for-http-requests-fetch-or-axios-comparison-920ceffc5161
// https://masteringjs.io/tutorials/axios/response-body
// https://zetcode.com/javascript/axios/
// https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/
// 

import axios from "axios";

export default function useAxios(configs){

  return new Promise((resolve)=>{
    axios(configs)
    .then((response)=> {
      //console.log(response);
      //console.log("response.status:",response.status);
      //console.log("response.status:",response.statusText);
      if((response.status == 200)||(response.statusText == "OK")){
        resolve(response.data)
      }else{
        resolve({error:"status: "+response.status })
      }
    })
    .catch(error => {
      //console.log(error)
      //console.log(error.message)
      resolve({error:error.message})
    })
  })
}