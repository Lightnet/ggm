/*
  LICENSE: MIT
  Created by: Lightnet
*/

import express from 'express';
import { API } from '../../lib/API.mjs';
import clientDB from '../../lib/database.mjs';
import { isEmpty } from '../../lib/helper.mjs';
const router = express.Router();

router.get('/message', async function (req, res) {
  
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
    const Message = db.model('Message');
    //console.log(username);
    console.log(userid);
    const data = req.body;
    console.log(data)
    let messages = await Message.find({recipientid:userid})
      .select('id from recipient subject message')
      .exec();

    return res.json({api:API.TYPES.MESSAGES,messages:messages});
  }catch(e){
    console.log(e)
    return res.json({error:'fail messages db'});
  }

  //res.json({message:'message page'})
})

router.post('/message',async function (req, res) {
  
  const {api} = req.body;
  console.log(api);
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
  if(api == API.TYPES.MESSAGE){
    try{
      const Message = db.model('Message');
      console.log(username);
      console.log(userid);

      const data = req.body;
      console.log(data)
      const User = db.model('User');
      let user = await User.findOne({username:data.userName}).exec();
      console.log(user)
      if(!user){
        return res.send({error:'Not found!'});
      }

      let newMessage = new Message({
          fromid:userid
        , from:username
        , recipientid:user.id
        , recipient:user.username
        , subject:data.subject
        , message:data.content
      });
      console.log(newMessage)
      let msg = await newMessage.save();
      console.log(msg);
      return res.send({api:'SENT'});

    }catch(e){
      console.log(e)
      return res.send({error:'faildb'});
    }
  }
  res.json({message:'message page'})
})

router.delete('/message',async function (req, res) {
  const {api} = req.body;
  console.log(api);
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

  if(api == API.DELETE){
    try{
      const Message = db.model('Message');
      console.log(username);
      console.log(userid);

      const data = req.body;
      console.log(data)

      await Message.deleteOne({id:data.id}).exec();

      //let deleteMessage = await Message.deleteOne({id:data.id}).exec();
      //console.log(deleteMessage)

      return res.send({api:'DELETE',id:data.id});
    }catch(e){
      console.log(e)
      return res.send({error:'faildb'});
    }
  }

  res.json({message:'message page'})
})

export default router;