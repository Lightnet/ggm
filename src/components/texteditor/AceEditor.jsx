/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://github.com/securingsincity/react-ace/issues/162
// https://dev.to/vvo/how-to-solve-window-is-not-defined-errors-in-react-and-next-js-5f97
import React, { useEffect, useState } from "react";

export default function AceEditor(props){

  const [Ace, SetAce] = useState(null);

  useEffect( async()=>{
    if (typeof window !== 'undefined') {//server ssr
      const ReactAce = await import("react-ace");
      //await import("ace-builds/src-noconflict/mode-java");
      //await import("ace-builds/src-noconflict/mode-javascript");
      await import("ace-builds/src-noconflict/mode-jsx");
      await import("ace-builds/src-noconflict/theme-github");
      SetAce(ReactAce)
    }
  },[])

  if(Ace){
    //console.log(Ace)
    const AceComp = Ace.default;
    return <AceComp {...props}/>
  }
  return null;
}