DROP TABLE IF EXISTS users;
CREATE Table users(
    id serial PRIMARY KEY,
    username varchar(255),
    personname varchar(255),
    city varchar(255),
    astate varchar(255),
    contributions integer,
    helpful_votes integer
);

COPY users(id,username,personname,city,astate,contributions,helpful_votes) 
FROM '/User.csv' DELIMITER ',' CSV HEADER;