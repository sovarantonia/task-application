use task_application;
DELIMITER //
create procedure GetPaginatedItems 
(in tableName varchar(50), in currentPageNo int, in itemsPerPage int, 
in sortColumns varchar(100), in sortDirections varchar(100), 
in filterColumns varchar(100), in filterColumnValues varchar(100), 
in whereClause text)

begin
declare offst int;
declare sortCount int default 0;
declare filterCount int default 0;
declare sortOption varchar(100) default '';
declare filterOption varchar(100) default '';

set offst = (currentPageNo - 1) * (itemsPerPage);
set @s = concat('select sql_calc_found_rows * from ', tableName, ' ');

if json_length(filterColumns) is not null then 

while filterCount < json_length(filterColumns) do

 SET @json_path = CONCAT('$[', filterCount, ']');
 SET @json_FilterColumn = JSON_UNQUOTE(JSON_EXTRACT(filterColumns, @json_path)); 
SET @val_json= JSON_EXTRACT(filterColumnValues, @json_path); 
set @val_type = JSON_TYPE(@val_json);

if @json_FilterColumnValueType in ('integer', 'double') then
set @json_FilterColumnValue := @val_json;
else
    set @json_FilterColumnValue := QUOTE(JSON_UNQUOTE(@val_json));
end if;
  
  if filterCount + 1 = json_length(filterColumns) then
  set filterOption = concat(filterOption, @json_filterColumn, ' = ', @json_filterColumnValue);
  else 
  set filterOption = concat(filterOption, @json_filterColumn, ' = ', @json_filterColumnValue, ' AND ');
  end if;
 
 SET filterCount = filterCount + 1;
end while;

set @s = concat(@s, ' WHERE ', filterOption, ' ');

end if;

if (length(whereClause)) then
set @s = concat(@s, ' ', whereClause, ' ');
end if;

if json_length(sortColumns) is not null then 

while sortCount < json_length(sortColumns) do

 SET @json_path = CONCAT('$[', sortCount, ']');
 SET @json_SortColumn = JSON_UNQUOTE(JSON_EXTRACT(sortColumns, @json_path)); 
SET @json_SortDirection = JSON_UNQUOTE(JSON_EXTRACT(sortDirections, @json_path)); 
  
  if @json_SortDirection = 1 then
  set sortOption = concat( sortOption, @json_SortColumn, ' ASC ', ', ');
   elseif @json_SortDirection = -1 then 
   set sortOption = concat(sortOption, @json_SortColumn, ' DESC ', ', ');
  end if;
  
  if sortCount + 1 = json_length(sortColumns) then
  if @json_SortDirection = 1 then
  set sortOption = concat(sortOption, @json_SortColumn, ' ASC ');
  elseif @json_SortDirection = -1 then 
  set sortOption = concat(sortOption, @json_SortColumn, ' DESC ');
  end if;
  end if;
 
 SET sortCount = sortCount + 1;
end while;

set @s = concat(@s, ' ORDER BY ', sortOption, ' ');

end if;

set @s = concat(@s, ' limit ', itemsPerPage, ' offset ', offst, ';');

PREPARE stmt FROM @s;
EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
end; 
//
DELIMITER ;

-- select sql_calc_found_rows * from tasks where statusId = 2;
-- select found_rows();

drop procedure GetPaginatedItems;
 
call GetPaginatedItems('users', 2, 5, '["email"]', '["-1"]', null, null);
call GetPaginatedItems('users', 1, 5, null, null, null, null);
call GetPaginatedItems('users', 1, 5, null, null, '["name"]', '["Alice Morgan1"]');

call GetPaginatedItems('tasks', 1, 5, '["title", "creationDate"]', '["1", "-1"]', null, null);
call GetPaginatedItems('tasks', 2, 5, '["title", "creationDate"]', '["1", "-1"]', null, null);
call GetPaginatedItems('tasks', 1, 5, '["title"]', '["1"]', null, null);
call GetPaginatedItems('tasks', 2, 5, '["title"]', '["1"]', null, null);

call GetPaginatedItems('tasks', 1, 5, null, null, null, null);
call GetPaginatedItems('tasks', 2, 5, null, null, null, null);

call GetPaginatedItems('tasks', 1, 5, '["creationDate"]', '["1"]', '["statusId"]', '["2"]');
call GetPaginatedItems('tasks', 2, 5, null, null, '["statusId"]', '["2"]');
select * from tasks where statusId=2;