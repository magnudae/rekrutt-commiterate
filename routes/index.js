var express = require('express');
var router = express.Router();
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res) {
    var dir = '/Users/primstav/Projects/iterate/rekrutt-lolcommit/public/images/gifs/';
    var list = fs.readdirSync(dir);
    var newList = list.map(function(file){
        return {'filename': file, 'ctime': fs.statSync(dir + file).ctime};
    });

    var sortedList = newList.sort(function(a, b){
        var aDate = new Date(a.ctime);
        var bDate = new Date(b.ctime);
        return bDate - aDate;
    });
    if(sortedList.length > 8){
        sortedList = sortedList.slice(0, 8);
    }
    res.render('index', {title: 'GIF', src: sortedList});
});

router.get('/static', function(req, res) {
    var dir = '/Users/primstav/Projects/iterate/rekrutt-lolcommit/public/images/gifs/';
    var list = fs.readdirSync(dir);
    var newList = list.map(function(file){
        return {'filename': file, 'ctime': fs.statSync(dir + file).ctime};
    });

    var sortedList = newList.sort(function(a, b){
        var aDate = new Date(a.ctime);
        var bDate = new Date(b.ctime);
        return bDate - aDate;
    });
    res.render('static', {title: 'GIF', src: sortedList});
});
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

router.get('/random', function(req, res) {
    var dir = '/Users/primstav/Projects/iterate/rekrutt-lolcommit/public/images/gifs/';
    var list = fs.readdirSync(dir);
    list = shuffle(list);

    if(list.length > 8){
        list = list.slice(0, 8);
    }
    res.render('static', {title: 'GIF', src: list});
});

router.get('/dual', function(req, res) {
    var dir = '/Users/primstav/Projects/iterate/rekrutt-lolcommit/public/images/gifs/';
    var list = fs.readdirSync(dir);
    var newList = list.map(function(file){
        return {'filename': file, 'ctime': fs.statSync(dir + file).ctime};
    });

    var sortedList = newList.sort(function(a, b){
        var aDate = new Date(a.ctime);
        var bDate = new Date(b.ctime);
        return bDate - aDate;
    });
    if(sortedList.length > 4){
        sortedList = sortedList.slice(0, 4);
    }
    var randomList = shuffle(sortedList.slice(4));
    if(randomList.length > 4){
        randomList = randomList.slice(0, 4);
    }
    res.render('static', {title: 'GIF', top: sortedList, random: randomList});
});

module.exports = router;
