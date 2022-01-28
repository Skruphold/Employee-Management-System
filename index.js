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
        case "View Departments":
            showDepartments();
            break;
        case "View Employees":
            showEmployees();
            break;
        case "View All Roles":
            showRoles();
            break;
        case "View All Employee's By Manager":
            employeeByManager();
            break;
        case "View All Employee's By Department":
            employeeByDept();
            break;
    }
}

async function addEmployee() {
    let qry = "SELECT id as value, CONCAT(first_name, ' ', last_name) as name FROM employee"
    connection.query(qry, async (err, employee) => {
        qry = "SELECT id as value, title as name FROM role"
        connection.query(qry, async (err, role) => {
            const newEmployee = await inquirer.prompt(questions.addEmployee(role, employee));
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

// async function newRole() {
//     const roleOpt = await inquirer.prompt(questions.addRole)
//     connection.query("INSERT INTO role SET ?", {
//             title: roleOpt.titleRole,
//             salary: roleOpt.salaryRole,
//             dep_id: roleOpt.depIdRole
//         },
//         function (err) {
//             if (err) throw err;
//             console.log("New Role was added successfully");
//             startQues();
//         }
//     );
// }

const newRole = () => {
    connection.query(`SELECT * FROM department`, (err, departmentResult) => {
        if (err) {
            console.log(err);
        }
        departmentResult = departmentResult.map((department) => {
            return {
                name: department.department_name,
                value: department.id
            };
        });
        inquirer.prompt([
            {
                type: 'input',
                message: 'Please enter the name of the role.',
                name: 'roleName'
            },
            {
                type: 'input',
                message: 'Please enter the salary for the role.',
                name: 'roleSalary'
            },
            {
                type: 'list',
                message: 'Please enter the department of the role',
                choices: departmentResult,
                name: 'roleDept'
            }
        ]).then((answer) => {
            connection.query(`INSERT INTO role SET ?`,
            {
                title: answer.roleName,
                salary: answer.roleSalary,
                dep_id: answer.roleDept
            },
            (err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log("New role successfully added!");
                startQues();
            }
            )
        })
    })
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
};

function showDepartments() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        startQues();
    })
};


function showRoles() {
    connection.query("SELECT title FROM role", function (err, res) {
        if (err) throw err;
        console.table(res);
        startQues();
    })
};

function showEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.id AS department FROM employee LEFT JOIN role ON employee.employee_role_id = role.id LEFT JOIN department ON role.dep_id = department.id", function (err, res) {
        if (err) throw err;
        console.table(res);
        startQues();
    })
};

function employeeByManager() {
    connection.query("SELECT * FROM employee", async (err, employee) => {
        const { managerID } = await inquirer.prompt([{
            type: "list",
            message: "Choose your manager.",
            name: "managerID",
            // choices: [1, 2, 3, 4]
            choices: () => {
                return employee.map((manager) => manager.manager_id);
            },
        },
    ]);
    connection.query(`SELECT first_name, last_name FROM employee WHERE manager_id=${managerID}`, function (err, res) {
        if (err) throw err;
        console.table(res);
        startQues();
    })
    })
};

function employeeByDept() {
    connection.query("SELECT * FROM department", async (err, department) => {
        const {
            departmentName 
        } = await inquirer.prompt([{
            type: "list",
            message: "Select the department.",
            name: "departmentName",
            choices: () => {
                return department.map((department) => department.name);
            },
        }])
        connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.id AS department FROM employee LEFT JOIN role ON employee.employee_role_id = role.id LEFT JOIN department ON role.dep_id = department.id", function (err, res) {
            if (err) throw err;
            console.table(res.filter((name) => departmentName === name.department));
            startQues();
        });
    })
}


