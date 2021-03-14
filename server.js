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
    promptUser();
});

function promptUser () {
    inquirer.prompt([
        {
            name: "usersChoice",
            type: "list",
            message: "What would you like to do here?",
            choices: ["View a record in the employee database", "Add a record to the employee database", "Update a record in the employee database", "Exit this app"]
        }
    ])
    .then(answer => {
        if (answer.usersChoice === "View a record in the employee database"){
            viewRecord();
        }
        else if (answer.usersChoice === "Add a record to the employee database"){
            addRecord();
        }
        else if (answer.usersChoice === "Update a record in the employee database"){
            updateRecord();
        }
        else if (answer.usersChoice === "Exit this app"){
            exitApp();
        }
    });
}



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