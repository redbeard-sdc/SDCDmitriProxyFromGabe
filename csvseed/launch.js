const {seedAnswers} = require("./AnswersCSV");
const {seedReviews} = require("./ReviewsCSV");
const {seedHotels} = require("./HotelsCSV");
const {seedUsers} = require("./UsersCSV");
const {seedRoomTips} =require("./RoomTipsCSV");
const {seedQuestions} = require("./QuestionsCSV")
const {seedPhotos} = require("./PhotosCSV")

const limit = 100;
batchsize = 10;

seedHotels(limit,batchsize);
console.log("done seeding hotels");

seedUsers(limit,batchsize);
console.log("done seeding users");

seedReviews(limit,batchsize);
console.log("done seeding reviews");

seedAnswers(limit,batchsize);
console.log("done seeding answers");

seedPhotos(limit,batchsize);
console.log("done seeding answers");

seedQuestions(limit,batchsize);
console.log("done seeding answers");

seedRoomTips(limit,batchsize);
console.log("done seeding answers");


console.log("done seeding with everything");
