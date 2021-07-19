const db = require('./db.js');

module.exports = {
  get: (req) => {

      return new Promise ((resolve, reject) => {
        db.query(`SELECT * FROM reviews WHERE product_id = ${req.query.product_id}`, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data.rows);
          }
        });
      });
    }

  }