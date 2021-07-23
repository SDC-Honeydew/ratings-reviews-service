const router = require('express').Router();
const controllers = require('./controllers.js');

router.get('/reviews/', controllers.get);
router.get('/reviews/meta', controllers.getMeta);
router.post('/reviews', controllers.postReview);
router.put('/reviews/:review_id/helpful', controllers.helpful);
router.put('/reviews/:review_id/report', controllers.report);

module.exports = router;