/*
  LICENSE: MIT
  Created by: Lightnet

  Informtion:
    Not for used. Need another method safe access.

*/

//import {useEffect } from 'react';

export default function useDispatch(event, data) {

  //useEffect(() => {
    window.dispatchEvent(new CustomEvent(event,data));
    //return ()=> {
    //}
  //});
}