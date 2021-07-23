const models = require('./models.js');

exports.get = (req, res) => {

  const { page, count, sort, product_id } = req.query;

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
      // res.status(200).send(reviewsMeta);
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    })

  };

  exports.postReview = ((req, res) => {

    models.postReview(req.body)
      .then((response) => {
        res.status(201).send('CREATED');
      })
      .catch((err) => {
        res.status(500).send(err);
      })
  });

  exports.helpful = ((req, res) => {
    res.status(204).send('THIS ROUTE WILL RESPOND WITH: NO CONTENT');
  });

  exports.report = ((req, res) => {
    res.status(204).send('THIS ROUTE WILL RESPOND WITH: NO CONTENT');
  });

  // return models.getReviewsMeta(product_id)
  //   .then(reviews => res.status(200).send(reviews));

  // return models.getCharacteristicsMeta(product_id)
  //   .then((characteristicsMeta) => {

      // // format the characteristicsMeta obj -- naive implementation MAKE THIS A HELPER FUNCTION
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

      // let response = {
      //   product_id: product_id,
      //   ratings: {},
      //   recommended: {},
      //   characteristics: formattedCharacteristics
      // }
  //     res.status(200).send(response);
  //   })
  //   .catch((err) => {
  //     res.status(500).send(err);
  //   })

