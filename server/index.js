const express = require('express')
const app = express()
const port = 8000

app.get('/', (req, res) => {
  res.status(200).send('Led Zeppelin')
})

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
})