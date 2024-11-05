var express = require('express');
var axios = require('axios')
var cheerio = require('cheerio')
const {log} = require("debug");
var router = express.Router();


var apiSite = "https://www.0123movies.me"

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/latest-movies/:page', async function(req, res, next) {
    var results = await axios.get(`${apiSite}/movies/page/${req.params.page}`);
    const $ = cheerio.load(results.data);
    var movies = $('ul.MovieList').children('li')
    var moviesList = [];
    movies.map(function() {
        var name = $(this).find('h2').text()
        if(name != ""){
            var movie = {
                id: $(this).find('a').attr('href'),
                name: name,
                img: $(this).find('div.Image figure img').attr('data-src'),
                year: $(this).find('div.Image span').text()
            }
            moviesList.push(movie);
        }
    })

    res.json({page: req.params.page,data: moviesList});
})
router.get('/popular-movies/:page', async function(req, res, next) {
    var results = await axios.get(`${apiSite}/popular-movies/page/${req.params.page}`);
    const $ = cheerio.load(results.data);
    var movies = $('ul.MovieList').children('li')
    var moviesList = [];
    movies.map(function() {
        var name = $(this).find('h2').text()
        if(name != ""){
            var movie = {
                id: $(this).find('a').attr('href'),
                name: name,
                img: $(this).find('div.Image figure img').attr('data-src'),
                year: $(this).find('div.Image span').text(),
            }
            moviesList.push(movie);
        }
    })

    res.json({page: req.params.page,data: moviesList});
})

module.exports = router;
