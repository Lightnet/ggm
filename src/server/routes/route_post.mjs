/*
  LICENSE: MIT
  Created by: Lightnet
*/

import express from 'express';
import { API } from '../../lib/API.mjs';
import clientDB from '../../lib/database.mjs';
import { isEmpty } from '../../lib/helper.mjs';
const router = express.Router();

router.get('/post', async function (req, res) {
  
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
    const Post = db.model('Post');
    //console.log(username);
    //console.log(userid);
    //const data = req.body;
    //console.log(data)
    let posts = await Post.find({recipientid:userid})
      .select('id title content')
      .exec();

    return res.json({api:API.TYPES.POSTS,posts:posts});
  }catch(e){
    console.log(e)
    return res.json({error:'fail get post db'});
  }

  //res.json({message:'message page'})
})

router.post('/post',async function (req, res) {
  
  console.log(req.body)
  const {api} = req.body;
  console.log(api);
  if(isEmpty(api)){
    return res.json({error:'empty'});
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
    
    try{
      const Post = db.model('Post');

      const data = req.body;
      console.log(data)
      let newPost = new Post({
          fromid:userid
        , from:username
        , title:data.title
        , content:data.content
      });
      console.log(newPost)
      let post = await newPost.save();
      console.log(post);
      return res.send({api:API.TYPES.CREATE,post:post});

    }catch(e){
      console.log(e)
      return res.send({error:'fail create post db'});
    }
  }
  res.json({error:'post error!'})
})

router.put('/post',async function (req, res) {
  
  console.log(req.body)
  const {api} = req.body;
  console.log(api);
  if(isEmpty(api)){
    return res.json({error:'empty'});
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
  
  if(api == API.TYPES.UPDATE){
    
    try{
      const Post = db.model('Post');
      const data = req.body;
      console.log(data)

      const filter = { id: data.id };
      const update = { 
          title: data.title
        , content: data.content
      };

      let doc = await Post.findOneAndUpdate(filter, update,{new: true})
        .select('id title content')
        .exec();

      return res.send({api:API.TYPES.UPDATE,post:doc});

    }catch(e){
      console.log(e)
      return res.send({error:'fail create post db'});
    }
  }
  res.json({error:'post error!'})
})

router.delete('/post',async function (req, res) {
  const {api} = req.body;
  
  console.log("req.body ",req.body);
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
      const Post = db.model('Post');
      //console.log(username);
      //console.log(userid);

      const data = req.body;
      //console.log(data)

      await Post.deleteOne({id:data.id}).exec();
      //let deletePost = await Post.deleteOne({id:data.id}).exec();
      //console.log(deletePost)

      return res.send({api:API.DELETE,id:data.id});
    }catch(e){
      console.log(e)
      return res.send({error:'fail delete post'});
    }
  }
  
  res.json({error:'post delete'})
})

export default router;