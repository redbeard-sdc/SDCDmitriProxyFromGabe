docker cp ./models/Users.sql friendly_meitner:Users.sql
docker cp ./models/Answers.sql friendly_meitner:Answers.sql
docker cp ./models/Reviews.sql friendly_meitner:Reviews.sql
docker cp ./models/Hotels.sql friendly_meitner:Hotels.sql
docker cp ./models/Photos.sql friendly_meitner:Photos.sql
docker cp ./models/RoomTips.sql friendly_meitner:RoomTips.sql
docker cp ./models/Questions.sql friendly_meitner:Questions.sql


# docker cp ../csvseed/files/Users.csv friendly_meitner:Users.csv
# docker cp ../csvseed/files/Answers.csv friendly_meitner:Answers.csv
# docker cp ../csvseed/files/Reviews.csv friendly_meitner:Reviews.csv
# docker cp ../csvseed/files/Hotels.csv friendly_meitner:Hotels.csv
# docker cp ../csvseed/files/Photos.csv friendly_meitner:Photos.csv
# docker cp ../csvseed/files/RoomTips.csv friendly_meitner:RoomTips.csv
# docker cp ../csvseed/files/Questions.csv friendly_meitner:Questions.csv

docker cp ./launchpsql.bash friendly_meitner:launchpsql.bash