require('dotenv').config();

// call once somewhere in the beginning of the app
var mysql = require("mysql");
const inquirer = require("inquirer");
const dotenv = require('dotenv').config();
const cTable = require('console.table');
const util = require("util");

const actions = [

    {
        type: "list",
        name: "actions",
        message: "What would you like to to?",
        choices: [

            "Add new employee",
            "View all employees",
            "View employees by department",
            "Update employee role",
            "View all roles",
            "Add role",
            "View all departments",
            "Add department",
            "Exit"
        ]
    }
]


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
    // connection.query("CREATE DATABASE employees_db", function (err, res) {
    //     if (err) throw err;
    //     console.log("Database employees_db created");
    // });
    promptUser();
});


// connection.query = util.promisify(connection.query);
// Starting the inquirer prompts for the user to make a selection
//Altered to go more exactly according to the homework guidelines
function promptUser() {
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
            viewDepts();
        }
        else if (answer.usersChoice === "View all employee roles"){
            viewRoles();
        }
        else if (answer.usersChoice === "View all employees"){
            viewEmployees();
        }
        else if (answer.usersChoice === "Add a department"){
            addDept();
        }
        else if (answer.usersChoice === "Add an employee role"){
            addRole();
        }
        else if (answer.usersChoice === "Add an employee"){
            addEmployee();
        }
        else if (answer.usersChoice === "Update employee role"){
            updateRole();
        }
        else if (answer.usersChoice === "Exit this app"){
            exitApp();
        }
    });
}


      
//view all employees by department
function viewDepts() {
    connection.query("SELECT dept_name AS Departments FROM departments ", function (err, results) {
        console.table(results);
        if (err) throw err;
        promptUser()
    });
}
// function viewRoles()
function viewRoles() {
    connection.query("SELECT title AS Roles FROM roles ", function (err, results) {
        console.table(results);
        if (err) throw err;
        promptUser()
    });
}
// function viewEmployees()
function viewEmployees() {
    // select from the db
    let query = "SELECT * FROM employees";
    connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
      promptUser();
    });
    // show the result to the user (console.table)
  }



// function addDept()

// function addRole()

// function addEmployee()

// function updateRole()



function exitApp() {
    connection.end();
}
// module.exports = employees_DB;