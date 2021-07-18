require('dotenv').config()
const { Client, Pool } = require('pg');
const dbConnection = new Pool(); // works like this using dotenv and .env file w/ db env variable!

dbConnection.connect((err) => {
  if (err) {
    console.log('Error connecting to DB');
  } else {
    console.log('connected to Postgres!');
  }
});

module.exports = dbConnection;

// pool.end() DO I NEED THIS?

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