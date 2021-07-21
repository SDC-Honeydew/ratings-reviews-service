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

  return models.getMeta(product_id)
    .then((meta) => {
      res.status(200).send(meta);
    })
    .catch((err) => {
      res.status(500).send(err);
    })

};