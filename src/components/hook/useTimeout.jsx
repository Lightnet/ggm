/*
  LICENSE: MIT
  Created by: Lightnet
*/


// https://stackoverflow.com/questions/53090432/react-hooks-right-way-to-clear-timeouts-and-intervals

import React from "react";

// After 2 second, we want to show a loader:
// useTimeout(() => {console.log("loading...")}, 2000 );

export default function useTimeout(callback, delay) {
  const timeoutRef = React.useRef();
  const callbackRef = React.useRef(callback);

  // Remember the latest callback:
  //
  // Without this, if you change the callback, when setTimeout kicks in, it
  // will still call your old callback.
  //
  // If you add `callback` to useEffect's deps, it will work fine but the
  // timeout will be reset.

  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Set up the timeout:

  React.useEffect(() => {
    if (typeof delay === 'number') {
      timeoutRef.current = window.setTimeout(() => callbackRef.current(), delay);

      // Clear timeout if the components is unmounted or the delay changes:
      return () => window.clearTimeout(timeoutRef.current);
    }
  }, [delay]);

  // In case you want to manually clear the timeout from the consuming component...:
  return timeoutRef;
}