DROP TABLE IF EXISTS questions;
CREATE Table questions(
    id serial PRIMARY KEY,
    reviewid  integer,
    adate  bigint,
    question  varchar(255)
);

COPY questions(id,reviewid,adate,question)
FROM '/Questions.csv' DELIMITER ',' CSV HEADER;


--      questions
--          - id
--          - userid
--          - date
--          - question
