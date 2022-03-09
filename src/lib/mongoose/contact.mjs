/*
  LICENSE: MIT
  Created by: Lightnet
*/

import mongoose from 'mongoose';
import { nanoid32, unixTime } from '../helper.mjs';

const Schema = mongoose.Schema;
var ContactSchema = new mongoose.Schema({
  id: {
    type:String,
    unique:true,
    default: nanoid32
  },
  userid: String,
  //username: String,
  friendid: String,
  friend: String,
  tag: String,
  group:{
    type: String,
    default: 'unknown'
  },
  date:{
    type: Number,
    default: unixTime
  }
}, {timestamps: true});

// Compile model from schema
//mongoose.model('Contact', ContactSchema );
export default ContactSchema;