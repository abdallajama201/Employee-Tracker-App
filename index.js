const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

// Open database connection
const db = mysql.createConnection(
    {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employee_tracker'
    },
    console.log(`Connected to the employee_tracker database.`)
);

// App entry point
function init() {
    initialQuesLoop();
}

// Access to all questions
function initialQuesLoop() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "choice",
                choices: [
                    "View All Employees",
                    "View All Roles",
                    "View All Deparments",
                    "Update an Employee Role",
                    "Add Employee",
                    "Add Role",
                    "Add Department",
                    "Quit",
                ]
            }
        ]).then((res) => {
            switch (res.choice) {
                case "View All Employees": viewAllEmployees();
                    break;
                case "View All Roles": viewAllRoles();
                    break;
                case "View All Deparments": viewAllDepartments();
                    break;
                case "Update an Employee Role": updateEmployeeRole();
                    break;
                case "Add Employee": addEmployee();
                    break;
                case "Add Role": addRole();
                    break;
                case "Add Department": addDepartment();
                    break;
                case "Quit": process.exit(0);
                    break;
                default:
                    break;
            }
        })
}

// Pulls up employee table
function viewAllEmployees() {
    db.query(`select x.id, x.first_name "First Name", x.last_name "Last Name", title Title, salary Salary, name Position, y.first_name "Manager First Name", y.last_name "Manager Last Name" from employee as x join role on x.role_id = role.id join department on role.department_id = department.id join employee as y on x.manager_id = y.id`, (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log('\n');
            console.table(results);
            console.log("press Enter to return");
        }
    });
    reset();
}

// Brings up roles
function viewAllRoles() {
    db.query('SELECT * FROM role', (err, results) => {
        if (err) {
            console.log(err);
        } else {
            console.log('\n');
            console.table(results);
            console.log("press Enter to return");
        }
    });
    reset();
}

// Brings up deps
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
    reset();
}

// Elements of questions for adding data
const updateEmp = ["employee id",'a',"new role id",'b',"employee"]
const employee = ["first name",'a',"last name",'b',"role id",'c',"manager id",'d',"employee"];
const role = ["title",'a',"salary",'b',"department id",'c',"role"];
const department = ["name",'a',"department"]

// Helper function to populate array for inquirer
function populatePrompts(arr) {
    let returnArr = [];
    for(let i = 0; i < arr.length - 1; i += 2) {
        let ques = {
            type: "input",
            message: `Whit is the ${arr[arr.length - 1]}'s ${arr[i]}?`,
            name: `${arr[i + 1]}`
        };
        returnArr.push(ques);
    }
    return returnArr;
}

// Take info to update employee role and make change on database
function updateEmployeeRole() {
    let prompts = populatePrompts(updateEmp);
    inquirer
        .prompt(prompts)
        .then((res) => {
        db.query(`UPDATE employee SET role_id = ${res.b} WHERE id = ${res.a};`, (err, results) => {
            if (err) {
              console.log(err);
            } else {
              console.log("\nemployee role updated\npress Enter to return");
            }
        });
        reset();
    });
}

// Takes info for all fields in employee row and adds it to table
function addEmployee() {
    let prompts = populatePrompts(employee);
    inquirer
        .prompt(prompts)
        .then((res) => {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${res.a}","${res.b}","${res.c}","${res.d}");`, (err, results) => {
            if (err) {
              console.log(err);
            } else {
              console.log("\nemployee added\npress Enter to return");
            }
        });
        reset();
    });
}

// Takes info to add row to role table
function addRole() {
    let prompts = populatePrompts(role);
    inquirer
        .prompt(prompts)
        .then((res) => {
        db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${res.a}","${res.b}","${res.c}");`, (err, results) => {
            if (err) {
              console.log(err);
            } else {
              console.log("\nrole added\npress Enter to return");
            }
        });
        reset();
    });
}

// Takes info to add row to deparment table
function addDepartment() {
    let prompts = populatePrompts(department);
    inquirer
        .prompt(prompts)
        .then((res) => {
        db.query(`INSERT INTO department (name) VALUES ("${res.a}");`, (err, results) => {
            if (err) {
              console.log(err);
            } else {
              console.log("\ndepartment added\npress Enter to return");
            }
        });
        reset();
    });
}

// Clears part of the console and call initial question
function reset() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "",
                name: "*"
            }
        ]).then(() => {
            initialQuesLoop();
        });
}
init();
