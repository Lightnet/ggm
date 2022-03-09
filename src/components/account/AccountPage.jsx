/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import AuthAccess from '../auth/AuthAccess.jsx';
import { AccountHintPage } from './AccountHintPage.jsx';
import { AccountHomePage } from './AccountHomePage.jsx';
import { AccountPassphrasePage } from './AccountPassphrasePage.jsx';

export function AccountPage() {
  
  return (<>
    <AuthAccess>
      <div>
        <label> Account: </label>
        <Link to={"/account"}>Home</Link><span> | </span>
        <Link to={"changepassphrase"}>Change Passphrase</Link><span> | </span>
        <Link to={"hints"}>Hints</Link><span> | </span>

      </div>
      <Routes>
        <Route path="/" element={<AccountHomePage />}/>
        <Route path="changepassphrase" element={<AccountPassphrasePage />}/>
        <Route path="hints" element={<AccountHintPage />}/>
      </Routes>
    </AuthAccess>
  </>);
}