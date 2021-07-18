require('dotenv').config()
const { Client, Pool } = require('pg');
const pool = new Pool(); // works like this using dotenv and .env file w/ db env variable!

pool.connect();

module.exports = {
  get: () => {

      return new Promise ((resolve, reject) => {
        pool.query('SELECT * FROM reviews WHERE id BETWEEN 0 AND 10', (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data.rows);
          }
        });
      });
    }

  }

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