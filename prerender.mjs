/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import


// Pre-render the app into static HTML.
// run `yarn generate` and then `dist/static` can be served as a static site.

//const fs = require('fs')
//const path = require('path')
import fs from "fs";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const toAbsolute = (p) => path.resolve(__dirname, p)

const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8')

//fixed bug not loading in type module in package.json
fs.renameSync(
  toAbsolute('./dist/server/entry-server.js')
  ,toAbsolute('./dist/server/entry-server.cjs')
  );
//const { render } = require('./dist/server/entry-server.js')
//import { render } from './dist/server/entry-server.cjs'; //does not work here

// determine routes to pre-render from src/pages
const routesToPrerender = fs
  .readdirSync(toAbsolute('src/pages'))
  .map((file) => {
    const name = file.replace(/\.jsx$/, '').toLowerCase()
    return name === 'home' ? `/` : `/${name}`
  })

;(async () => {
  //fixed loading type module
  const { render } = await import("./dist/server/entry-server.cjs");

  // pre-render each route...
  for (const url of routesToPrerender) {
    const context = {}
    const appHtml = await render(url, context)

    //const html = template.replace(`<!--app-html-->`, appHtml)
    const html = template.toString().replace(`<!--app-html-->`, appHtml)

    const filePath = `dist/static${url === '/' ? '/index' : url}.html`
    fs.writeFileSync(toAbsolute(filePath), html)
    console.log('pre-rendered:', filePath)
  }
})()