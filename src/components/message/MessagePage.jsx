/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://medium.com/free-code-camp/reactjs-pass-parameters-to-event-handlers-ca1f5c422b9
// https://www.kindacode.com/article/react-passing-parameters-to-event-handler-functions/
// https://flaviocopes.com/react-pass-parameter-event/


import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Compose from './Compose.jsx';
import Contacts from './Contacts.jsx';
import Inbox from './Inbox.jsx';
import Settings from './Settings.jsx';

export default function MessagePage() {

  return <div>
    <div>
      <label> Message: </label>
        <Link to={"/message"}>In Box</Link><span> | </span>
        <Link to={"compose"}>Compose</Link><span> | </span>
        <Link to={"contacts"}>Contacts</Link><span> | </span>
        <Link to={"settings"}>Settings</Link><span> | </span>
    </div>
    <Routes>
        <Route path="/" element={<Inbox />}/>
        <Route path="compose" element={<Compose />}/>
        <Route path="contacts" element={<Contacts />}/>
        <Route path="settings" element={<Settings />}/>
      </Routes>
  </div>
}