const db = require('./db.js');

module.exports = {

  get: (req) => {

    return new Promise ((resolve, reject) => {

      db.Review.findAll({
        where: {
          product_id: 5
        },
        order: [['helpfulness', 'DESC']]
      })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        })
    })

    //   return new Promise ((resolve, reject) => {
    //     db.query(`SELECT * FROM reviews WHERE product_id = ${req.query.product_id}`, (err, data) => {
    //       if (err) {
    //         reject(err);
    //       } else {
    //         resolve(data.rows);
    //       }
    //     });
    //   });
    // }

  }
}