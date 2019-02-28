// database.js
const sqlite3 = require('sqlite3').verbose()


 
function DatabaseAPI(db_path, dbSchema){

	
	const DB = new sqlite3.Database(db_path, function(err){
            if (err) {
                console.log(err)
                return
            }
            console.log('Connected to ' + db_path + ' database.')

            DB.exec('PRAGMA foreign_keys = ON;', function(error)  {
                if (error){
                    console.error("Pragma statement didn't work.")
                } else {
                    console.log("Foreign Key Enforcement is on.")
                }
            });
        });

    DB.exec(dbSchema, function(err){
        if (err) {
            console.log(err)
        }
    });
	return {
		registerUser: function(email, first_name,last_name){
			var sql = "INSERT INTO Users(email, first_name,last_name) VALUES (?, ?,?)"
			DB.run(sql,[email, first_name,last_name], function(error){
				if(error){
					console.log(error)
				}else{
					console.log("Id:" +this.lastID)
					console.log("# of row changes" + this.changes)
				}
			});

		},
		findUserByLogin: function(email, _callback) { 
		    var sql = 'SELECT first_name, last_name '
		    sql += 'FROM Users '
		    sql += 'WHERE email = ? '
		 
		    DB.all(sql, email, function(error, row) {
	            if (error) {
	                console.log(error)
	                return
	            }
	           
	            _callback(error,row)
	        });
		},
		findAllUsers: function(_callback) { 
		    var sql = 'SELECT id, email, first_name, last_name '
		    sql += 'FROM Users '
		 
		    DB.all(sql, function(error, row) {
	            if (error) {
	                console.log(error)
	                return
	            }
	           
	            _callback(error,row)
	        });
		},
		addChallenge: function(id, name, startDate, endDate, hashtagId, description){
			var sql = "INSERT INTO challenge(id, challenge_name, start_date, end_date, hashtags_ids, description) VALUES (?, ?,?,?,?,?)"
			DB.run(sql,[id, name, startDate, endDate, hashtagId, description], function(error){
				if(error){
					console.log(error)
				}else{
					console.log("Id:" +this.lastID)
					console.log("# of row changes" + this.changes)
				}
			});

		},
		findChallengeById: function(id, _callback) { 
		    var sql = 'SELECT id, challenge_name, start_date, end_date, hashtags_ids, description '
		    sql += 'FROM challenge '
		    sql += 'WHERE id = ? '
		 
		    DB.all(sql, id, function(error, row) {
	            if (error) {
	                console.log(error)
	                return
	            }
	           
	            _callback(error,row)
	        });
		},
		findUsersByChallengeId:  function(challengeId, _callback) { 
		    var sql = 'SELECT Users.id,Users.email, Users.first_name, Users.last_name '
		    sql += 'FROM challenge_users, Users '
		    sql += 'WHERE Users.id = challenge_users.user_id AND challenge_users.challenge_id = ? '
		 
		    DB.all(sql, challengeId, function(error, row) {
	            if (error) {
	                console.log(error)
	                return
	            }
	           
	            _callback(error,row)
	        });
		},
		addUserToChallenge: function(userId, challengeId) { 

		    var sql = 'INSERT INTO CHALLENGE_USERS(user_id, challenge_id, points) VALUES(?,?, 5) '
		  
	        DB.run(sql, [userId, challengeId], function(error){
				if(error){
					console.log(error)
				}else{
					console.log("Id:" +this.lastID)
					console.log("# of row changes" + this.changes)
				}
			});
		},


		findHastagById:  function(hashtagId, _callback) { 
		    var sql = 'SELECT * '
		    sql += 'FROM hashtags '
		    sql += 'WHERE hashtag_id = ?'
		 
		    DB.all(sql, hashtagId, function(error, row) {
	            if (error) {
	                console.log(error)
	                return
	            }
	           
	            _callback(error,row)
	        });
		},
		addHashtag: function(id, hashtag_name) { 

		    var sql = 'INSERT INTO hashtags (HASHTAG_ID, hashtag_name) VALUES(?,?) '
		  
	        DB.run(sql, [id, hashtag_name], function(error){
				if(error){
					console.log(error)
				}else{
					console.log("Id:" +id)
					console.log("# of row changes" + this.changes)
				}
			});
		}
	
	}
	// db.close()

}

module.exports = {DatabaseAPI}