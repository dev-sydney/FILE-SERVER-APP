CREATE TABLE Users
(
user_id INT NOT NULL AUTO_INCREMENT,
email_address VARCHAR(250) NOT NULL UNIQUE,
user_password VARCHAR(250) NOT NULL,
password_confirm VARCHAR(250) ,
photo VARCHAR(250) DEFAULT 'default.jpg',
privilege ENUM('business','admin') NOT NULL DEFAULT 'business',
password_reset_expires TIMESTAMP,
reset_password_token VARCHAR(250),
 PRIMARY KEY(user_id)
);