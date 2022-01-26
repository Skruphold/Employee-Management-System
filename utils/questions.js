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
    addEmployee: (roles, employees) => [
        {
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
            name: "role_id",
            choices: roles
        },
        {
            type: "list",
            message: "What is the employee's role id?",
            name: "role_id",
            choices: employees
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
            name: "titleRole",
        },
        {
            type: "input",
            message: "What is the salary for this new role?",
            name: "salary",
        },
        {
            type: "input",
            message: "What is the department for this new role?",
            name: "departmentRole",
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