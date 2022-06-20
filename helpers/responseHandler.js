const mysql = require("mysql2");
const consoleTable = require("console.table");
const inquirer = require("inquirer");
let db;

function connectDb() {
    db = mysql.createConnection(
        {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_tracker'
        },
        console.log(`Connected to the employee_tracker database.`)
    );
}

function viewAllEmployees() {
    db.query('SELECT * FROM employee JOIN role ON employee.role_id = role.id', (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log('\n');
            console.table(results);
            console.log("Press enter to return");
        }
    });
}

function addEmployee() {
    inquirer
    .prompt([
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "firstName",
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "lastName",
        },
        {
            type: "input",
            message: "What is the employee's role id?",
            name: "roleId",
        },
        {
            type: "input",
            message: "What is the employee's manager id?",
            name: "manId",
        },
    ]).then((res) => {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${res.firstName}","${res.lastName}","${res.roleId}","${res.manId}");`, (err, results) => {
            if (err) {
              console.log(err);
            } else {
              console.log("employee added");
            }
        });
    });
}

function updateEmployeeRole() {
    
}
function viewAllRoles() {
    db.query('SELECT * FROM role', (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log('\n');
            console.table(results);
            console.log("Press enter to return");
        }
    });
}

function addRole() {
    
}

function viewAllDepartments() {
    db.query('SELECT * FROM department', (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log('\n');
            console.table(results);
            console.log("Press enter to return");
        }
    });
}

function addDepartment() {
    
}
module.exports = {
    connectDb,
    viewAllEmployees, 
    addEmployee,
    updateEmployeeRole,
    viewAllRoles,
    addRole,
    viewAllDepartments,
    addDepartment
};