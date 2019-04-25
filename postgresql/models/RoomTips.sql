DROP TABLE IF EXISTS roomtips;
CREATE Table roomtips(
    id serial PRIMARY KEY,
    reviewid  integer,
    adate  bigint,
    tip varchar(255),
    rating integer
);

COPY roomtips(id,reviewid,adate,tip,rating)
FROM '/RoomTips.csv' DELIMITER ',' CSV HEADER;


--      roomTips
--           - id
--           - reviewid
--           - date
--           - tip
--           - rating