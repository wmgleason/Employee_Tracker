require('dotenv').config()

// call once somewhere in the beginning of the app
const mysql = require("mysql");
const inquirer = require("inquirer");
const dotenv = require('dotenv').config();
const cTable = require('console.table');

const cTable = require('console.table');
console.table([
  {
    name: 'foo',
    age: 10
  }, {
    name: 'bar',
    age: 20
  }
]);

// prints
name  age
----  ---
foo   10
bar   20