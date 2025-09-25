use task_application;

select* from tasks;

delete from tasks where id = "24ab0076-1acc-41c2-952e-ca889c8c7695";
delete from users where id = "6b07b671-7dc3-11f0-b933-00505692e06f";

SET SQL_SAFE_UPDATES = 0;
delete from tasks;
SET SQL_SAFE_UPDATES = 1;

insert into statuses (statusId, status) values ("1", "ToDo"), ("2", "InProgress"), 
("3", "inReview"), ("4", "Done");

select* from users;
describe tasks;
alter table tasks
modify column creationDate date;

describe users;

alter table tasks
modify column description text;

explain select* from users limit 5 offset 0;

select* from tasks;
insert into users (email, name) values ("absd", "my name");

select* from users;

select sql_calc_found_rows * from tasks where statusId = 2;
select found_rows();