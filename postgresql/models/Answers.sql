DROP TABLE IF EXISTS answers;
CREATE Table answers(
    id serial PRIMARY KEY,
    userid integer,
    adate bigint,
    answer varchar(255),
    votes integer
);

COPY answers(id, userid, adate, answer, votes)
FROM '/Answers.csv' DELIMITER ',' CSV HEADER;

--  Answers
--      -user_id
--      -question_id
--      -date
--      -answer
--      -votes