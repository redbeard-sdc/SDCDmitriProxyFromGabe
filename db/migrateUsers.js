const csv = require('csv-parser')
const fs = require('fs')
const path  = require('path');
const AWS = require("aws-sdk");
const makeUserTable = require("./models/User").makeUsertable;
AWS.config.update({
  region: "us-east-1",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();


//['id', 'username', 'name', 'address', 'contributions', 'helpful_votes'];

makeUserTable();
console.log("made table");
fs.createReadStream(path.join(__dirname,"../csvseed/files/Users.csv"))
  .pipe(csv())
  .on('data', (data) =>{
    async function additem(){
      var params = {
        TableName: "Users",
        Item: {
          "id":parseInt(data.id),
          "username":data.username,
          "name":data.name,
          "address":data.address,
          "contributions":data.contributions,
          "helpful_votes":data.helpful_votes
        }
      }
      await docClient.put(params, function(err, response) {
        //console.log(data);
        if (err) {
            console.error("Unable to add user", ". Error JSON:", JSON.stringify(err, null, 2));
            //throw err;
        } else {
            console.log("PutItem succeeded:", data.id);
        }
      });
    }
    additem();
  })



//   var AWS = require("aws-sdk");
// var fs = require('fs');

// AWS.config.update({
//     region: "us-west-2",
//     endpoint: "http://localhost:8000"
// });

// var docClient = new AWS.DynamoDB.DocumentClient();

// console.log("Importing movies into DynamoDB. Please wait.");

// var allMovies = JSON.parse(fs.readFileSync('moviedata.json', 'utf8'));
// allMovies.forEach(function(movie) {
//     var params = {
//         TableName: "Movies",
//         Item: {
//             "year":  movie.year,
//             "title": movie.title,
//             "info":  movie.info
//         }
//     };

//     docClient.put(params, function(err, data) {
//        if (err) {
//            console.error("Unable to add movie", movie.title, ". Error JSON:", JSON.stringify(err, null, 2));
//        } else {
//            console.log("PutItem succeeded:", movie.title);
//        }
//     });
// });