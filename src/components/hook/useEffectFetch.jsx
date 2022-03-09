/*
  LICENSE: MIT
  Created by: Lightnet
*/

import { useEffect, useState } from "react";

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
// https://javascript.info/fetch
// https://github.github.io/fetch/
// https://medium.com/@9cv9official/what-are-get-post-put-patch-delete-a-walkthrough-with-javascripts-fetch-api-17be31755d28
// https://dev.to/tienbku/javascript-fetch-getpostputdelete-example-3dmp
// https://usehooks-ts.com/react-hook/use-fetch
// https://stackoverflow.com/questions/64459774/reactjs-how-to-call-usefetch-after-a-variable-is-set/64460105

// https://simplernerd.com/react-call-api/
// https://morioh.com/p/74097abd01bf
//GET, POST, PUT, DELETE, PATCH

export default function useEffectFetch(url,options){
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try{
      if(!url){
        //console.log("url error");
        setResponse(null);
        setError("Error! url not set!")
        setIsLoading(false);
        return;
      }
      if(!options){
        options={};
      }
      let response = await fetch(url, options);
      if (!response.ok) {
        //const message = 'Error with Status Code: ' + response.status;
        //throw new Error(message);
        setResponse(null);
        setError("RESPONSE FETCH ERROR") // check if the server error
        setIsLoading(false);
        return;
      }
      let data = await response.json();
      //return data;
      setResponse(data);
      setError(null);
      setIsLoading(false);
    }catch(e){
      //console.log("TRY FETCH ERROR: ", e);
      setResponse(null);
      setError('TRY FETCH ERROR'); //check for json format error
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [url])

  return [response, error, isLoading, fetchData];
}
/*
export default function UIPage(){
const [response, error,isfetchloading ]= useEffectFetch('/json');

  if(!isfetchloading){
    console.log(response);
    console.log(error);
  }

  return (<>

  </>)
}

*/
