require('dotenv').config();

// call once somewhere in the beginning of the app
var mysql = require("mysql");
const inquirer = require("inquirer");
const dotenv = require('dotenv').config();
const cTable = require('console.table');
const util = require("util");

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
            choices: ["View all employee departments", "View all employee roles", "View all employees", "Add a department", "Add an employee role", "Add an employee", "Exit this app"]
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
        else if (answer.usersChoice === "Update employee role"){
            updateRole();
        }
        else if (answer.usersChoice === "Add an employee"){
            addEmployee();
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
        promptUser();
    });
}
// function viewRoles()
function viewRoles() {
    connection.query("SELECT title AS Roles FROM roles ", function (err, results) {
        console.table(results);
        if (err) throw err;
        promptUser();
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



// function addEmployee()
const addEmployee = async () => {
    let empRoles = await getRoles();
    // let manager = await getManagersID();
      inquirer
        .prompt([
          {
            name: "first_name",
            type: "input",
            message: "Please enter the first name of the new employee."
          },
          {
            name: "last_name",
            type: "input",
            message: "Please enter the last name of the new employee."
          },
          {
            type: "list",
            message: "What is the role of the new employee?",
            name: "roles",
            choices: ["Regional Manager", "Salesperson", "Accountant", "Warehouse", "Administrative Assistant"]
          },
          {
            name: "manager_id",
            type: "list",
            message: "Who will be the manager of the new employee?",
            choices: [1]
          }
        ])
        .then(answer => {
          const query = `
          INSERT INTO employees (first_name, last_name, role_id, manager_id)
          VALUES (?, ?, ?, ?);
            `;
          connection.query(query,[answer.first_name, answer.last_name, answer.title, answer.manager_id], function (err, res) {
            if (err) throw err;
            console.log("");
            console.log(` ${answer.first_name} ${answer.last_name} added to the Database.`);
            promptUser();
          }
          );
        });
  };

  async function getRoles() {
    return connection.query(`SELECT title AS name FROM roles`);
  }
// function addRole()
function addRole() {
    inquirer
        .prompt([{
            name: "title",
            message: "Role Title:"
        }, {
            name: "salary",
            message: "Role Salary:"
        }, {
            name: "dept_id",
            message: "Role Department Id:"
        }])
        .then(function (answer) {
            var roleTitle = answer.title;
            var roleSalary = answer.salary;
            var roleDeptId = answer.dept_id;
            console.log("\n1 new role inserted!\n");
            var query = connection.query(
                "INSERT INTO role SET ?",
                {
                    title: roleTitle,
                    salary: roleSalary,
                    dept_id: roleDeptId
                },
                function (err, res) {
                    if (err) throw err;
                }
            );
            // logs the actual query being run
            //console.log(query.sql);
            promptUser();
        });
}

    const addDept = () => {
        inquirer
          .prompt([
            {
              name: "name",
              type: "input",
              message: "Please enter the name of the new department:"
            }
          ])
          .then(answer => {
            const query = `
            INSERT INTO departments (dept_name)
            VALUES (?);
              `;
            connection.query(query,[answer.name], function (err, res) {
              if (err) throw err;
              console.log("");
              console.log(answer.name + " added to the Database.");
              promptUser();
            }
            );
          });
      };

      const updateRole = async () => {
        let employees = await getEmployees();
        // let roles = await getRolesID();
      
        inquirer
          .prompt([
            {
              name: "employee",
              type: "list",
              message: "Which employee would you like to change role?",
              choices: employees
            },
            {
              name: "role",
              type: "list",
              message: "Which is the employee new role?",
              choices: roles
            },
          ])
          .then(answer => {
            let fullName = answer.employee.split(" ");
              let firstName = fullName[0];
              let lastName = fullName[1];
            const query = `
              UPDATE employees
              SET role_id = ?
              WHERE first_name = ? AND last_name = ?;
              `;
            connection.query(query,[answer.role,firstName,lastName], function (err, res) {
              if (err) throw err;
              console.log("");
              console.log(` ${firstName} ${lastName} role updated in the Database.`);
              init();
            }
            );
          });
      };
    function getDeptsID() {
        return connection.query(`SELECT dept_name FROM departments`);
      }

      async function getEmployees() {
        return connection.query(`SELECT CONCAT (first_name,' ', last_name) AS name FROM employees`);
      }

function exitApp() {
    connection.end();
}