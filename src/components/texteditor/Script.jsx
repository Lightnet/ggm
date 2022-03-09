/*
  LICENSE: MIT
  Created by: Lightnet

  does not work need to be append. reason in case of bad inject.

*/

// https://codesandbox.io/s/mZwGpB3XA?file=/index.js
/*
import { nanoid } from "./node_modules/nanoid/index.browser.js";

console.log("hello worlda");
console.log(nanoid());

*/
import React from "react"

export default function Script(props){

  return <script type="module" > console.log("test"); </script>
}

//{props.children}