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
// Starting the inquirer prompts for the user to make a selection
//Altered to go more exactly according to the homework guidelines
function promptUser () {
    inquirer.prompt([
        {
            name: "usersChoice",
            type: "list",
            message: "What would you like to do here?",
            choices: ["View all employee departments", "View all employee roles", "View all employees", "Add a department", "Added an employee role", "Add an employee", "Exit this app"]
        }
    ])
    .then(answer => {
        if (answer.usersChoice === "View all employee departments"){
            viewRecord();
        }
        else if (answer.usersChoice === "View all employee roles"){
            addRecord();
        }
        else if (answer.usersChoice === "View all employees"){
            updateRecord();
        }
        else if (answer.usersChoice === "Add a department"){
            updateRecord();
        }
        else if (answer.usersChoice === "Add an employee role"){
            updateRecord();
        }
        else if (answer.usersChoice === "Add an employee"){
            updateRecord();
        }
        else if (answer.usersChoice === "Update employee "){
            updateRecord();
        }
        else if (answer.usersChoice === "Exit this app"){
            exitApp();
        }
    });
}


function exitApp() {
    clear();
    process.exit();
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