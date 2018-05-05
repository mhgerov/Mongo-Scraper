var router = require('express').Router();
var controller = require('../controller');

router.get('/headlines', function (req, res) {
	controller.getHeadlines(req.query, (docs) => {
		res.json(docs);
	});
});

router.put('/headlines', function (req,res) {
	controller.update(req, function() {
		res.json({ok:true});
	});
});

router.delete('/headlines/:id', function (req,res) {
	controller.del(req, ()=> {
		res.json({ok:true});
	});
});

//Scrape for articles and add new ones to database
router.get('/fetch', function (req, res) {
	controller.scrape(()=>res.sendStatus(200));
});

module.exports = router;
