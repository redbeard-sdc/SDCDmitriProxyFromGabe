DROP TABLE IF EXISTS answers;
CREATE Table answers(
    id serial PRIMARY KEY,
    userid integer,
    hotelid integer,
    adate integer,
    alanguage varchar(255),
    title varchar(255),
    adescription varchar(255),
    traveler_type varchar(255),
    ratingsid integer,
    photosid integer,
    questionsid integer
);

COPY users(id,username,personname,city,astate,contributions,helpful_votes) 
FROM '/Review.csv' DELIMITER ',' CSV HEADER;

-- //  reviews
-- //     user_id
-- //     hotel_id
-- //     date
-- //     language
-- //     title
-- //     description
-- //     traveler_type
-- //     ratings:
-- //          - overall
-- //          - location
-- //          - cleanliness
-- //          - service
-- //          - sleep_quality
-- //     roomTips
-- //          - date
-- //          - tip
-- //          - rating
-- //     photos
-- //          - url
-- //          - date
-- //          - description
-- //          - likes
-- //          - category
-- //     questions
-- //          - date
-- //          - question