

module.exports .dbSchema = `CREATE TABLE IF NOT EXISTS Users (
        id integer NOT NULL PRIMARY KEY,    
        email text NOT NULL UNIQUE,
        first_name text,
        last_name text
    );
    CREATE TABLE IF NOT EXISTS event (
        id integer NOT NULL PRIMARY KEY,
        user_id integer NOT NULL UNIQUE,
        event_name text NOT NULL,
            FOREIGN KEY (user_id) REFERENCES Users(id)
    );`