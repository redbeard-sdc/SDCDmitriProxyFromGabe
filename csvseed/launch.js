const {seedAnswers} = require("./AnswersCSV");
const {seedReviews} = require("./ReviewsCSV");
const {seedHotels} = require("./HotelsCSV");
const {seedUsers} = require("./UsersCSV");


const limit = 10000000;
batchsize = 1000;

seedHotels(limit,batchsize);
console.log("done seeding hotels");

seedUsers(limit,batchsize);
console.log("done seeding users");

seedReviews(limit,batchsize);
console.log("done seeding reviews");

seedAnswers(limit,batchsize);
console.log("done seeding answers");


console.log("done seeding with everything");
