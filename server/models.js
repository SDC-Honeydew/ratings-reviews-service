// const db = require('./db.js');

const { Review, Reviews_photo, Characteristic, Characteristic_review } = require('./db.js');

module.exports = {

  getReviews: (page, count, sort, product_id) => {

    let sortOrder = sort === 'newest' ? 'date' : 'helpfulness';

    return new Promise ((resolve, reject) => {

      Review.findAll({
        attributes: [['id', 'review_id'], 'rating', 'summary', 'recommend', 'response', 'body', 'date', 'reviewer_name', 'helpfulness'],
        limit: count,
        offset: (page * count ) - count,
        where: {
          product_id: product_id,
          reported: false
        },
        include: {
          model: Reviews_photo,
          as: 'photos',
          attributes: ['id', 'url']
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

  getMeta: (product_id) => {
    console.log(product_id);
    return new Promise ((resolve, reject) => {

      Characteristic.findAll({
        attributes: ['id', 'product_id', 'name'],
        where: {
          product_id: product_id
        },
        // order: ['id', 'DESC']
      })
      .then((characteristics) => {
        resolve(characteristics);
      })
      .catch((err) => {
        reject(err);
      })
    });

  }

};