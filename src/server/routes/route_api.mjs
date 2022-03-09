/*
  LICENSE: MIT
  Created by: Lightnet
*/

import express from 'express';
import route_contact from './route_contact.mjs';
import route_message from './route_message.mjs';
import route_post from './route_post.mjs';
import route_script from './route_script.mjs';

const router = express.Router();

router.use(route_contact);
router.use(route_message);
router.use(route_post);
router.use(route_script);

export default router;