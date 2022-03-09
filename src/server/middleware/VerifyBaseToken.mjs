/*
  LICENSE: MIT
  Created by: Lightnet
*/

import jwt from "jsonwebtoken";
import crypto from 'crypto';

//check token access that is 15 sec recheck
export const verifyBaseToken = async (req, res, next) => {
  //res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization, access-control-allow-origin");
  //console.log(req.headers)
  //console.log("/verifyBaseToken")
  //console.log(req.headers)
  const authHeader = req.headers['authorization'];
  //console.log("authHeader: ", authHeader)
  const token = authHeader && authHeader.split(' ')[1];
  //console.log("midd token:",token)
  if(token == null) return res.sendStatus(401);
  //console.log("process.env.BASE_TOKEN_SECRET: ", process.env.BASE_TOKEN_SECRET)
  let hash= crypto.createHash('md5').update(req.ip+process.env.BASE_TOKEN_SECRET).digest('hex');
  jwt.verify(token, hash, (err, decoded) => {
    if(err) return res.sendStatus(403);
    console.log("PASS Base Token")
    //pass a variable to next request
    //req.test = "token";
    //req.test1 = "token1";
    //req.email = decoded.email;
    next();
  })
}