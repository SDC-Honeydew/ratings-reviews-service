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
    // console.log(err);
    res.status(500).send(err);
  }
};

exports.getMeta = async (req, res) => {
  const { product_id } = req.query;

  try {
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

    // format the characteristicsMeta obj -- naive implementation MAKE THIS A HELPER FUNCTION
    let formattedCharacteristics = formatCharacteristics(characteristicsMeta);
    // let formattedCharacteristics = {};
    // characteristicsMeta.forEach((characteristic) => {
    //   let value = 0;
    //   characteristic.characteristic_reviews.forEach((review) => {
    //     value += review.value;
    //   })
    //   value = value / characteristic.characteristic_reviews.length;

    //   formattedCharacteristics[characteristic.name] = {
    //     id: characteristic.id,
    //     value: value
    //   };
    // });

    let response = {
      product_id: product_id,
      ratings: ratings,
      recommended: recommend,
      characteristics: formattedCharacteristics
    };
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.postReview = ((req, res) => {
  // console.log('post request body: ', req.body);
  models.postReview(req.body)
    .then((response) => {
      res.status(201).send('CREATED');
    })
    .catch((err) => {
      console.log('post request error: ', err)
      res.status(500).send(err);
    })
});

exports.helpful = ((req, res) => {
  let { review_id } = req.params;
  models.markHelpful(review_id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      res.status(500).send();
    })
});

exports.report = ((req, res) => {
  let { review_id } = req.params;
  models.report(review_id)
  .then(() => {
    res.status(204).send();
  })
  .catch((err) => {
    res.status(500).send();
  })
});