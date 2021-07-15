const express = require('express');
const app = express();
require('dotenv').config()
const port = 8000;

const { Client, Pool } = require('pg');

const pool = new Pool(); // works like this using dotenv and .env file w/ db env variable!

pool.connect();

pool.query('SELECT * FROM product WHERE id = 1', (err, res) => {
    console.log(err, res)
    pool.end()
  });

// CAN ALSO USE CLIENT INSTEAD OF POOL -- EXPLORE THE DIFFERENCE

// const client = new Client({
//   user: 'mattwrobel',
//   host: 'localhost',
//   database: 'mydb',
//   password: '',
//   port: 5432,
// })

// client.connect();

// client.query('SELECT NOW()', (err, res) => {
//   console.log(err, res)
//   client.end()
// })

app.get('/', (req, res) => {
  res.status(200).send('Led Zeppelin')
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
});