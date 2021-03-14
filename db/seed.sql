/*mysql -u root -p < seed.sql*/ 

-- DROP TABLE employees;
USE employees_DB;

INSERT INTO departments(name)
VALUES ("Management"), ("Sales"), ("Accounting"),("Warehouse"), ("Admin");

-- SELECT * FROM departments;

INSERT INTO roles(title, salary, department_id)
VALUES 
("Regional Manager", 200000.00, 1),
("Salesperson", 150000.00, 2),
("Accountant", 90000.00, 3),
("Warehouse", 55000.00, 4),
("Administrative Assistant", 45000.00, 5);


-- SELECT * FROM roles;

INSERT INTO employees(first_name, last_name, role_id, manager_id)
VALUES
("Michael", "Scott", 1, NULL),
("Jim", "Halpert", 2, 1),
("Phyllis", "Vance", 3, 1),
("Pam", "Beesly", 5, 1),
("Dwight", "Shrute", 2, 1),
("Darryl", "Philbin", 4, 1);

