/*
  LICENSE: MIT
  Created by: Lightnet
*/
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { isEmpty } from "../../lib/helper.mjs";
import { useAuth } from "../auth/AuthProvider.jsx";
import ThemeLink from "../theme/themelink.jsx";

export default function ViteNavBar(){

  //const navigate = useNavigate();
  const { user } =useAuth();
  const [navnames, setNavNames] = useState([]);

  useEffect(()=>{
    if(isEmpty(user)){
      setNavNames([
        {name: "Home", path:"/"}
        ,{name: "Sign In", path:"/signin"}
        ,{name: "Sign Up", path:"/signup"}
      ])
    }else{
      setNavNames([
        {name: "Home", path:"/"}
        ,{name: "Account", path:"/account"}
        ,{name: "Post", path:"/post"}
        ,{name: "Message", path:"/message"}
        ,{name: "Sign Out", path:"/signout"}
        ,{name: "Text Editor", path:"/texteditor"}
      ])
    }
  },[user])

  return <div>
    {navnames.map(({ name, path }) => {
        //console.log(path)
        //console.log(name)
        return (<span key={path}> <Link to={path}> {name} </Link> | </span>)
      })}
    <ThemeLink/>
  </div>
}