/*
  LICENSE: MIT
  Created by: Lightnet
*/

import mongoose from 'mongoose';
import { nanoid32, unixTime } from '../helper.mjs';

const Schema = mongoose.Schema;
var PostSchema = new mongoose.Schema({
  id: {
    type:String,
    unique:true,
    default: nanoid32
  },
  userid: String,
  username: String,
  title: String,
  content: String,
  date:{
    type: Number,
    default: unixTime
  }
}, {timestamps: true});

// Compile model from schema
//mongoose.model('Blank', BlankSchema );
export default PostSchema;