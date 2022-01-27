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
        case "Add Department":
            addDepartment();
            break;
    }
}

async function addEmployee() {
    let qry = "SELECT id as value, CONCAT(first_name, ' ', last_name) as name FROM employee"
    connection.query(qry, async (err, employees) => {
        qry = "SELECT id as value, title as name FROM role"
        connection.query(qry, async (err, roles) => {
            const newEmployee = await inquirer.prompt(questions.addEmployee(roles, employees));
            qry = "INSERT INTO employee SET ?";
            connection.query(qry, newEmployee, function (err) {
                if (err) throw err;
                console.log("Successfully added a new employee!");
                startQues();
            });
        });
    });
}

async function addDepartment() {
    const departmentOpt = await inquirer.prompt(questions.addDepartmentQues)
    connection.query("INSERT INTO department SET ?", {
        department_name: departmentOpt.department_name
    },  
        function error (err) {
        if (err) throw err;
        console.log("New Department has been added.");
        startQues();
        }
    );
}