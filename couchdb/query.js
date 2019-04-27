const db = require('couchdb')
const users = (search) => {

}

var db = new CouchDB('database-with-users');
console.log(users(db));