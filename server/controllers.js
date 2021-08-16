const { models } = require('../sequelize');
const { formatRatingsRecommend, formatCharacteristics } = require('./helpers');

exports.get = async (req, res) => {
  const { product_id } = req.query;
  const page  = req.query.page || 1;
  const count = req.query.count || 5;
  const sort = req.query.sort || 'newest'; // refactor this
  const sortOrder = sort === 'newest' ? 'date' : 'helpfulness'; // ...and this

  try {
    const reviews = await models.review.findAll({
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
    const response = {
      product: product_id.toString(),
      page: Number(page),
      count: reviews.length,
      results: reviews
    }
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getMeta = async (req, res) => {
  const { product_id } = req.query;
  try {  // does this need to be handled differently?
    const results = await Promise.all([
      models.review.findAll({
        attributes: ['rating', 'recommend'],
        where: {
          product_id: product_id
        }
      }),
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
    ]);

    let reviewsMeta = results[0];
    let characteristicsMeta = results[1];
    let { ratings, recommend } = formatRatingsRecommend(reviewsMeta);
    let formattedCharacteristics = formatCharacteristics(characteristicsMeta);

    let response = {
      product_id: product_id,
      ratings: ratings,
      recommended: recommend,
      characteristics: formattedCharacteristics
    };
    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.postReview = ((req, res) => {
  const review = req.body;
  let review_id;

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
  .then((response) => {
    res.status(201).send('CREATED');
  })
  .catch((err) => {
    console.log('post request error: ', err)
    res.status(500).send(err);
  })

});

exports.helpful = ((req, res) => {
  const { review_id } = req.params;
  models.review.increment('helpfulness', {
    where: {
      id: review_id
    }
  })
  .then(() => {
    res.status(204).send();
  })
  .catch((err) => {
    res.status(500).send();
  })
});

exports.report = ((req, res) => {
  let { review_id } = req.params;
  models.review.update({reported: true}, {
    where: {
      id: review_id
    }
  })
  .then(() => {
    res.status(204).send();
  })
  .catch((err) => {
    res.status(500).send();
  })
});