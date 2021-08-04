const models = require('./models.js');

exports.get = (req, res) => {
  // const { page, count, sort, product_id } = req.query;
  // add default parameters here...
  const { product_id } = req.query;
  const page  = req.query.page || 1;
  const count = req.query.count || 5;
  const sort = req.query.sort || 'newest';

  return models.getReviews(page, count, sort, product_id)
    .then((reviews) => {
      let response = {
        product: product_id.toString(),
        page: Number(page),
        count: reviews.length,
        results: reviews
      }
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    })
};

exports.getMeta = (req, res) => {
  const { product_id } = req.query;
  return Promise.all([models.getReviewsMeta(product_id), models.getCharacteristicsMeta(product_id)])
    .then((results) => {
      let reviewsMeta = results[0];
      let characteristicsMeta = results[1];
      // format the ratings and recommended objs
      let ratings = {};
      let recommend = {};
      reviewsMeta.forEach((review) => {
        if (!ratings[review.rating]) {
          ratings[review.rating] = 1;
        } else {
          ratings[review.rating]++;
        }
        if (!recommend[review.recommend]) {
          recommend[review.recommend] = 1;
        } else {
          recommend[review.recommend]++;
        }
      });
      // format the characteristicsMeta obj -- naive implementation MAKE THIS A HELPER FUNCTION
      let formattedCharacteristics = {};
      characteristicsMeta.forEach((characteristic) => {
        let value = 0;
        characteristic.characteristic_reviews.forEach((review) => {
          value += review.value;
        })
        value = value / characteristic.characteristic_reviews.length;

        formattedCharacteristics[characteristic.name] = {
          id: characteristic.id,
          value: value
        };
      });
      let response = {
        product_id: product_id,
        ratings: ratings,
        recommended: recommend,
        characteristics: formattedCharacteristics
      }
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
  };

exports.postReview = ((req, res) => {
  console.log('post request body: ', req.body);
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