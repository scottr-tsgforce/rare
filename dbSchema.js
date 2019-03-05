

module.exports .dbSchema = `CREATE TABLE IF NOT EXISTS Users (
        id integer NOT NULL PRIMARY KEY,    
        email text NOT NULL UNIQUE,
        first_name text,
        last_name text,
        instagram_handle text
    );
    CREATE TABLE IF NOT EXISTS challenge (
        id integer NOT NULL PRIMARY KEY,
        challenge_name text NOT NULL,
        start_date datetime NOT NULL,
        end_date datetime NOT NULL,
        hashtags_ids NOT NULL,
        rules text, #ex:photo or video
        points integer, 
        description text          
    );
    CREATE TABLE IF NOT EXISTS challenge_users (
        user_id integer not null, 
        challenge_id integer not null,
        points integer,
        FOREIGN KEY (user_id) REFERENCES Users(id)

   );
   CREATE TABLE IF NOT EXISTS hashtags (
        hashtag_id integer not null,
        hashtag_name text not null
   );`

