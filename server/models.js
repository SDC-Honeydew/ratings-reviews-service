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

  getReviewsMeta: (product_id) => {

    return new Promise ((resolve, reject) => {
      Review.findAll({
        attributes: ['rating', 'recommend'],
        where: {
          product_id: product_id
        }
      })
      .then((reviews) => {
        resolve(reviews);
      })
      .catch((err) => {
        reject(err);
      });
    });

  },

  getCharacteristicsMeta: (product_id) => {

    return new Promise ((resolve, reject) => {

      Characteristic.findAll({
        attributes: ['id', 'name'],
        where: {
          product_id: product_id
        },
        include: {
          model: Characteristic_review,
          attributes: ['value']
        },
        order: [['id', 'ASC']]
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