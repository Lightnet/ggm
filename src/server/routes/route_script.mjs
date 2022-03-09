/*
  LICENSE: MIT
  Created by: Lightnet
*/

import express from 'express';
import { API } from '../../lib/API.mjs';
import clientDB from '../../lib/database.mjs';
import { isEmpty } from '../../lib/helper.mjs';
const router = express.Router();

router.get('/script', async function (req, res) {
  
  const db = await clientDB();
  let userid =null;
  let username =null;
  if(req.cookies.token){
    const User = db.model('User');
    let user = await User.findOne({token:req.cookies.token})
      .exec();
    //console.log(user);
    username = user.username;
    userid = user.id;
  }else{
    return res.send({error:'failtoken'});
  }

  try{
    const Script = db.model('Script');
    //console.log(username);
    console.log(userid);
    const data = req.body;
    console.log(data)
    let scripts = await Script.find({userid:userid})
      .select('id filename filetype data')
      .exec();

    return res.json({api:"SCRIPTS",scripts:scripts});
  }catch(e){
    console.log(e)
    return res.json({error:'SCRIPTSFAIL'});
  }

  //res.json({error:'script page'})
})

router.post('/script', async function (req, res) {
  
  const { api } = req.body;
  if(isEmpty(api)){
    return res.send({error:'empty'});
  }

  const db = await clientDB();
  let userid =null;
  let username =null;
  if(req.session.token){
    const User = db.model('User');
    //req.session.token
    //let user = await User.findOne({token:req.session.token});
    let user = await User.findOne({username:req.session.user})
      .exec();
    //console.log(user);
    username = user.username;
    userid = user.id;
  }else{
    return res.send({error:'failtoken'});
  }

  if(api== API.TYPES.CREATE){
    try{
      const Script = db.model('Script');
      //console.log(username);
      console.log(userid);
      const data = req.body;
      console.log(data)
      //let script = await Script.findOne({filename:data.filename}).select('id filename filetype data').exec();
      let script = await Script.findOne({filename:data.filename}).exec();
      console.log(script);

      if(script){
        console.log("UPDATE?");
        let currentScript = script;
        console.log(data.content)
        currentScript.data = data.content;
        await currentScript.save();
        return res.json({api:"UPDATE",script:currentScript});
      }else{
        console.log("CREATE");
        const newScript = new Script({
            userid:userid
          , username:username
          , filename:data.filename
          , data:data.content
        })
        let saveScript = await newScript.save();
        return res.json({api:"CREATE",script:saveScript});
      }

    }catch(e){
      console.log(e)
      return res.json({error:'SCRIPTSFAIL'});
    }
  }

  res.json({error:'script page'})
})

router.delete('/script', async function (req, res) {
  
  const db = await clientDB();
  let userid =null;
  let username =null;
  if(req.session.token){
    const User = db.model('User');
    //req.session.token
    //let user = await User.findOne({token:req.session.token});
    let user = await User.findOne({username:req.session.user})
      .exec();
    //console.log(user);
    username = user.username;
    userid = user.id;
  }else{
    return res.send({error:'failtoken'});
  }

  try{
    const Script = db.model('Script');
    //console.log(username);
    console.log(userid);
    const data = req.body;
    console.log(data)
    await Script.deleteOne({
      userid: userid
      , filename:data.filename
    }).exec();

    return res.json({api:"DELETE",filename:data.filename});
  }catch(e){
    console.log(e)
    return res.json({error:'FAILSCRIPTDELETE'});
  }

  res.json({error:'script page'})
})





export default router;