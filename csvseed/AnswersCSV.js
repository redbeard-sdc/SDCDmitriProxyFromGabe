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

const answerBatch = (batchnum,batchsize,limit) => {
    const data = [];
    for(let i = 0; i < batchsize; i++) {
        const userid = generateRandomNumber(limit);
        const id = batchsize* batchnum + i;
        const date = faker.date.between('2019-02-01', '2019-05-31');
        const answer = faker.lorem.sentence();
        const votes = faker.random.number(10000);
        const entry = [id, userid, date, answer, votes];
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
                fs.appendFile('./files/Answers.csv',output,function(err){
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

const seedAnswers = (limit, batchsize) => {
    var count = limit;
    const promises = [];
    const dataheader = ['id','userid','date','answer', 'votes']
    fs.writeFile('./files/Answers.csv', dataheader, function(err){
        if(err){
            console.log('couldnt write header, STOPPING...')
        } else {
            console.log('wrote header')
            while(count > 0){
                const batchnum = Math.floor( (limit-count)/batchsize);
                const databatch = answerBatch(batchnum,batchsize,limit);
                const apromise = makebatchpromise(databatch,batchnum);
                promises.push(apromise);
                count-=batchsize;
                console.log("started entries: ",limit-count);
            }
            return promises;
        }

    })
    return [];
}
const promiselist=seedAnswers(10000,100);
Promise.all(promiselist).then(() => {console.log("done seeding")});

module.exports = {seedAnswers};
