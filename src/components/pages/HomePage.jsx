/*
  LICENSE: MIT
  Created by: Lightnet
*/

import React, { useState } from 'react';
import { useAuth } from '../auth/AuthProvider.jsx';
import { useNotifty } from '../notify/NotifyProvider.jsx';

export function HomePage() {
  //const [view, setView] = useState('');

  const {
    notifies,
    dispatchNotify
  } = useNotifty();

  const {user, setUser} = useAuth();
  //const dispatch = useDispatch()

  function checkUserName(){
    if(user ==''){
      return <label>Weclome Guest.</label>
    }else{
      return <label>User Name:{user}</label>
    }
  }

  return (<>
    <div>
      <label>Home</label><br />
      {checkUserName()} <br />
      <p>
        Welcome to the test project. I keep it simple to build react components. Test Lab Page is for testing each part of the module design.
      </p>
      
    </div>
  </>);
}
/*

*/