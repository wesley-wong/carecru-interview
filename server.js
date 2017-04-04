import path from 'path';
import bodyParser from 'body-parser';
import express from 'express';
import compress from 'compression';
import http from 'http';
import socketIO from 'socket.io';
import config from 'config';

import * as api from './server/api/http';
import * as entryService from './server/api/service/entry';
import * as uni from './server/app.js';

const app = express();
const httpServer = http.createServer(app);
const port = config.get('express.port') || 3000;

var io = socketIO(httpServer);

app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'ejs');

/**
 * Server middleware
 */
app.use(compress());
app.use(require('serve-static')(path.join(__dirname, config.get('buildDirectory'))));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

/**
 * API Endpoints
 */
app.get('/api/0/entries', api.getEntries);
app.post('/api/0/entries', api.addEntry);
app.post('/api/0/entries/:id', api.editEntry);
app.delete('/api/0/entries/:id', api.deleteEntry);

app.get('/favicon.ico', (req, res) => res.sendFile(path.join(__dirname, 'images', 'favicon.ico')));

/**
 * Universal Application endpoint
 */
app.get('*', uni.handleRender);

entryService.liveUpdates(io);

httpServer.listen(port);