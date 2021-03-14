require('dotenv').config()
module.exports = {
    username:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME,
    host:process.env.DB_HOST,
    dialect:"mysql"
}

// call once somewhere in the beginning of the app
var mysql = require("mysql");
const inquirer = require("inquirer");
const dotenv = require('dotenv').config();
const cTable = require('console.table');
const util = require("util");


// Enable access to .env variables
// require('dotenv').config();

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

// connection.query = util.promisify(connection.query);
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

// Adding functions to carry out the users choice
function viewDepts() {
    const query = `SELECT departments.dept_name AS departments, 
    roles.title, employees.employee_id, employees.first_name, employees.last_name
    FROM employees_db
    LEFT JOIN roles ON (roles.role_id = employees.role_id)
    LEFT JOIN departments ON (departments.dept_id = roles.dept_id)
    ORDER BY departments.dept_name`
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('\n');
        console.log('Viewing departments');
        console.log('\n');
        console.table(res);
        promptUser();
    });
}

// function viewRoles()

// function viewEmployees()

// function addDept()

// function addRole()

// function addEmployee()

// function updateRole()



// function exitApp() {
//     clear();
//     process.exit();
// }

function exitApp() {
    connection.end();
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