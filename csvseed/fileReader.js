const csv = require('csv-parser')
const fs = require('fs')
const path  = require('path');
const results = [];


fs.createReadStream(path.join(__dirname,"/files/Users.csv"))
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);
  });