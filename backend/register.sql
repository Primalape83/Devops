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
-- ALTER TABLE OTP
-- ADD verified BOOLEAN DEFAULT FALSE;
CREATE TABLE Teams(
    team_id SERIAL PRIMARY KEY,
    team_name VARCHAR(100) UNIQUE NOT NULL,
    manager_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(manager_id) REFERENCES TaskFlowusers(emp_id)
);
CREATE TABLE TeamMembers(
    team_id INT,
    emp_id INT,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY(team_id, emp_id),

    FOREIGN KEY(team_id) REFERENCES Teams(team_id),
    FOREIGN KEY(emp_id) REFERENCES TaskFlowusers(emp_id)
);
CREATE TABLE TeamInvitations(
    invitation_id SERIAL PRIMARY KEY,
    team_id INT,
    emp_id INT,
    status VARCHAR(20) DEFAULT 'Pending',
    invited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(team_id) REFERENCES Teams(team_id),
    FOREIGN KEY(emp_id) REFERENCES TaskFlowusers(emp_id)
);
CREATE TABLE Tasks(
    task_id SERIAL PRIMARY KEY,
    assigned_by INT,
    assigned_to INT,

    title VARCHAR(200) NOT NULL,
    description TEXT,
    deadline DATE,

    status VARCHAR(20) DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(assigned_by) REFERENCES TaskFlowusers(emp_id),
    FOREIGN KEY(assigned_to) REFERENCES TaskFlowusers(emp_id)
);
CREATE TABLE Messages(
    message_id SERIAL PRIMARY KEY,

    sender_id INT,
    receiver_id INT,

    message TEXT NOT NULL,

    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    is_read BOOLEAN DEFAULT FALSE,

    FOREIGN KEY(sender_id) REFERENCES TaskFlowusers(emp_id),
    FOREIGN KEY(receiver_id) REFERENCES TaskFlowusers(emp_id)
);
CREATE TABLE Notifications(
    notification_id SERIAL PRIMARY KEY,

    emp_id INT,

    title VARCHAR(100),
    message TEXT,

    type VARCHAR(30),

    is_read BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(emp_id) REFERENCES TaskFlowusers(emp_id)
);