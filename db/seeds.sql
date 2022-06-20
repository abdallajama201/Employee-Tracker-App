INSERT INTO department (name)
VALUES ("Engineering"),
    ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 100, 1),
    ("Senior Engineer", 90, 1),
    ("Junior Engineer", 80, 1),
    ("Manager", 100, 2),
    ("Analyst", 90, 2),
    ("Designer", 80, 2);

INSERT INTO employee(first_name, last_name, role_id)
VALUES ("Alpha", "Bravo", 1),
    ("Charlie", "Delta", 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Echo", "Foxtrot", 2, 1),
    ("Golf", "Hotel", 3, 1),
    ("India", "Juliett", 5, 4),
    ("Kilo", "Lima", 6, 4);