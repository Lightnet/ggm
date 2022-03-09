/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://expressjs.com/en/guide/routing.html
// https://www.section.io/engineering-education/uploading-files-using-formidable-nodejs/
// 

import express from 'express';
import formidable from "formidable";
import fs from "fs";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const uploadFolder = path.join(__dirname, "../../../public", "files");

const router = express.Router();

const isFileValid = (file) => {
  //const type = file.type.split("/").pop();
  //const type = file.mimetype.split("/").pop();
  const type = file.originalFilename.split(".").pop();
  //console.log("type")
  //console.log(type)
  const validTypes = [
    "jpg"
    , "jpeg"
    , "png"
    , "gif"
    , "jsx"
    , "mjs"
    , "pdf"
    , "txt"
    , "md"
    , "js"
    , "zip"
  ];
  console.log(validTypes.indexOf(type));
  if (validTypes.indexOf(type) === -1) {
    return false;
  }
  return true;
};

router.post('/upload', function (req, res) {

  // setup
  const form = formidable({
    multiples: false
    //, maxFileSize:50 * 1024 * 1024 // 5MB
    , maxFileSize: 10 * 50 * 1024 * 1024 // 50MB
    , uploadDir : uploadFolder
  });
  // Basic Configuration
  //form.multiples = false;
  //form.maxFileSize = 50 * 1024 * 1024; // 5MB
  //form.uploadDir = uploadFolder;
  //console.log(form);

  // Parsing
  form.parse(req, async (err, fields, files) => {
    console.log(fields);
    console.log(files);
    if (err) {
      console.log("Error parsing the files");
      console.log(err.message);
      return res.status(400).json({
        status: "Fail",
        message: "There was an error parsing the files",
        error: err,
      });
    }
    console.log(files.myfiles.length)
    if(files.myfiles.length==1){
      //Single file
      console.log("Hello?")
      const file = files.myfiles[0];
      //console.log(file);
      console.log(file.filepath) // file store temporary and need to delete? permission to save of folder access?
      console.log(file.originalFilename) 
      console.log(file.mimetype) 
      const isValid = isFileValid(file)
      console.log(isValid)
      if (!isValid) {
        // throes error if file isn't valid
        console.log("The file type is not a valid type")
        return res.status(400).json({
          status: "Fail",
          message: "The file type is not a valid type",
        });
      }
      // creates a valid name by removing spaces
      const fileName = encodeURIComponent(file.originalFilename.replace(/\s/g, "-"));

      try {
        // renames the file in the directory
        fs.renameSync(file.filepath, path.join(uploadFolder, fileName));
        console.log(file.filepath)
        //fs.unlinkSync( file.filepath )
      } catch (error) {
        console.log(error);
        return res.json({error:'rename file'})
      }
      return res.json({message:'uploaded'})
    }
    return res.json({error:'fail upload'})
  });
  //return res.json({error:'fail upload'})
})

export default router;