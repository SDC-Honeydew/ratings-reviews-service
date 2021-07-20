const models = require('./models.js');

exports.get = (req, res) => {
  console.log(req.query);
  const { product_id } = req.query;

  return models.getReviews(product_id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
}