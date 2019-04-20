// Hotels
//   "name"
//   "address"
//      -street
//      -city
//      -state
//      -zipcode
//      -country
//   "description"
//   "phone"
//   "nearest airport"
//   "url"
//   "ranking"
//   "stars"

const fs = require('fs');
const stringify = require('csv-stringify')
const faker = require('faker');
const generateAddress = () => {
    const address = {};
    address.street = faker.address.streetAddress();
    address.city = faker.address.city();
    address.state = faker.address.state();
    address.zipcode = faker.address.zipCode();
    address.country = 'United States';
    return address;
};

const hotelBatch = (batchnum,batchsize) => {
    const data = [];
    const dataheader = ['id', 'name', 'address', 'description', 'phone', 'nearestAirport', 'url', 'ranking', 'stars'];
    for(let i = 0; i < batchsize; i++) {
        const id = batchnum*batchsize + i;
        const name = faker.name.findName();
        const address = generateAddress();
        const phone = faker.phone.phoneNumber();
        const url = faker.internet.url(); 
        const description = faker.lorem.sentence();
        const nearestAirport = faker.lorem.word() + " Airport";
        const ranking = faker.random.number(5); 
        const stars = faker.random.number(5);

        const entry = [id, name, address, description, phone, nearestAirport, url, ranking, stars];
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
                fs.appendFile('./files/Hotels.csv',output,function(err){
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


const seedHotels = (limit, batchsize) => {
    var count = limit;
    const promises = [];
    const dataheader = ['id', 'name', 'address', 'description', 'phone', 'nearestAirport', 'url', 'ranking', 'stars'];
    fs.writeFile('./files/Hotels.csv', dataheader, function(err){
        if(err){
            console.log('couldnt write header, STOPPING...')
        } else {
            console.log('wrote header')
            while(count > 0){
                const batchnum = Math.floor( (limit-count)/batchsize);
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

module.exports = {seedHotels}; 
