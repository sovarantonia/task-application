use task_application;

insert into users (id, name, department, email) 
values ("c1a4d379-90c1-4e25-bbe2-9a413f0f2c67",
"Alice Morgan", 
"Backend Development",
"alice.morgan@example.com");



ALTER TABLE tasks
    MODIFY id CHAR(36) NOT NULL DEFAULT (UUID());
    
    ALTER TABLE tasks DROP FOREIGN KEY userId;
    
    ALTER TABLE users
  MODIFY id CHAR(36) NOT NULL DEFAULT (UUID());
  
  ALTER TABLE tasks
  MODIFY userId CHAR(36) NOT NULL;
  
  ALTER TABLE tasks
  ADD CONSTRAINT userId
    FOREIGN KEY (userId) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE RESTRICT;
    
 
 alter table users 
 add column createdAt timestamp not null default current_timestamp;
 
 alter table users
 drop column createdAt;
 
 select* from users;
 select* from tasks;
 select* from statuses;
 
 alter table tasks
 modify column creationDate date default (CURRENT_DATE);
 
 select count(*) from users;
 
 insert into tasks (title, userId) values ("title", "1543f9e2-8351-11f0-829d-00505692e06f");
 
 describe statuses;
 
 use task_application_test;
 SET FOREIGN_KEY_CHECKS = 0;
 TRUNCATE TABLE tasks;
 
 describe statuses;
 alter table status
 rename to statuses;
 
 select* from users where id = 1;
