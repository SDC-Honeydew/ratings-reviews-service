const db = require('./db.js');

module.exports = {

  getReviews: (product_id) => {

    return new Promise ((resolve, reject) => {

      db.Review.findAll({
        where: {
          product_id: product_id
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
  },

  getReviewPhotos: (review_id) => {

    return new Promise ((resolve, reject) => {

      db.Reviews_photo.findAll({
        where: {
          review_id: review_id
        }
      })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        })
    })
  }

};

module.exports.getReviewPhotos(5)
  .then((photos) => {
    console.log(photos);
  })
  .catch((err) => {
    console.log(err);
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
