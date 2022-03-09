/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/7288814/download-a-file-from-nodejs-server-using-express
// https://expressjs.com/en/api.html#res.download
// 
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const uploadFolder = path.join(__dirname, "../../../public", "files");

const router = express.Router();

router.get('/downloadtest', function (req, res) {

  //res.setHeader('Content-disposition', 'attachment; filename=dramaticpenguin.MOV');
  //res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  //res.attachment();
  //res.attachment('path/to/logo.png');
  //res.download('/report.pdf')
  //res.download('path/report.pdf',"report.pdf")

  console.log(__dirname);
  let _filename = './test.txt';
  //_filename = "./";

  res.download(path.join(uploadFolder, _filename), function (err) {
    console.log(err);
  });
  //res.json({message:'download'})
})

export default router;