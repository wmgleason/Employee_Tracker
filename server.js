require('dotenv').config();


// call once somewhere in the beginning of the app
var mysql = require("mysql");
const inquirer = require("inquirer");
const dotenv = require('dotenv').config();
const cTable = require('console.table');
const util = require("util");
// const createDB = require("./db");
// const promisemysql = require("promise-mysql");

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

// Adding functions to carry out the users choice
// function viewDepts() {
//     const sql = `SELECT departments.dept_name AS departments, 
//     roles.title, employees.employee_id, employees.first_name, employees.last_name
//     FROM employees_db
//     LEFT JOIN roles ON (roles.role_id = employees.role_id)
//     LEFT JOIN departments ON (departments.dept_id = roles.dept_id)
//     ORDER BY departments.dept_name`
//     connection.promise().query(sql, (err, res) => {
//         if (err) throw err;
//         console.log('\n');
//         console.log('Viewing departments');
//         console.log('\n');
//         console.table(res);
//         promptUser();
//     });
// }

    // Query to view all employees
    // function viewDepts() {
    //     console.log("Selecting all departments...\n");
    //     connection.query("SELECT * FROM departments", function (err, res) {
    //       if (err) throw err;
    //       // Log all results of the SELECT statement
    //       console.table(res);
    //       start();
    //     });
    //   }
      
//view all employees by department
    async function viewDepts () {
        console.log('\n')
        const query = `SELECT first_name AS 'First Name',
        last_name AS 'Last Name',
        departments.dept_name AS 'Department Name' FROM
        ((employees INNER JOIN roles ON role_id = roles.role_id)
        INNER JOIN departments ON dept_id = departments.dept_id)
        ORDER BY employees.employee_id ASC`;
        const rows = await connection.query(query);
        console.table(rows[0]);
};

// function viewRoles()

// function viewEmployees()

// function addDept()

// function addRole()

// function addEmployee()

// function updateRole()



function exitApp() {
    connection.end();
}
// module.exports = employees_DB;