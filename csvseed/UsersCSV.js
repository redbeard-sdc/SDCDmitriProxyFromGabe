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
const seedUsers = (limit) => {
    const data = [];
    const dataheader = ['id', 'username', 'name', 'address', 'contributions', 'helpful_votes'];
    for(let i = 0; i < limit; i++) {
        const id = i;
        const username = faker.internet.userName();
        const name = faker.name.findName();
        const address = generateAddress();
        const contributions = faker.random.number(10000); 
        const helpful_votes = faker.random.number(10000);
        const entry = [id, username, name, address, contributions, helpful_votes];
        data.push(entry);
    }
    data.unshift(dataheader);

    stringify(data, (err, output) => {
        if(err){
            console.log("can't make into csv string",err)
        } else {
            fs.writeFile('./files/Users.csv', output , function(err){
                if(err){
                    console.log("error writing file");
                } else {
                    console.log("wrote Hotels.csv file");
                }
            });
        }
    })
}

module.exports = {seedUsers};