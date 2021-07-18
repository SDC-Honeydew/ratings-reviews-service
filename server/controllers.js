const models = require('./models.js');

exports.get = (req, res) => {
  return models.get()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
}