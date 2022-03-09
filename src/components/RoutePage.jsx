/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from 'react';

import {
  Routes,
  Route,
} from "react-router-dom";

import { HomePage } from './pages/HomePage.jsx';
import { SignInPage } from './auth/SignInPage.jsx';
import { SignOutPage } from './auth/SignOutPage.jsx';
import { SignUpPage } from './auth/SignUpPage.jsx';
import { AccountPage } from './account/AccountPage.jsx';
import NavBarTop from './layout/navbartop.jsx';
import Message from './message/MessagePage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import NotifyManager from './notify/NotifyManager.jsx';
import TextEditorPage from './texteditor/TextEditorPage.jsx';

export function RoutePage() {

  return (
  <>
    <div>
      <NavBarTop />
    </div>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="account/*" element={<AccountPage />} />
      <Route path="signin" element={<SignInPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="signout" element={<SignOutPage />} />
      <Route path="message/*" element={<Message />} />
      <Route path="texteditor/*" element={<TextEditorPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
    <NotifyManager />
  </>)
}