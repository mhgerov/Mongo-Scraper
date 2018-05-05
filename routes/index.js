var router = require('express').Router();

var request = require('request');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index');
});

router.get('/saved', function (req, res) {
	res.render('saved');
});

router.use('/api', require('./api.js'));

module.exports = router;
