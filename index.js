const inquirer = require("inquirer");
const table = require("console.table");
const connection = require('./utils/connect');
const questions = require('./utils/questions');

startQues();

async function startQues() {
    const userInput = await inquirer.prompt(questions.initialQuestion);
    switch (userInput.initialQues) {
        case "Add Employee":
            addEmployee();
            break;
    }
}

async function addEmployee() {
    let qry = "SELECT id as value, CONCAT(first_name, ' ', last_name) as name FROM employee"
    connection.query(qry, async (err, employees) => {
        qry = "SELECT id as value, title as name FROM role"
        connection.query(qry, async (err, roles) => {
            const newEmployee = await inquirer.prompt(questions.addEmployee(roles, employees));
            query = "INSERT INTO employee SET ?";
            connection.query(qry, newEmployee, function (err) {
                if (err) throw err;
                console.log("Successfully added a new employee!");
                startQues();
            });
        });
    });
}

async function addDepartmentQues() {
    
}