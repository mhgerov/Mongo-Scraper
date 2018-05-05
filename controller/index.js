var models = require('../models');
var request = require('request');
var cheerio = require('cheerio');
module.exports = {}

module.exports.getHeadlines = function (query, cb) {
	models.Article.find(query, null, function (err, docs) {
		cb(docs);
	});
}

module.exports.scrape = function (cb) {
	request('https://www.nytimes.com/section/us', (err, res, body) => {
		if (err) console.log('Request Error: '+err);
		var $ = cheerio.load(body);
		var articles = [];
		var count = 0;
		$('ol.initial-set').each(function() {
			//').each(function() {
			if (count<1) {
				$(this).find('li[id^="story"]').each(function() {
					var article = {};
					//url
					article.url = $(this).find('a').attr('href'); 
					//headline
					article.headline = $(this).find('.headline').text().trim();
					//summary
					article.summary = $(this).find('.summary').text().trim();
					//date
					article.date = $(this).find('time').attr('content');
					//saved
					article.saved = false;
					//Add to articles array
					articles.push(article);
				});
				count++;
			}
		});
		//console.log(articles);
		console.log('Number articles scraped: '+articles.length);
		models.Article.create(articles, function (err, objs) {	
			if(err) console.log(err);
			//Callback function
			cb();
		});
	});
}

module.exports.update = function(req, cb) {
	var filter = {_id:req.body._id};
	var changes = req.body;
	delete changes._id;
	models.Article.update(filter, changes, () => cb());	
}

module.exports.del = function(req, cb) {
	models.Article.deleteOne({_id:req.params.id}, () => cb());
}
