const app = require('./server.js')
const port = 8000;

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
});