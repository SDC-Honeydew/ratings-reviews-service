const express = require('express');
const app = express();
const port = 8000;
const router = require('./router.js');

app.use('/', router);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
});