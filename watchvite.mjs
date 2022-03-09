/*
  LICENSE: MIT
  Created by: Lightnet
*/

// "dev": "node server.mjs",

import nodemon from "nodemon";

nodemon({
  script: "./viteserver.mjs",
  ext: 'mjs html'
  //stdout: false // important: this tells nodemon not to output to console
})

nodemon.on('start', function () {
  console.log('App has started');
}).on('quit', function () {
  console.log('App has quit');
  process.exit();
}).on('restart', function (files) {
  console.log('App restarted due to: ', files);
});