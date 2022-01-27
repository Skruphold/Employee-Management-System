INSERT INTO department (department_name)
VALUES  ("Management"),
        ("Engineering"),
        ("Accounting"),
        ("Marketing");

INSERT INTO role (title, salary, dep_id)
VALUES  ('Regional manager', 220000.00, 1),
        ('General Manager', 175000.00, 1),
        ('Senior Engineer', 150000.00, 2),
        ('Junior Engineer', 110000.00, 2),
        ('Senior Accountant', 85000.00, 3),
        ('Junior Accountant', 65000.00, 3),
        ('Senior Marketing Rep', 100000.00, 4),
        ('Junior Marketing Rep', 80000.00, 4);

INSERT INTO employee (first_name, last_name, employee_role_id, manager_id)
VALUES  ('Hunter', 'Coleman', 1, 1),
        ('Jack', 'Dempsie', 3, NULL),
        ('Dan', 'Carman', 2, NULL);

SELECT * FROM department;

SELECT * FROM role;

SELECT * FROM employee;
