curl -X PUT http://localhost:5984/users
cat ../csvseed/files/Users.csv | couchimport --url http://localhost:5984 --db users --buffer 1000 --parallelism 8 --delimiter ","

curl -X PUT http://localhost:5984/hotels
cat ../csvseed/files/Hotels.csv | couchimport --url http://localhost:5984 --db hotels --buffer 1000 --parallelism 8 --delimiter ","

curl -X PUT http://localhost:5984/reviews
cat ../csvseed/files/Reviews.csv | couchimport --url http://localhost:5984 --db reviews --buffer 1000 --parallelism 8 --delimiter ","

curl -X PUT http://localhost:5984/answers
cat ../csvseed/files/Answers.csv | couchimport --url http://localhost:5984 --db answers --buffer 1000 --parallelism 8 --delimiter ","