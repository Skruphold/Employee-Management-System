module.exports = {
    initialQuestion: {
        type: "list",
        message: "What would you like to do?",
        name: "initialQues",
        choices: ["Add Employee",
        "Add Department",
        "Add Role",
        "View Departments",
        "View Employees",
        "Update Employee Role",
        "View All Employee's By Manager",
        "Remove Employee",
        "View All Employee's By Department",
        "View All Roles",
        "Add A Role",
        "Remove A Role",
        ]
    },
    addEmployee: (roles, employees) => [{
            type: "input",
            message: "What is the employee's first name?",
            name: "first_name",
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "last_name",
        },
        {
            type: "list",
            message: "What is the employee's role id?",
            name: "id",
            choices: ["2", "3"]
        },
        {
            type: "list",
            message: "What is the manager's role id?",
            name: "id",
            choices: ["4", "5"]
        },
    ],
    addDepartmentQues: {
        type: "input",
        message: "What is the name of the department?",
        name: "department_name",
    },
    addRole: [
        {
            type: "input",
            message: "What is the title for this new role?",
            name: "title",
        },
        {
            type: "input",
            message: "What is the salary for this new role?",
            name: "salary",
        },
        {
            type: "input",
            message: "What is the department for this new role?",
            name: "dep_id",
        },
    ],
    removeRole: {
        type: "list",
        message: "What is the employee's role?",
        name: "roleRemove",
        choices: ["Manager", "Associate", "Intern"]
    },
    removeEmployee: {
        type: "list",
        message: "What is the employee's role?",
        name: "employeeRemove",
        choices: ["Manager", "Associate", "Intern"]
    }
}