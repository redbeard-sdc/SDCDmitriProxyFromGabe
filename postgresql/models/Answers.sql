DROP TABLE IF EXISTS answers;
CREATE Table answers(
    id serial PRIMARY KEY,
    userid integer,
    adate integer,
    votes integer
);

COPY users(id,username,personname,city,astate,contributions,helpful_votes) 
FROM '/Answer.csv' DELIMITER ',' CSV HEADER;