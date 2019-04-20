// Answers
//     user_id
//     question_id
//     date
//     answer
//     votes

const fs = require('fs');
const stringify = require('csv-stringify')
const faker = require('faker');
const {generateRandomNumber} = require("./iterfunctions");

const seedAnswers = (limit) => {
    const data = [];
    const dataheader = ['id','userid','date','answer', 'votes']
    for(let i = 0; i < limit; i++) {
        const userid = generateRandomNumber(limit);
        const id = i;
        const date = faker.date.between('2019-02-01', '2019-05-31');
        const answer = faker.lorem.sentence();
        const votes = faker.random.number(10000);
        const entry = [id, userid, date, answer, votes];
        data.push(entry);
    }
    data.unshift(dataheader);

    stringify(data, (err, output) => {
        if(err){
            console.log("can't make into csv string",err)
        } else {
            fs.writeFile('./files/Answers.csv', output , function(err){
                if(err){
                    console.log("error writing file");
                } else {
                    console.log("wrote Answers.csv file");
                }
            });
        }
    })
}

module.exports = {seedAnswers};
