import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';
//methods
const converToPath = url => {
  return path.join(path.dirname(fileURLToPath(import.meta.url)), url);
}

const serveIndex = (req, res, next) => {
  res.render('index');
}

const servePageRequest = (req, res, next) => {
  let url = converToPath(`./html/${req.params.url}`);
  res.sendFile(url);
}

const serveHTML = (req, res, next) => {
  let url = converToPath(`./html/${req.params.url}`);
  res.send(url);
}

const serveError = (req, err) => {
  console.error(err);
  res.status(400).send(err);
}

export default app => {
  app.get('/', serveIndex);
  app.get('/page/:url', servePageRequest);
  app.get(`/html/:url`, serveHTML);
}
