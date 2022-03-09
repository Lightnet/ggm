/*
  LICENSE: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/5738552/how-to-create-custom-event-listener-in-node-js-express-js

// @ts-check
import chalk from 'chalk';
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import compression from 'compression';
import serveStatic from "serve-static";
import { createServer } from "vite";
import express from 'express';
//import session  from 'express-session';
//import MongoStore from 'connect-mongo';
import routes from "./src/server/routes.mjs";
import cookieParser from 'cookie-parser';

const __dirname = fileURLToPath(new URL('.', import.meta.url))
//console.log(__dirname);

const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD
process.env.MY_CUSTOM_SECRET = 'API_KEY_qwertyuiop';

const DATABASE_URL = process.env.DATABASE_URL;
console.log(DATABASE_URL);

console.log("env.PORT:", process.env.PORT)
console.log("env.HOST:", process.env.HOST)

const PORT =  process.env.PORT || 3000;
const HOST =  process.env.HOST || "0.0.0.0";
const log = console.log;

async function vitecreateServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production'
) {
  const resolve = (p) => path.resolve(__dirname, p)

  const indexProd = isProd
    ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    : ''
  
  const app = express()
  
  app.set('trust proxy', true)

  app.use(cookieParser())
  //app.use(session({
    //secret: 'keyboard cat',
    //store: MongoStore.create({ mongoUrl: DATABASE_URL }),
    //resave: true,
    //saveUninitialized: true,
    //cookie: { secure: false }
  //}))
  app.use(express.json())

  app.use(routes);

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite
  if (!isProd) {
    //vite = await require('vite').createServer({
    vite = await createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: 'ssr',
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100
        }
      }
    })
    // use vite's connect instance as middleware
    app.use(vite.middlewares)
  } else {
    //app.use(require('compression')())
    app.use(compression())
    app.use(
      //require('serve-static')(resolve('dist/client'), {
      serveStatic(resolve('dist/client'), {
        index: false
      })
    )
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl

      let template, render
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve('index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
      } else {
        template = indexProd
        render = require('./dist/server/entry-server.cjs').render
      }

      const context = {}
      const appHtml = render(url, context)

      if (context.url) {
        //Somewhere a `<Redirect>` was rendered
        return res.redirect(301, context.url)
      }

      const html = template.replace(`<!--app-html-->`, appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      !isProd && vite.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })

  //app.on('listening', function() {
    //console.log("listen...")
  //});

  //app.on('mount', function() {
    //console.log("mount...")
  //});

  //app.on('close', function() {
    //console.log("close...")
  //});

  //app.on('ready', function() {
    //console.log("ready...")
  //});

  return { app, vite }
}

if (!isTest) {
  vitecreateServer().then(({ app }) =>{
      const server = app.listen(PORT, () => {
        //app.emit('listening');
        //console.log("dev:")
        //log(chalk.green(`http://localhost:${PORT}`))
        //log("")
      })

      server.on('listening', function() { //works
        //console.log("init web server and hot reload SSR...")
        //console.log("listen...", server.address())
        let address = server.address();
        let ipaddress = address?.address || "0.0.0.0";
        let port = address?.port || PORT;
        log("listen IP:", chalk.green(ipaddress), " PORT:", port)
        log(chalk.green(`http://localhost:${PORT}`))
      });
    
      //server.on('connection', function() { //works
        //console.log("connection...")
      //});
    
      //server.on('close', function() {
        //console.log("close...")
      //});
      
      return app;
    }
  )
}

// for test use
//exports.createServer = createServer
export default vitecreateServer;