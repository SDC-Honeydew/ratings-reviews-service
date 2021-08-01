const { models } = require('../sequelize');

module.exports = {

  getReviews: (page, count, sort, product_id) => {
    let sortOrder = sort === 'newest' ? 'date' : 'helpfulness';
    return new Promise ((resolve, reject) => {
      models.review.findAll({
        attributes: [['id', 'review_id'], 'rating', 'summary', 'recommend', 'response', 'body', ['date_time', 'date'], 'reviewer_name', 'helpfulness'],
        limit: count,
        offset: (page * count ) - count,
        where: {
          product_id: product_id,
          reported: false
        },
        include: {
          model: models.reviews_photo,
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
      models.review.findAll({
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
      models.characteristic.findAll({
        attributes: ['id', 'name'],
        where: {
          product_id: product_id
        },
        include: {
          model: models.characteristic_review,
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
  },

  // refactor this to be individual funciton calls to models, combine them in controllers instead of doing it all here
  postReview: (review) => {
    let review_id;
    return new Promise((resolve, reject) => {
      models.review.create({
        product_id: review.product_id,
        rating: review.rating,
        date: new Date().getTime(), // REMOVE THIS LATER
        date_time: new Date().toISOString(),
        summary: review.summary,
        body: review.body,
        recommend: review.recommend,
        reported: false,
        reviewer_name: review.reviewer_name,
        reviewer_email: review.reviewer_email,
        response: null,
        helpfulness: 0
      })
      .then((insertedReview) => {
        // build the photo objects -- refactor to helper
        review_id = insertedReview.id;
        review.photos = review.photos.map((url) => {
          return {
            review_id: review_id,
            url: url
          }
        });
        // build the characteristic objects -- refactor to helper
        let characteristicReviews = [];
        for (let characteristic in review.characteristics) {
          characteristicReviews.push(
            {
              characteristic_id: Number(characteristic),
              review_id: review_id,
              value: review.characteristics[characteristic]
            }
          );
        }
        return Promise.all([models.reviews_photo.bulkCreate(review.photos), models.characteristic_review.bulkCreate(characteristicReviews)]);
      })
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
        reject(err);
      })
    });
  },

  markHelpful: (review_id) => {
    return new Promise((resolve, reject) => {
      models.review.increment('helpfulness', {
        where: {
          id: review_id
        }
      })
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      })
    })
  },

  report: (review_id) => {
    return new Promise((resolve, reject) => {
      models.review.update({reported: true}, {
        where: {
          id: review_id
        }
      })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      })
    })
  }

};