/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/55881397/react-how-to-maintain-caret-position-when-editing-contenteditable-div
// https://stackoverflow.com/questions/34424845/adding-script-tag-to-react-jsx

import React, { useEffect, useRef, useState } from "react"
import AceEditor from "./AceEditor";
import useFetch from "../hook/useFetch.mjs";
import useAxiosTokenAPI from "../hook/useAxiosTokenAPI";
import { API } from "../../lib/API.mjs";

export default function TextEditorPage(){

  //const contentEditable = useRef();
  //const textRef = useRef();
  const [content, setContent] = useState(`sdfdf`);
  const [isEdit, setIsEdit] = useState(true);

  const [fileName, setFileName] = useState("filename.txt");

  const [scriptID, setScriptID] = useState("");
  const [scriptName, setScriptName] = useState("");
  const [scripts, setScripts] = useState([]);

  const [axiosJWT, isJSTLoading] = useAxiosTokenAPI();

  useEffect(()=>{
    //console.log("axiosJWT init...");
    //console.log("isLoading: ", isJSTLoading)
    if((typeof axiosJWT?.instance=="function")&&(isJSTLoading == false)){
      console.log("GETTING...: ")
      getScripts();
    }
  },[axiosJWT,isJSTLoading])

  //useEffect(()=>{
    //getScripts();
  //},[])
  
  function onSelectScriptName(e){
    setScriptName(e.target.value)
    console.log(e.target.value);
    for(let idx in scripts){
      if(scripts[idx].id== e.target.value){
        setScriptID(e.target.value)
        setFileName(scripts[idx].filename)
        setContent(scripts[idx].data)
        console.log(scripts[idx].data)
        break;
      }
    }
  }

  function typeFileName(e){
    setFileName(e.target.value)
  }

  function onChangeContent(newValue){
    //console.log(e.target.value)
    //console.log(newValue)
    setContent(newValue);
  }

  function clickPaste1(){
    console.log("set??")
    setContent("Tests 1");
  }

  function clickPaste2(){
    setContent(`console.log("test")`);
  }

  function toggleEdit(){
    setIsEdit(state=>!state)
  }

  function initScript(){
    //console.log("test...")
    //const scriptText = "console.log('hello world')";
    //setScripts(state=>[...state,"test"])
    const script = document.createElement('script');
    script.async = true;
    script.type = "module";
    //script.innerText = contentEditable.current.innerText;
    document.body.appendChild(script);
    document.body.removeChild(script);
  }

  async function getScripts(){
    axiosJWT.instance.get("/api/script")
    .then(function (response) {
      //console.log(response);
      if((response.status==200)&&(response.statusText=="OK")){
        //console.log(response.data)
        let data = response.data;
        console.log(data);
        if(data.error){
          console.log("fetch scripts error!")
          return;
        }
        if(data.api=="SCRIPTS"){
          setScripts(data.scripts);
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  async function createScript(){
    axiosJWT.instance.post("/api/script",{
        api:API.TYPES.CREATE
      , filename:fileName
      , content:content
    })
    .then(function (response) {
      //console.log(response);
      if((response.status==200)&&(response.statusText=="OK")){
        //console.log(response.data)
        let data = response.data;
        console.log(data);
        if(data.error){
          return console.log("fetch create error!")
        }
        if(data.api==API.TYPES.CREATE){
          setScripts(state=>
            [...state,{
                id:data.script.id
              , filename:data.script.filename
              , data:data.script.data
            }]
          )
        }
        if(data.api==API.TYPES.UPDATE){
          setScripts(state=>
            state.map(item=>{
              if(item.id == data.script.id){
                item.data = data.script.data;
                return item;
              }
              return item;
            })
          )
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  async function deleteScript(){
    axiosJWT.instance.delete("/api/script",{
      data:{
          api:API.DELETE
        , filename:fileName
      }
    })
    .then(function (response) {
      //console.log(response);
      if((response.status==200)&&(response.statusText=="OK")){
        //console.log(response.data)
        let data = response.data;
        console.log(data);
        if(data.error){
          return console.log("fetch delete error!")
        }
        if(data.api == API.DELETE){
          setScripts(state=>state.filter(item=>item.filename != data.filename))
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }

  return <div style={{height:"100%", width:"100%"}}>
    <div style={{
      height:"22px"
    , width:"calc(100% - 20px)"
    , border:"1px"
    , borderStyle:"solid"
    }}>
    
      <button onClick={toggleEdit}> Edit {isEdit?("True"):("False")}</button>
      <label>File:</label>
      <input value={fileName} onChange={typeFileName}/>
      <button onClick={createScript}> Save </button>
      <button onClick={deleteScript}> Delete </button>
      <button onClick={initScript}> Script init </button>
      <select value={scriptName} onChange={onSelectScriptName}>
        <option value=""> Select Script </option>
        {scripts.map(item=><option key={item.id} value={item.id}> {item.filename} </option>)}
      </select>


      <button onClick={clickPaste1}> Test Put 1</button>
      <button onClick={clickPaste2}> Test Put 2</button>

    </div>
    <AceEditor
      mode="jsx"
      theme="github"
      value={content}
      onChange={onChangeContent}
      name="UNIQUE_ID_OF_DIV"
      editorProps={{ $blockScrolling: true }}
    />

  </div>
}