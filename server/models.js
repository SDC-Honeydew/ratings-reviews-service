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
  },

  postReview: (review) => {

    // ADD A DATE/TIMESTAMP TO THE REVIEW
    // ADD REPORTED = FALSE TO REVIEW
    // (RESPONSE WILL BE NULL (HOPEFULLY))
    // ADD HELPFULNESS = 0

    console.log(review);
    let review_id;
    return new Promise((resolve, reject) => {
      Review.create({
        product_id: review.product_id,
        rating: review.rating,
        date: new Date().getTime(),
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
        review_id = insertedReview.id;
        review.photos = review.photos.map((url) => {
          return {
            review_id: review_id,
            url: url
          }
        });
        return Reviews_photo.bulkCreate(review.photos);
      })
      .then((insertedPhotos) => {
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
        return Characteristic_review.bulkCreate(characteristicReviews);

      })
      .then((insertedCharacteristicReviews) => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      })
    });
  }

};