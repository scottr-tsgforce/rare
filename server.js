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

app.get('/findUserByEmail', function(req, res,next){
    DB.findUserByLogin(req.query.email, function(err, result){
    										res.status(200).json(result);
    } );
});
app.get('/getAllUsers', function(req,res,next){
    DB.findAllUsers(function(err, result){
    			res.send(result);
    			console.log(err);
    } );
});
app.get('/getChallengesIdUsers', function(req,res,next){
    DB.findUsersByChallengeId(req.query.challengeId, function(err, result){
    			res.send(result);
    			console.log(err);
    } );
});
app.get('/getChallengeById', function(req,res,next){
    DB.findChallengeById(req.query.challengeId, function(err, result){
    			res.send(result);
    			console.log(err);
    } );
});

app.get('/getHashtagById', function(req,res,next){
    DB.findHastagById(req.query.hashtagID, function(err, result){
    			res.send(result);
    			console.log(err);
    } );
});
app.post('/addUsers', function(req, res){
	console.log(req);
    DB.registerUser(req.query.email, req.query.first_name, req.query.last_name);
    res.send("added user!");
});

app.post('/addChallenge', function(req, res){
	console.log(req);
    DB.addChallenge(req.query.id,req.query.challengeName, req.query.startDate, req.query.endDate,req.query.hashtagId, req.query.description);
    res.send("added challenge!");
});
app.post('/addHashtag', function(req, res){
	console.log(req);
    DB.addHashtag(req.query.id,req.query.hashtag_name);
    res.send("added hashtag!");
});

//user registering for challenge- they are going to send challenge id, 
//post for user registrationm 
app.post('/addUserToChallenge', function(req, res){
	console.log(req);
    DB.addUserToChallenge(req.query.user_id, req.query.challengeId);
    res.send("connected user to a challenge!");
});

app.listen(3000);