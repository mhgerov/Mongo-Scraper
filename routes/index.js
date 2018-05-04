var router = require('express').Router();

var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
	request('https://www.nytimes.com/', function (err, resHead, body) {
			res.send(body);
	});
	//res.render('index', { title: 'Express' });
});

router.use('/api', require('./api.js'));

module.exports = router;
