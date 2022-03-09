/*
  LICENSE: MIT
  Created by: Lightnet
*/

import mongoose from 'mongoose';
import { nanoid32, unixTime } from '../helper.mjs';

const Schema = mongoose.Schema;
var ScriptSchema = new mongoose.Schema({
  id: {
    type:String,
    unique:true,
    default: nanoid32
  },
  userid: String,
  username: String,
  filename: String,
  filetype: String,
  data: String,
  date:{
    type: Number,
    default: unixTime
  }
}, {timestamps: true});

// Compile model from schema
//mongoose.model('Blank', ScriptSchema );
export default ScriptSchema;