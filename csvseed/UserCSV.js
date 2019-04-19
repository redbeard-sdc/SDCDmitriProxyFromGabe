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
const faker = require('faker');
const generateAddress = () => {
    const address = {};
    address.city = faker.address.city();
    address.state = faker.address.state();
    return address;
};

for(let i = 0; i< 1; i++) {
  const username = fake.internet.username();
  const name = faker.name.findName();
  const location = generateAddress();
  const phone = faker.phone.phoneNumber();
  const url = faker.internet.url(); 
  const description = faker.lorem.sentence;
  const nearestAirport = faker.lorem.word + "Airport";
  const ranking = faker.random.number(5); 
  const stars = faker.random.number(5);

  const str = `${username}, ${name}, ${location},${description},${phone},${nearestAirport},${url},${ranking},${stars}`;
  console.log(str);
  fs.writeFile('./files/Hotels.csv', "str", function(err){
    
  });
}