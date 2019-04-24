DROP TABLE IF EXISTS answers;
CREATE Table answers(
    id serial PRIMARY KEY,
    aname varchar(255),
    street varchar(255),
    city varchar(255),
    astate varchar(255),
    zip varchar(255),
    country varchar(255),
    adescription varchar(255),
    phone varchar(255),
    nearest_airport varchar(255),
    aurl varchar(255),
    ranking integer,
    stars integer
);

COPY users(id,username,personname,city,astate,contributions,helpful_votes) 
FROM '/Hotel.csv' DELIMITER ',' CSV HEADER;
