var router = require('express').Router();
var controller = require('../controller');

//Retrieve headlines based off query parameters
router.get('/headlines', function (req, res) {
	controller.getHeadlines(req.query, (docs) => {
		res.json(docs);
	});
});

//Update Headline property
router.put('/headlines', function (req,res) {
	controller.update(req, function() {
		res.json({ok:true});
	});
});

//Delete Headline in saved section
router.delete('/headlines/:id', function (req,res) {
	controller.delHeadline(req, ()=> {
		res.json({ok:true});
	});
});

//Scrape for articles and add new ones to database
router.get('/fetch', function (req, res) {
	controller.scrape((count)=>res.json({message:count+' articles found'}));
});

//Retrieve notes based off Article _id
router.get('/notes/:id', function (req,res) {
	controller.getNotes(req, (data) => {
		res.json(data);
	});
});

router.delete('/notes/:id', function (req,res) {
	console.log('Routes: '+req.params.id);
	controller.delNote(req, () => res.sendStatus(200));	
});

router.post('/notes', function (req, res) {
	controller.newNote(req, ()=>res.sendStatus(200));
});

module.exports = router;
