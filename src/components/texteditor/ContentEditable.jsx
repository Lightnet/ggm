/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://codepen.io/mlbrgl/pen/PQdLgb?editors=1010

import React, { useEffect, useRef, useState } from "react";

export default function ContentEditable(props){

  const refEl = useRef();
  const [lastValue, setLastValue] = useState("");
  const [_type, setType] = useState("text");
  const [isEdit, setIsEdit] = useState(true);

  useEffect(()=>{
    if(typeof props.type == "string"){
      console.log(props.type)
      if((props.type == "text")||(props.type == "html")){
        setType(props.type)
      }else{ // default text
        setType("text")
      }
    }
  },[props.type]);

  useEffect(()=>{
    if(_type=="text"){
      console.log(_type)
      refEl.current.innerText = props.value || "placeholder";
    }
    if(_type=="html"){
      console.log(_type)
      refEl.current.innerHTML = props.value || "placeholder";
    }
  },[props.value]);

  useEffect(()=>{
    if(typeof props.isedit == "boolean"){
      setIsEdit(props.isedit)
    }
  },[props.isedit]);

  function replaceCaret(el) {
    // Place the caret at the end of the element
    const target = document.createTextNode('');
    el.appendChild(target);
    // do not move caret if element was not focused
    const isTargetFocused = document.activeElement === el;
    if (target !== null && target.nodeValue !== null && isTargetFocused) {
      var sel = window.getSelection();
      if (sel !== null) {
        var range = document.createRange();
        range.setStart(target, target.nodeValue.length);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
      if (el instanceof HTMLElement) el.focus();
    }
  }

  function emitChange(e){
    e.preventDefault();
    //console.log(e.currentTarget.textContent)
    let value;
    if(_type=="text"){
      //console.log(_type)
      value = refEl.current.innerText;
    }else if(_type=="html"){
      //console.log(_type)
      value = refEl.current.innerHTML;
    }else{
      value = refEl.current.innerText;
    }
    if (props.onChange && value !== lastValue) {
      props.onChange({
        target: {
          value: value
        }
      });
    }
    setLastValue(value)
    if(refEl.current){
      replaceCaret(refEl.current);
    }
    
  }

  return <div 
    style={{
        padding:"4px"
      //, height:"100%"
      , height:"calc(100vh - 60px)"
      , width:"calc(100% - 10px)"
      , border:"1px"
      , borderStyle:"solid"
      , overflow:"scroll"
    }}

    //id="contenteditable"
    ref={refEl}
    contentEditable={isEdit}
    onInput={emitChange} 
    onBlur={emitChange}
    >

  </div>
}