const {seedAnswers} = require("./AnswersCSV");
const {seedReviews} = require("./ReviewsCSV");
const {seedHotels} = require("./HotelsCSV");
const {seedUsers} = require("./UsersCSV");


const limit = 1000;
batchsize = 10;

const promiseHotels = seedHotels(limit,batchsize);
Promise.all(promiseHotels).then(() => {console.log("done seeding hotels")});

const promiseUsers = seedUsers(limit,batchsize);
Promise.all(promiseUsers).then(() => {console.log("done seeding users")});

const promiseReviews = seedReviews(limit,batchsize);
Promise.all(promiseReviews).then(() => {console.log("done seeding reviews")});

const promiseAnswers = seedAnswers(limit,batchsize);
Promise.all(promiseAnswers).then(() => {console.log("done seeding answers")});
