DROP DATABASE IF EXISTS employees_db;
CREATE database employees_db;

USE employees_db;

CREATE TABLE department (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
  dep_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE emp_role (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL UNSIGNED NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  INDEX dep_ind (department_id)
  -- CONSTRAINT fk_department FOREGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE;
);

CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  INDEX role_ind (role_id),
  manager_id INT UNSIGNED,
  INDEX man_ind (manager_id),
  -- CONSTRAINT fk_department FOREGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL;
);

