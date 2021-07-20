const db = require('./db.js');

module.exports = {

  getReviews: (product_id) => {

    return new Promise ((resolve, reject) => {

      db.Review.findAll({
        attributes: [['id', 'review_id'], 'rating', 'summary', 'recommend', 'response', 'body', 'date', 'reviewer_name', 'helpfulness'],
        where: {
          product_id: product_id,
          reported: false
        },
        include: db.Reviews_photo,
        order: [['helpfulness', 'DESC']]
      })
        .then((reviews) => {
          resolve(reviews);
        })
        .catch((err) => {
          reject(err);
        })
    })
  },

};
  // getReviewPhotos: (review_id) => {

  //   return new Promise ((resolve, reject) => {

  //     db.Reviews_photo.findAll({
  //       where: {
  //         review_id: review_id
  //       }
  //     })
  //       .then((data) => {
  //         resolve(data);
  //       })
  //       .catch((err) => {
  //         reject(err);
  //       })
  //   })
  // }


// // TEST
// module.exports.getReviewPhotos(5)
//   .then((photos) => {
//     console.log(photos);
//   })
//   .catch((err) => {
//     console.log(err);
//   })

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
