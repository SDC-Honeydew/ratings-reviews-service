const router = require('express').Router();
const controllers = require('./controllers.js');

router.get('/', controllers.get);

module.exports = router;