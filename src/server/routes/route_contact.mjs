/*
  LICENSE: MIT
  Created by: Lightnet
*/

import express from 'express';
import { API } from '../../lib/API.mjs';
import clientDB, { checkTokenUser } from '../../lib/database.mjs';
import { isEmpty } from '../../lib/helper.mjs';
const router = express.Router();

router.get('/contact', async function (req, res) {
  
  const db = await clientDB();
  //let userid =null;
  //let username =null;
  console.log(req.session)

  //let {error, userid, username} = await checkTokenUser(req);
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
    const Contact = db.model('Contact');
    let contacts = await Contact.find({userid:userid})
      .select('id friend')
      .exec();
      return res.json({api:'CONTACTS',contacts:contacts})  
  }catch(e){
    return res.json({error:'query fail'})
  }

  res.json({message:'contact page'})
})

router.post('/contact', async function (req, res) {
  const {api} = req.body;
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

  if(api == API.TYPES.CREATE){
    let data = req.body;
    console.log(userid)
    //const User = db.model('User');
    const Contact = db.model('Contact');
    let user = await Contact.findOne({userid:userid,friend:data.userName})
      .exec();
    console.log(user);
    if(!user){
      let newContact =  new Contact({
          userid:userid
        , friend: data.userName
      })

      await newContact.save();

      return res.json({api:'ADDED',friend:newContact.friend,id:newContact.id})
    }else{
      return res.json({api:'EXIST'})
    }
  }
  res.json({message:'contact page'})
})

router.delete('/contact', async function (req, res) {
  
  const db = await clientDB();
  const {api} = req.body;
  if(isEmpty(api)){
    return res.send({error:'empty'});
  }

  let userid =null;
  let username =null;
  if(req.session.token){
    const User = db.model('User');
    //req.session.token
    //let user = await User.findOne({token:req.session.token});
    let user = await User.findOne({username:req.session.user}).exec();
    //console.log(user);
    username = user.username;
    userid = user.id;
  }else{
    return res.send({error:'failtoken'});
  }

  if(api == "DELETE"){
    const Contact = db.model('Contact');
    try{
      let data = req.body;
      await Contact.deleteOne({
        userid: userid
        , id:data.id
      }).exec();
      console.log(data.id)
      return res.send({api:'DELETE',id:data.id});
    }catch(e){
      console.log(e)
      return res.send({error:'faildb'});
    }
  }
  
  res.json({message:'contact page'})
})

export default router;