
import React, { useState } from 'react';
import { useAuth } from '../auth/AuthProvider.jsx';

import {
  Link
} from "react-router-dom";
import Sign from '../auth/Sign.jsx';
import ThemeLink from '../theme/themelink.jsx';

export default function NavBarTop(){

  const { status } = useAuth();
  console.log(status);

  function renderAccess(){
    if(status == 'unauth'){
      return <></>
    }
    return(<>
      <Link to="account">Account</Link> <span> | </span>
    </>)
  }

  return (<>
    <Link to="/">Home</Link> <span> | </span>
    {renderAccess()}
    <Sign /> <span> | </span>
    <ThemeLink /> <span> | </span>
    <Link to="/texteditor">Text Editor</Link> <span> | </span>
  </>)
}