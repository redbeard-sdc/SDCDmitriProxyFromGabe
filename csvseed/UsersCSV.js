// Users
//   username
//   name
//     -first_name
//     -last_nam
//   location
//     -city
//     -state
//   contributions
//   helpful_votes

const fs = require('fs');
const stringify = require('csv-stringify')
const faker = require('faker');
const generateAddress = () => {
    const address = {};
    address.city = faker.address.city();
    address.state = faker.address.state();
    return address;
};
const userBatch = (batchnum,batchsize) => {
    const data = [];
    for(let i = 0; i < batchsize; i++) {
        const id = batchnum * batchsize + i;
        const username = faker.internet.userName();
        const name = faker.name.findName();
        const address = generateAddress();
        const contributions = faker.random.number(10000); 
        const helpful_votes = faker.random.number(10000);
        const entry = [id, username, name, address, contributions, helpful_votes];
        data.push(entry);
    }
    return data
}

var makebatchpromise = (databatch,batchnum) => {
    return new Promise((resolve,reject) => {
        stringify(databatch,(err,output) => {
            if(err) {
                console.log(`batch ${batchnum} of hotels failed to stringify`);
                resolve();
            } else {
                fs.appendFile('./files/Users.csv',output,function(err){
                    if(err){
                        console.log(`batch ${batchnum} of hotels failed to stringify`);
                        resolve();
                    } else {
                        console.log(`wrote batch ${batchnum}`);
                        resolve();
                    }
                });
            }
        });
    });
}

function seedUsers(limit, batchsize){
    var count = limit;
    const dataheader = ['id', 'username', 'name', 'address', 'contributions', 'helpful_votes'];
    fs.writeFile('./files/Users.csv', dataheader, function(err){
        if(err){
            console.log('couldnt write header, STOPPING...')
        } else {
            console.log('wrote header');
            async function seedata(limit,batchsize){
                while(count > 0){
                    const batchnum = Math.floor( (limit-count)/batchsize);
                    let databatch = userBatch(batchnum,batchsize);
                    await makebatchpromise(databatch,batchnum);
                    count-=batchsize;
                }
            }
            seedata(limit,batchsize);
        }
    })
}

module.exports = {seedUsers};