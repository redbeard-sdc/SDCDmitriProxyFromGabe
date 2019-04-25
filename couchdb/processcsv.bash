curl -X DELETE http://localhost:5984/users
curl -X PUT http://localhost:5984/users
cat ../csvseed/files/Users.csv | couchimport --url http://localhost:5984 --db users --buffer 1000 --parallelism 8 --delimiter ","


curl -X DELETE http://localhost:5984/hotels
curl -X PUT http://localhost:5984/hotels
cat ../csvseed/files/Hotels.csv | couchimport --url http://localhost:5984 --db hotels --buffer 1000 --parallelism 8 --delimiter ","


curl -X DELETE http://localhost:5984/reviews
curl -X PUT http://localhost:5984/reviews
cat ../csvseed/files/Reviews.csv | couchimport --url http://localhost:5984 --db reviews --buffer 1000 --parallelism 8 --delimiter ","


curl -X DELETE http://localhost:5984/answers
curl -X PUT http://localhost:5984/answers
cat ../csvseed/files/Answers.csv | couchimport --url http://localhost:5984 --db answers --buffer 1000 --parallelism 8 --delimiter ","


curl -X DELETE http://localhost:5984/roomtips
curl -X PUT http://localhost:5984/roomtips
cat ../csvseed/files/RoomTips.csv | couchimport --url http://localhost:5984 --db roomtips --buffer 1000 --parallelism 8 --delimiter ","


curl -X DELETE http://localhost:5984/photos
curl -X PUT http://localhost:5984/photos
cat ../csvseed/files/Photos.csv | couchimport --url http://localhost:5984 --db photos --buffer 1000 --parallelism 8 --delimiter ","


curl -X DELETE http://localhost:5984/questions
curl -X PUT http://localhost:5984/questions
cat ../csvseed/files/Questions.csv | couchimport --url http://localhost:5984 --db questions --buffer 1000 --parallelism 8 --delimiter ","