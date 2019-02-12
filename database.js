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
		}
	}
	// db.close()

}

module.exports = {DatabaseAPI}