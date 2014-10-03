var express = require('express');
var router = express.Router();
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res) {
    var dir = '/Users/primstav/Projects/iterate/rekrutt-commiterate/public/images/gifs/';
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
    var dir = '/Users/primstav/Projects/iterate/rekrutt-commiterate/public/images/gifs/';
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
    var dir = '/Users/primstav/Projects/iterate/rekrutt-commiterate/public/images/gifs/';
    var list = fs.readdirSync(dir);
    var newList = list.map(function(file){
        return {'filename': file, 'ctime': fs.statSync(dir + file).ctime};
    });
    newList = shuffle(newList);
    if(newList.length > 8){
        newList = newList.slice(0, 8);
    }
    res.render('static', {title: 'GIF', src: newList});
});

router.get('/commemorate', function(req, res) {
    var dir = '/Users/primstav/Projects/iterate/rekrutt-commiterate/public/images/commemorate/';
    var list = fs.readdirSync(dir);
    var newList = list.map(function(file){
        return {'filename': file, 'ctime': fs.statSync(dir + file).ctime};
    });

    var sortedList = newList.sort(function(a, b){
        var aDate = new Date(a.ctime);
        var bDate = new Date(b.ctime);
        return bDate - aDate;
    });

    res.render('commemorate', {title: 'GIF', src: sortedList});
});

module.exports = router;
