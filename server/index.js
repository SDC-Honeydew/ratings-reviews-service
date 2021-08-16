const express = require('express');
const app = express();
const router = require('./router.js');
app.use(express.json());
app.get('/ping', (req, res) => {
  const data = {
    uptime: process.uptime(),
    message: 'OK',
    date: new Date()
  };
  res.status(200).send(data);
});
app.use('/', router);

module.exports = app;