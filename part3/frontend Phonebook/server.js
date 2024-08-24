const express = require('express');
const jsonServer = require('json-server');
const path = require('path');

const app = express();
const port = 3001;  // Port for json-server

// Create a router for json-server
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Add default middlewares (e.g., logger, static)
app.use(middlewares);

// Use a custom path prefix for json-server API
app.use('/api', (req, res, next) => {
  req.url = req.url.replace(/^\/api/, ''); // Remove /api prefix
  next();
}, router);

app.listen(port, () => {
  console.log(`JSON Server is running at http://localhost:${port}`);
});