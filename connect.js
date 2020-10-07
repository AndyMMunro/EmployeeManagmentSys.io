var mysql = require("mysql");
var inquirer = require("inquirer");
const {
    connect
} = require("http2");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Password",
    database: "employees_db"
});

connection.connect(function (err) {
    console.log('connected');
    if (err) throw err;
    start();
});
module.export = connection;

function start() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "Add department, role or employee?",
                "View department, role or employee?",
                "Update department, role or employee?"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "Add department, role or employee?":
                    addInfo();
                    break;

                case "View all.":
                    view();
                    break;

                case "Update all.":
                    update();
                    break;
            }
        });
}

function addInfo() {
    inquirer
        .prompt({
            name: "depOrRoleOrEmp",
            type: "list",
            message: "what would you like to add?",
            choices: ["department", "role", "employee"]
        })
        .then(function (answer) {
            // based on their answer, either call the bid or the post functions
            if (answer.depOrRoleOrEmp === "department") {
                addDepartment();
            } else if (answer.depOrRoleOrEmp === "role") {
                role();
            } else if (answer.depOrRoleOrEmp === "employee") {
                employee();
            } else {
                connection.end();
            }
        });
}

// function to handle posting new items up for auction
function addDepartment() {
    // prompt for info about the item being put up for auction
    inquirer
        .prompt([{
            name: "depname",
            type: "input",
            message: "What is the name of the department?",
        }])
        .then(function (answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO department (dep_name) VALUES (?)", {
                    dep_name: answer.depname
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your department name was added!");
                    start();
                }
            );
        });
};