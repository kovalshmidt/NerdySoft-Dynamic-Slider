/**
 * Created by Shmidt on 01.06.2017.
 */
// var http = require("http");
var express = require('express');
var app = express();



app.get('/get', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.end("" +Math.floor(Math.random() * 100)+ "");

});

var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)

});
