var router = require('express').Router();
var controller = require('../controller');

router.get('/headlines', function (req, res) {
	controller.getHeadlines(req.query);
});

//Scrape for articles and add new ones to database
router.get('/fetch', function (req, res) {
	controller.scrape()
});

module.exports = router;
