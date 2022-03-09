/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from 'react';
import { useAuth } from '../auth/AuthProvider.jsx';

export function AccountHomePage() {
  
  const {user, setUser} = useAuth();

  return (<>
    <label>User Name:{user}</label> <br/>
  </>);
}