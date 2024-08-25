SHOW TABLES;

CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO INCREMENT,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

select * from users;

TRUNCATE TABLE users;