import express from 'express'
import path from 'path'

import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors'
//import http from 'http'

import multer from 'multer';

import mongoose from 'mongoose'
mongoose.set('strictQuery', false)


import morgan from 'morgan'


//constant from env to use here
//on latest localhost not working
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nodejs';
const port = process.env.PORT || 5000

import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));


const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null,'uploads/images')
  },
  filename: (req,file,cb) => {
      cb(null,file.originalname)
  }

})

const app = express();
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(multer({storage: fileStorage}).single('image'))

if(process.env.NODE_ENV !== 'production'){
//    app.use(morgan('combined'))
    app.use(morgan('dev'))
}

app.use(express.static(path.join(__dirname,'public')))
//console.log(path.join(__dirname,'public'))
app.use('/uploads',express.static(path.join(__dirname,'uploads')))


//api before session use
import apiRouter from './routes/api/apiRouter.js'
app.use('/api',apiRouter)


//use session if available to use.

import indexRouter from './routes/frontend/indexRouter.js'

function print (path, layer) {
    if (layer.route) {
      layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
    } else if (layer.name === 'router' && layer.handle.stack) {
      layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
    } else if (layer.method) {
    //  console.log('%s /%s',        layer.method.toUpperCase(),        path.concat(split(layer.regexp)).filter(Boolean).join('/'))
    }
  }
  
  function split (thing) {
    if (typeof thing === 'string') {
      return thing.split('/')
    } else if (thing.fast_slash) {
      return ''
    } else {
      var match = thing.toString()
        .replace('\\/?', '')
        .replace('(?=\\/|$)', '$')
        .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
      return match
        ? match[1].replace(/\\(.)/g, '$1').split('/')
        : '<complex:' + thing.toString() + '>'
    }
  }
  
  app._router.stack.forEach(print.bind(null, []))

app.use(indexRouter);

//At the end of all the routes
//files inside controllers/frontend/errors/
//display not found error First
//catch and display errors


mongoose.connect(MONGODB_URI).then( result=> {
    const server = app.listen(port, ()=>console.log(`Server listening on port ${port}`))

})
.catch(err => {
    console.log(err)
});
