const express = require('express');
const app = express();
const port = 8000;

const { Client } = require('pg');

const client = new Client({
  user: 'mattwrobel',
  host: 'localhost',
  database: 'mydb',
  password: '',
  port: 5432,
})
client.connect()

client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})

app.get('/', (req, res) => {
  res.status(200).send('Led Zeppelin')
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
});