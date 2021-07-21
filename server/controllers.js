const models = require('./models.js');

exports.get = (req, res) => {
  console.log(req.query);
  const { page, count, sort, product_id } = req.query;

  // get the reviews

  // get the photos that go with each review and add them to the res object

  return models.getReviews(page, count, sort, product_id)
    // .then((reviews) => {
    //   return Promise.all(reviews.map((review) => {
    //     getReviewPhotos(review.id);
    //   }))
    // })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
}