const express = require('express');
const path = require('path')

const app = express();

app.use( function( req, res, next){
    console.log( req.url);
    next();
})

app.use( '/scripts', express.static(path.join(__dirname, '/scripts')));
app.use( '/style', express.static(path.join(__dirname, '/style')));
app.get( '/index.html', function(req, res){
    res.sendFile( path.join(__dirname, '/index.html'));
});

app.listen(3000);