// data
// "name"
// "address"
//  -street
//  -city
//  -state
//  -zipcode
//  -country
//  -
// "description"
// "phone"
// "nearest airport"
// "url"
// "ranking"
// "stars"

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

const seedHotels = () => {
    const data = [];
    for(let i = 0; i < 3; i++) {
        const name = faker.name.findName();
        const address = generateAddress();
        const phone = faker.phone.phoneNumber();
        const url = faker.internet.url(); 
        const description = faker.lorem.sentence();
        const nearestAirport = faker.lorem.word() + " Airport";
        const ranking = faker.random.number(5); 
        const stars = faker.random.number(5);

        const entry = [name, address, description, phone, nearestAirport, url, ranking, stars];
        data.push(entry);
    }
    // let columns = {
    //     id: 'id',
    //     name: 'Name'
    //     address: ''
    //   };
    console.log(data);
    stringify(data, (err, output) => {
        if(err){
            console.log("can't make into csv string",err)
        } else {
            fs.writeFile('./files/Hotels.csv', output , function(err){
                if(err){
                    console.log("error writing file");
                } else {
                    console.log("wrote Hotels.csv file");
                }
            });
        }
    })
}
seedHotels();
