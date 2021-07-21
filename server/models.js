const db = require('./db.js');

module.exports = {

  getReviews: (page, count, sort, product_id) => {

    let sortOrder = sort === 'newest' ? 'date' : 'helpfulness';

    return new Promise ((resolve, reject) => {

      db.Review.findAll({
        attributes: [['id', 'review_id'], 'rating', 'summary', 'recommend', 'response', 'body', 'date', 'reviewer_name', 'helpfulness'],
        limit: count,
        offset: (page * count ) - count,
        where: {
          product_id: product_id,
          reported: false
        },
        include: {
          model: db.Reviews_photo,
          as: 'photos'
        },
        order: [[sortOrder, 'DESC']]
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