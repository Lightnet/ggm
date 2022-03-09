/*
  LICENSE: MIT
  Created by: Lightnet
*/

import jwt from "jsonwebtoken";
import clientDB from "../../lib/database.mjs";
import crypto from 'crypto';

//base or basic access for checks
// for login
export const refreshBaseToken = async(req, res) => {

  //const db = await clientDB();
  //const Users = db.model('User');
  try {
    console.log("/refreshbasetoken")
    //const user = await Users.findOne({token:refreshToken})
      //.select('id username tokenSalt')
      //.exec()
    //if(!user) return res.sendStatus(403);
      //need signature ip
      //console.log("process.env.BASE_TOKEN_SECRET:", process.env.BASE_TOKEN_SECRET)
      let hash= crypto.createHash('md5').update(req.ip+process.env.BASE_TOKEN_SECRET).digest('hex');
      const accessToken = jwt.sign({
        hash:hash
      }, hash,{
        expiresIn: '15s'
      });
      res.json({ accessToken });
  } catch (error) {
    console.log(error);
    res.json({ error:'base token error!' });
  }
}