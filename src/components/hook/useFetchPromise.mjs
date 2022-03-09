/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

//reject not use is pass to resolve to use array object

export default function useFetchPromise(url,options){
  return new Promise((resolve, reject) => {
    fetch(url,options)
      .then(response => {
        //console.log(await )
        if(!response.ok){
          //reject({error:"Server fetch error"})
          resolve({error:"Server fetch error"})
          //return reject("Server fetch error");  
        }
        return response.json()
      })
      .then(data =>{
        //console.log(data)
        resolve(data);
      }).catch((error) => {
        //console.error('Error:', error.message);
        //console.log('Error:', error.message);
        resolve({error:error.message})
        //reject(error.message)
      });
  });
}
/*
async function clickFetchPromise(){
  let data = await useFetchPromise('/json');
  console.log(data);
}
*/