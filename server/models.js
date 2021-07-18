const db = require('./db.js');

module.exports = {
  get: () => {

      return new Promise ((resolve, reject) => {
        db.query('SELECT * FROM reviews WHERE id BETWEEN 0 AND 10', (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data.rows);
          }
        });
      });
    }

  }