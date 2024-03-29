/*
  LICENSE: MIT
  Created by: Lightnet
*/

import jwt from "jsonwebtoken";

//check token access that is 15 sec recheck
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  //console.log("midd token:",token)
  if(token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if(err) return res.sendStatus(403);
    console.log("Token PASS")
    //pass a variable to next request
    //req.test = "token";
    //req.test1 = "token1";
    //req.email = decoded.email;
    next();
  })
}