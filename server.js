require('dotenv').config();

// call once somewhere in the beginning of the app
var mysql = require("mysql");
const inquirer = require("inquirer");
const dotenv = require('dotenv').config();
const cTable = require('console.table');
const util = require("util");

// const actions = [

//     {
//         type: "list",
//         name: "actions",
//         message: "What would you like to to?",
//         choices: [

//             "Add new employee",
//             "View all employees",
//             "View employees by department",
//             "Update employee role",
//             "View all roles",
//             "Add role",
//             "View all departments",
//             "Add department",
//             "Exit"
//         ]
//     }
// ]


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
    return connection.query(`SELECT title AS name FROM roles`)
  };

  const addRole = async () => {
    let depts = await getDeptsID();
      inquirer
        .prompt([
          {
            name: "title",
            type: "input",
            message: "Please enter the name of the new role you would like to add:"
          },
          {
            name: "salary",
            type: "input",
            message: "What will be the salary for this new role?"
          },
          {
            name: "department",
            type: "list",
            message: "In what department will this role be?",
            choices: ["Management", "Sales", "Accounting", "Warehouse", "Admin"]
          }
        ])
        .then(answer => {
          const query = `
          INSERT INTO roles (title, salary, department_id)
          VALUES (?, ?, ?);
            `;
          connection.query(query,[answer.title, answer.salary, answer.departments], function (err, res) {
            if (err) throw err;
            console.log("");
            console.log(answer.title + " added to the Database.");
            promptUser();
          }
          );
        });
    };

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
      };

      async function getEmployees() {
        return connection.query(`SELECT CONCAT (first_name,' ', last_name) AS name FROM employees`);
      };
      
      // VIEW FUNCTIONS
   
// function updateRole()

// async function getRolesID() {
//     let query = await connection.query(`SELECT 
//     role_id,
//     title AS name
//     FROM roles`);
//     let newQuery = query.map(obj => {
//       let rObj = {name: obj.name, value: obj.id};
//     return rObj
//     });
//     return newQuery;
//   };
  

function exitApp() {
    connection.end();
}
// module.exports = employees_DB;