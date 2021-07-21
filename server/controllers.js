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

  return models.getCharacteristicsMeta(product_id)
    .then((characteristicsMeta) => {

      // format the characteristicsMeta obj -- MAKE THIS A HELPER FUNCTION
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
        ratings: {},
        recommended: {},
        characteristics: formattedCharacteristics
      }
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    })

};