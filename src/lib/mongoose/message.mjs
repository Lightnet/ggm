/*
  LICENSE: MIT
  Created by: Lightnet
*/

import mongoose from 'mongoose';
import { nanoid32, unixTime } from '../helper.mjs';

const Schema = mongoose.Schema;
var MessageSchema = new mongoose.Schema({
  id: {
    type:String,
    unique:true,
    default: nanoid32
  },
  fromid: String,
  from: String,
  recipientid: String,
  recipient: String,
  subject: String,
  message: String,
  date:{
    type: Number,
    default: unixTime
  }
}, {timestamps: true});

// Compile model from schema
//mongoose.model('Blank', BlankSchema );
export default MessageSchema;