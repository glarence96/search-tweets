const router = require('express').Router();
const { validate } = require('../validators/validator');
const { fetchTweetsValidator } = require('../validators/twitter.validator');
const twitterController = require('../controllers/twitter.controller');

router.get('/tweets', fetchTweetsValidator(), validate, twitterController.fetchTweets);
router.get('/stream/rules', twitterController.getRules)
router.post('/stream/rules', twitterController.addRules)

module.exports = router