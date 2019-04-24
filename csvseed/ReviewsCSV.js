//  reviews
//     user_id
//     hotel_id
//     date
//     language
//     title
//     description
//     traveler_type
//     ratings:
//          - overall
//          - location
//          - cleanliness
//          - service
//          - sleep_quality
//     roomTips
//          - date
//          - tip
//          - rating

const fs = require('fs');
const stringify = require('csv-stringify')
const faker = require('faker');
const {pickEnym,generateRandomNumber, imagesenym} = require("./iterfunctions");



const generateRating = () => {
    const rand = Math.ceil(Math.random() * 10);
    let rating;
  
    if (rand >= 1 && rand < 4) {
      rating = 5;
    } else if (rand >= 4 && rand < 7) {
      rating = 4;
    } else if (rand >= 7 && rand < 9) {
      rating = 3;
    } else if (rand === 9) {
      rating = 2;
    } else {
      rating = 1;
    }
  
    return rating;
  };

const Question = () => {
    let question = {}
    question.date = faker.date.between('2019-02-01', '2019-05-31');
    question.question = faker.lorem.words(2);
    return question;
};

const generateQuestions = () => {
    questions = [];
    var tips = generateRandomNumber(3);
    for (let i = 0; i < tips; i++){
        questions.push(Question());
    }
    return questions;
}

const reviewBatch = (batchnum,batchsize,limit) => {
    const data = [];
    for(let i = 0; i < batchsize; i++) {
        const hotelid = generateRandomNumber(limit);
        const userid = generateRandomNumber(limit);
        const id =  batchnum * batchsize + i;
        const username = faker.internet.userName();
        const name = faker.name.findName();
        const city = faker.address.city();
        const state = faker.address.state();
        const contributions = faker.random.number(10000); 
        const helpful_votes = faker.random.number(10000);
        const rating = generateRating();
        const entry = [id, userid, hotelid, username, name, city, state, contributions, helpful_votes];
        data.push(entry);
    }
    return data;
}

var makebatchpromise = (databatch,batchnum) => {
    return new Promise((resolve,reject) => {
        stringify(databatch,(err,output) => {
            if(err) {
                console.log(`batch ${batchnum} of reviews failed to stringify`);
                resolve();
            } else {
                fs.appendFile('./files/Reviews.csv',output,function(err){
                    if(err){
                        console.log(`batch ${batchnum} of review failed to write`);
                        resolve();
                    } else {
                        console.log(`wrote batch ${batchnum} of reviews`);
                        resolve();
                    }
                });
            }
        });
    });
}

function seedReviews(limit, batchsize){
    var count = limit;
    const dataheader = ['id','userid', 'hotelid','username', 'name' , 'city', 'state', 'contributions','room_tips', 'helpful_votes', 'rating', 'questions', 'photos\n']
    fs.writeFile('./files/Reviews.csv', dataheader, function(err){
        if(err){
            console.log('couldnt write header, STOPPING...')
        } else {
            console.log('wrote header')
            async function seeddata(limit, batchsize){
                while(count > 0){
                    const batchnum = Math.floor( (limit-count)/batchsize);
                    const databatch = reviewBatch(batchnum,batchsize,limit);
                    await makebatchpromise(databatch,batchnum)
                    count-=batchsize;
                }
            }
            seeddata(limit,batchsize);
        }
    });
}

module.exports = {seedReviews};