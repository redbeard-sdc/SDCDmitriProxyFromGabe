const csv = require('csv-parser')
const fs = require('fs')
const path  = require('path');
const AWS = require("aws-sdk");
const makeUserTable = require("./models/User").makeUsertable;
const deleteUserTable = require("./models/User").deleteUsertable;
AWS.config.update({
  region: "us-east-1",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'})

//['id', 'username', 'name', 'address', 'contributions', 'helpful_votes'];

deleteUserTable();
makeUserTable();
console.log("made table");
const batchsize = 25;
let batch = [];
fs.createReadStream(path.join(__dirname,"../csvseed/files/Users.csv"))
  .pipe(csv())
  .on('data', (data) =>{
    batch.push(data);
    async function additem(batch){
      var params = {
        RequestItems: {
          "Users": []
        }
      }
      for(item of batch){
        const req = {
          PutRequest: {
            Item: {
              "id":{"S":item.id},
              "username":{"S":item.username},
              "name":{"S":item.name},
              "address":{"S":item.address},
              "contributions":{"S":item.contributions},
              "helpful_votes":{"S":item.helpful_votes}
            }
          }
        }
        params.RequestItems["Users"].push(req);
      }
      await ddb.batchWriteItem(params, function(err, response) {
        //console.log(data);
        if (err) {
            console.error("Unable to add user", ". Error JSON:", JSON.stringify(err, null, 2));
            //throw err;
        } else {
            console.log("PutItem succeeded batch:", Math.floor(data.id/batchsize));
        }
      });
    }
    if(batch.length === batchsize){
      additem(batch);
      batch= [];
    }
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