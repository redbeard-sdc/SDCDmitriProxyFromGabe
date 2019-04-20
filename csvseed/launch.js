const {seedAnswers} = require("./AnswersCSV");
const {seedReviews} = require("./ReviewsCSV");
const {seedHotels} = require("./HotelsCSV");
const {seedUsers} = require("./UsersCSV");


const limit = 5;
seedAnswers(limit);
seedReviews(limit);
seedHotels(limit);
seedUsers(limit);