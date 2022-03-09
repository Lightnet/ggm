/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// 
//import React from "react";

// set Interval 2 second, we want to loop call function:
// useInterval(()=>{console.log("loading...") },1000)
/*
export default function useInterval(callback, delay){
  const timeoutRef = React.useRef();
  const callbackRef = React.useRef(callback);

  // Remember the latest callback:
  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Set up the setInterval and clearInterval
  React.useEffect(() => {
    if (typeof delay === 'number') {
      timeoutRef.current = window.setInterval(() => callbackRef.current(), delay);

      // Clear timeout if the components is unmounted or the delay changes:
      return () =>{
        console.log('clearInterval ')
        window.clearInterval(timeoutRef.current);
      }
    }
  }, [delay]);

  // In case you want to manually clear the timeout from the consuming component...:
  return timeoutRef;
}
*/
import React, {useEffect, useRef } from 'react';

export default function useInterval(callback, delay) {
  const savedCallback = useRef();
  const timeoutRef = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      timeoutRef.current = setInterval(tick, delay);
      return () => {
        console.log("clearInterval: ",timeoutRef.current);
        clearInterval(timeoutRef.current)
      };
    }
  }, [delay]);
  return timeoutRef;
}