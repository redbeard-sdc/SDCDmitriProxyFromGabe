DROP TABLE IF EXISTS photos;
CREATE Table photos(
    id serial PRIMARY KEY,
    reviewid integer,
    aurl varchar(255),
    adate bigint,
    adescription varchar(255),
    likes integer,
    category varChar(255)
);

COPY photos(id,reviewid,aurl,adate,adescription,likes,category) 
FROM '/Photos.csv' DELIMITER ',' CSV HEADER;

--   photos
--       - id
--       - reviewid
--       - url
--       - date
--       - description
--       - likes
--       - category
