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
        case "Add Role":
            newRole();
            break;
        case "Update Employee Role":
            updateRole();
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

async function newRole() {
    const roleOpt = await inquirer.prompt(questions.addRole)
    connection.query("INSERT INTO role  SET ?", {
            title: roleOpt.title,
            salary: roleOpt.salary,
            dep_id: roleOpt.dep_id
        },
        function (err) {
            if (err) throw err;
            console.log("New Role was added successfully");
            startQues();
        }
    );
}

async function updateRole() {
    connection.query("SELECT * FROM employee", async (err, employee) => {
        const { staffMem, newPos } = await inquirer.prompt([{
            type: "list",
            message: "Choose employee to be updated.",
            name: "staffMem",
            choices: () => {
                return employee.map((employee) => employee.last_name);
            },
        },
        {
            type: "list",
            message: "What is the employee's new role?",
            name: "newPos",
            // choices: [1, 2, 3, 4],
            choices: () => {
                return employee.map((employee) => employee.employee_role_id);
            }
        }
    ]);
    console.log(newPos)
    connection.query("UPDATE employee SET ? WHERE ?",
    [
        {
            employee_role_id: newPos,
        },
        {
            last_name: staffMem,
        },
    ],
    function (err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " role updated!\n");
        console.table(employee);
        startQues();
    }
    );
    
    })
}