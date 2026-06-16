-- CREATE TABLE TaskFlowusers (
--     FirstName VARCHAR(50) ,
--     LastName VARCHAR(50) NOT NULL,
--     Email VARCHAR(100) NOT NULL UNIQUE,
--     Password VARCHAR(100) NOT NULL,
--     Role VARCHAR(20) NOT NULL,
--     Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    
-- )
-- CREATE DATABASE taskflow;
-- ALTER TABLE TaskFlowusers 
-- ADD emp_id SERIAL  UNIQUE PRIMARY KEY ;
-- ALTER TABLE TaskFlowusers 
-- ADD phone VARCHAR(10)  UNIQUE ;
-- CREATE TABLE OTP(
--     emp_id INT PRIMARY KEY,
--     Otp INT,
--     FOREIGN KEY(emp_id) REFERENCES TaskFlowusers(emp_id)
-- )
ALTER TABLE OTP
ADD verified BOOLEAN DEFAULT FALSE;