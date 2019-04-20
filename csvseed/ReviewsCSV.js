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
//     photos
//          - url
//          - date
//          - description
//          - likes
//          - category
//     questions
//          - date
//          - question

const fs = require('fs');
const stringify = require('csv-stringify')
const faker = require('faker');
const {pickEnym,generateRandomNumber, imagesenym} = require("./iterfunctions");

const generateAddress = () => {
    const address = {};
    address.city = faker.address.city();
    address.state = faker.address.state();
    return address;
};

const generatePhoto = () => {
    const photo = {};
    const num = generateRandomNumber(8);
    photo.url = pickEnym(imagesenym);
    photo.date = faker.date.between('2019-02-01', '2019-05-31');
    photo.description = faker.lorem.paragraph();
    photo.likes = generateRandomNumber(1000);
    photo.category = pickEnym([
        'Traveler',
        'Room & Suite',
        'Dining',
        'Pool & Beach',
        'Business Center & Event Rooms',
        'Family and Play Areas',
    ]);  
    return photo;
};

const RoomTip = () => {
    let roomtip = {}
    roomtip.date = faker.date.past();
    roomtip.tip = faker.lorem.sentence();
    roomtip.rating = Math.round(Math.random() * 5);
    return roomtip;
};

const generateRoomTips = () => {
    roomtips = [];
    var tips = generateRandomNumber(5);
    for (let i=0; i< tips; i++){
        roomtips.push(RoomTip());
    }
    return roomtips;
}

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
    question.question = faker.lorem.sentence();
    return question;
};

const generateQuestions = () => {
    questions = [];
    var tips = generateRandomNumber(5);
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
        const address = generateAddress();
        const contributions = faker.random.number(10000); 
        const helpful_votes = faker.random.number(10000);
        const rating = generateRating();
        const questions = generateQuestions();
        const roomtips = generateRoomTips();
        const photos = generatePhoto();
        const entry = [id, userid, hotelid, username, name, address, contributions,roomtips, helpful_votes, rating, questions, photos];
        data.push(entry);
    }
    return data;
}
const makebatchpromise = (databatch,batchnum) => {
    return new Promise((resolve,reject) => {
        stringify(databatch,(err,output) => {
            if(err) {
                console.log(`batch ${batchnum} of hotels failed to stringify`);
                resolve();
            } else {
                fs.appendFile('./files/Reviews.csv',output,function(err){
                    if(err){
                        console.log(`batch ${batchnum} of hotels failed to stringify`);
                        resolve();
                    } else {
                        console.log(`wrote batch ${batchnum}`);
                        resolve();
                    }
                })
            }
        })
    })
}

const seedReviews = (limit, batchsize) => {
    var count = limit;
    const promises = [];
    const dataheader = ['id','userid', 'hotelid','username', 'name' , 'address', 'contributions','room_tips', 'helpful_votes', 'rating', 'questions', 'photos']
    fs.writeFile('./files/Reviews.csv', dataheader, function(err){
        if(err){
            console.log('couldnt write header, STOPPING...')
        } else {
            console.log('wrote header')
            while(count > 0){
                const batchnum = Math.floor( (limit-count)/batchsize);
                const databatch = reviewBatch(batchnum,batchsize,limit);
                const databatch = hotelBatch(batchnum,batchsize);
                makebatchpromise(databatch,batchnum).then(()=>{
                    count-=batchsize;
                });
            }
            return promises;
        }

    })
    return [];
}

module.exports = {seedReviews};