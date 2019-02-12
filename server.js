//server.js
const { DatabaseAPI } = require('./database')
const sqlite3 = require('sqlite3').verbose()
const db_path = './sqlite.db'
const dbMeta = require('./dbSchema')
var express = require('express');
var app = express();

var DB = new DatabaseAPI(db_path, dbMeta.dbSchema)

function printUserEmail(err,userInfo) {
    console.log("User's email is: " + userInfo)
    return userInfo
}

// DB.registerUser("test1@testcom", "test", "test2")
// DB.findUserByLogin('test@testcom')

DB.findUserByLogin('test@testcom', printUserEmail)


app.get('/', function(req,res){
	res.send('Hello world');
});

app.post('/findUserByEmail', function(req, res,next){
    DB.findUserByLogin(req.query.email, function(err, result){
    										res.status(200).json(result);
    } );
});

app.get('/addUsers', function(req, res){
	console.log(req);
    DB.registerUser(req.query.email, req.query.first_name, req.query.last_name);
    
});
app.listen(3000);