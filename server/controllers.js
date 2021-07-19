const models = require('./models.js');

exports.get = (req, res) => {
  console.log(req.query);

  return models.get(req)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
}