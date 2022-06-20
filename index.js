const inquirer = require("inquirer");
const {
    connectDb,
    viewAllEmployees, 
    addEmployee,
    updateEmployeeRole,
    viewAllRoles,
    addRole,
    viewAllDepartments,
    addDepartment     
} = require("./helpers/responseHandler");

function init() {
    connectDb();
    initialQuesLoop();
}
function initialQuesLoop() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                name: "choice",
                choices: [
                    "View All Employees",
                    "Add Employee",
                    "Update an Employee Role",
                    "View All Roles",
                    "Add Role",
                    "View All Deparments",
                    "Add Department",
                    "Quit",
                ]
            }
        ]).then((res) => {
            switch (res.choice) {
                case "View All Employees": viewAllEmployees();
                    break;
                case "Add Employee": addEmployee();
                    break;
                case "Update an Employee Role": updateEmployeeRole();
                    break;
                case "View All Roles": viewAllRoles();
                    break;
                case "Add Role": addRole();
                    break;
                case "View All Deparments": viewAllDepartments();
                    break;
                case "Add Department": addDepartment();
                    break;
                case "Quit": process.exit(0);
                    break;
                default:
                    break;
            }
        }).then(() => {
            // reset();
        });
}
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
