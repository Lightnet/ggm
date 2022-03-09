/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React from "react";
import { AccountPage } from "../components/account/AccountPage";
import AuthAccess from "../components/auth/AuthAccess";

export default function Account() {

  return (<>
  <AuthAccess>
    <AccountPage/>
  </AuthAccess>
  </>)
}