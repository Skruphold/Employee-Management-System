DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30),
    PRIMARY KEY (department_id)
);

CREATE TABLE employee_role (
    role_id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    dep_id INT,
    PRIMARY KEY (role_id),
    FOREIGN KEY (dep_id) REFERENCES department(department_id) ON DELETE SET NULL
);

CREATE TABLE employee_name (
    employee_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    employee_role_id INT,
    manager_id INT,
    PRIMARY KEY (employee_id),
    FOREIGN KEY (employee_role_id) REFERENCES employee_role(role_id) ON DELETE SET NULL,
    FOREIGN KEY (manager_id) REFERENCES employee_name(employee_id) ON DELETE SET NULL
);