const router = require('express').Router();
const controllers = require('./controllers.js');

router.get('/reviews/', controllers.get);
router.get('/reviews/meta', controllers.getMeta);

module.exports = router;