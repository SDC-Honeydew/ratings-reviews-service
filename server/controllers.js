const models = require('./models.js');

exports.get = (req, res) => {
  console.log(req.query);
  const { page, count, sort, product_id } = req.query;

  return models.getReviews(page, count, sort, product_id)
    .then((data) => {
      let response = {
        product: product_id.toString(),
        page: Number(page),
        count: Number(count),
        results: data
      }
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
}