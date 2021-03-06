var express = require('express');
var router = express.Router();
var config = require('../config/config');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res) {
    var dir = config.homeDirectory + '/public/images/gifs/';
    var list = fs.readdirSync(dir);
    var newList = list.map(function(file){
        return {'filename': file, 'ctime': fs.statSync(dir + file).ctime, size: fs.statSync(dir + file).size};
    }).filter(function(file){
        var now = new Date().getTime();
        var fileDate = new Date(file.ctime).getTime();
        return (file.size > 1000000) || (now - fileDate > 8000);
    }).filter(function(file){
        return file.filename !== '.DS_Store';
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
    var dir = config.homeDirectory + '/public/images/gifs/';
    var list = fs.readdirSync(dir);
    var newList = list.map(function(file){
        return {'filename': file, 'ctime': fs.statSync(dir + file).ctime};
    });

    var sortedList = newList.sort(function(a, b){
        var aDate = new Date(a.ctime);
        var bDate = new Date(b.ctime);
        return bDate - aDate;
    }).filter(function(file){
        return file.filename !== '.DS_Store';
    });;

    res.render('static', {title: 'GIF', src: sortedList});
});
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

router.get('/random', function(req, res) {
    var dir = config.homeDirectory + '/public/images/gifs/';
    var list = fs.readdirSync(dir);
    var newList = list.map(function(file){
        return {'filename': file, 'ctime': fs.statSync(dir + file).ctime};
    }).filter(function(file){
        return file.filename !== '.DS_Store';
    });;
    newList = shuffle(newList);
    if(newList.length > 8){
        newList = newList.slice(0, 8);
    }
    res.render('static', {title: 'GIF', src: newList});
});

router.get('/commemorate', function(req, res) {
    var dir = config.homeDirectory + '/public/images/commemorate/';
    var list = fs.readdirSync(dir);
    var newList = list.map(function(file){
        return {'filename': file, 'ctime': fs.statSync(dir + file).ctime};
    });

    var sortedList = newList.sort(function(a, b){
        var aDate = new Date(a.ctime);
        var bDate = new Date(b.ctime);
        return bDate - aDate;
    }).filter(function(file){
        return file.filename !== '.DS_Store';
    });;

    res.render('commemorate', {title: 'GIF', src: sortedList});
});

module.exports = router;
