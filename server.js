require('dotenv').config();

// call once somewhere in the beginning of the app
var mysql = require("mysql");
const inquirer = require("inquirer");
const dotenv = require('dotenv').config();
const cTable = require('console.table');



// Enable access to .env variables
require('dotenv').config();

// Use environment variables to connect to database
var connection = new mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
// port: 3306
connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Wow, it's connected!");
});


module.exports = mysql;





// console.table([
//   {
//     name: 'foo',
//     age: 10
//   }, {
//     name: 'bar',
//     age: 20
//   }
// ]);

// // prints
// name  age
// ----  ---
// foo   10
// bar   20