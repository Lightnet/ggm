/*
  LICENSE: MIT
  Created by: Lightnet
*/
//import path, { dirname } from 'path';
//import { fileURLToPath } from 'url';
//const __dirname = dirname(fileURLToPath(import.meta.url));

import express from 'express';
import auth from './auth/auth.mjs';
import route_api from './routes/route_api.mjs';
import route_download from './routes/route_download.mjs';
import route_upload from './routes/route_upload.mjs';
import route_test from './routes/route_test.mjs';
//import {refreshToken } from "./controllers/RefreshToken.mjs";
//import {baseToken } from "./controllers/BaseToken.mjs";
import { verifyToken } from './middleware/VerifyToken.mjs';

const router = express.Router();
//router.use('/favicon.ico', express.static('images/favicon.ico'));

router.use(auth);

router.use("/api",route_api);
//router.use("/api",verifyToken,route_api);
router.use(route_upload);
router.use(route_download);
router.use(route_test);

//router.get('*', (req, res) => {
  //res.send(
    //'<script src="/bundle.js"></script>'
  //)
  // respond with html page
  //if (req.accepts('html')) {
    //res.redirect(301, '/');
    //res.sendFile(path.join(__dirname, '../index.html'));
    //res.send('<script src="/bundle.js"></script>');
    //return;
  //}
  // respond with json
  //if (req.accepts('json')) {
    //res.status(404);
    //res.json({ error: 'Not found' });
    //return;
  //}
  //res.status(404);
  // default to plain-text. send()
  //res.type('txt').send('Not found');
//})

export default router;