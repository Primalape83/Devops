-- -- CREATE TABLE TaskFlowusers (
-- --     FirstName VARCHAR(50) ,
-- --     LastName VARCHAR(50) NOT NULL,
-- --     Email VARCHAR(100) NOT NULL UNIQUE,
-- --     Password VARCHAR(100) NOT NULL,
-- --     Role VARCHAR(20) NOT NULL,
-- --     Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    
-- -- )
-- -- CREATE DATABASE taskflow;
-- -- ALTER TABLE TaskFlowusers 
-- -- ADD emp_id SERIAL  UNIQUE PRIMARY KEY ;
-- -- ALTER TABLE TaskFlowusers 
-- -- ADD phone VARCHAR(10)  UNIQUE ;
-- -- CREATE TABLE OTP(
-- --     emp_id INT PRIMARY KEY,
-- --     Otp INT,
-- --     FOREIGN KEY(emp_id) REFERENCES TaskFlowusers(emp_id)
-- -- )
-- -- ALTER TABLE OTP
-- -- -- ADD verified BOOLEAN DEFAULT FALSE;
-- -- CREATE TABLE Teams(
-- --     team_id SERIAL PRIMARY KEY,
-- --     team_name VARCHAR(100) UNIQUE NOT NULL,
-- --     manager_id INT NOT NULL,
-- --     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
-- --     FOREIGN KEY(manager_id) REFERENCES TaskFlowusers(emp_id)
-- -- );
-- -- CREATE TABLE TeamMembers(
-- --     team_id INT,
-- --     emp_id INT,
-- --     joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

-- --     PRIMARY KEY(team_id, emp_id),

-- --     FOREIGN KEY(team_id) REFERENCES Teams(team_id),
-- --     FOREIGN KEY(emp_id) REFERENCES TaskFlowusers(emp_id)
-- -- );
-- -- CREATE TABLE TeamInvitations(
-- --     invitation_id SERIAL PRIMARY KEY,
-- --     team_id INT,
-- --     emp_id INT,
-- --     status VARCHAR(20) DEFAULT 'Pending',
-- --     invited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

-- --     FOREIGN KEY(team_id) REFERENCES Teams(team_id),
-- --     FOREIGN KEY(emp_id) REFERENCES TaskFlowusers(emp_id)
-- -- );
-- -- CREATE TABLE Tasks(
-- --     task_id SERIAL PRIMARY KEY,
-- --     assigned_by INT,
-- --     assigned_to INT,

-- --     title VARCHAR(200) NOT NULL,
-- --     description TEXT,
-- --     deadline DATE,

-- --     status VARCHAR(20) DEFAULT 'Pending',
-- --     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

-- --     FOREIGN KEY(assigned_by) REFERENCES TaskFlowusers(emp_id),
-- --     FOREIGN KEY(assigned_to) REFERENCES TaskFlowusers(emp_id)
-- -- );
-- -- CREATE TABLE Messages(
-- --     message_id SERIAL PRIMARY KEY,

-- --     sender_id INT,
-- --     receiver_id INT,

-- --     message TEXT NOT NULL,

-- --     sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

-- --     is_read BOOLEAN DEFAULT FALSE,

-- --     FOREIGN KEY(sender_id) REFERENCES TaskFlowusers(emp_id),
-- --     FOREIGN KEY(receiver_id) REFERENCES TaskFlowusers(emp_id)
-- -- );
-- -- CREATE TABLE Notifications(
-- --     notification_id SERIAL PRIMARY KEY,

-- --     emp_id INT,

-- --     title VARCHAR(100),
-- --     message TEXT,

-- --     type VARCHAR(30),

-- --     is_read BOOLEAN DEFAULT FALSE,

-- --     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

-- --     FOREIGN KEY(emp_id) REFERENCES TaskFlowusers(emp_id)
-- -- );
-- ALTER TABLE TaskFlowUsers
-- ADD status VARCHAR(20) DEFAULT 'UNASSIGNED';

-- ALTER TABLE TeamInvitations
-- ADD invited_by INT REFERENCES TaskFlowUsers(emp_id);

-- ALTER TABLE Tasks
-- ADD team_id INT REFERENCES Teams(team_id);

-- ALTER TABLE Tasks
-- ADD priority VARCHAR(20) DEFAULT 'Medium';

-- CREATE TABLE SubTasks(
--     subtask_id SERIAL PRIMARY KEY,
--     task_id INT REFERENCES Tasks(task_id) ON DELETE CASCADE,
--     title VARCHAR(200) NOT NULL,
--     status VARCHAR(20) DEFAULT 'Pending'
-- );
-- Check the invitation
-- SELECT * FROM TeamInvitations;

-- -- Accept it
-- UPDATE TeamInvitations 
-- SET status = 'Accepted' 
-- WHERE invitation_id = 1;

-- -- Now add the employee to TeamMembers manually
-- INSERT INTO TeamMembers (team_id, emp_id)
-- SELECT team_id, emp_id 
-- FROM TeamInvitations 
-- WHERE invitation_id = 1;
-- SELECT * FROM Teams;