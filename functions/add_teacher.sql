-- Create a function called add_teacher that adds a new teacher and ensures that the email for the teacher is unique. 
-- If the email is not unique the teacher should not be added to the database and the function should return false.

-- add_teacher function should take in three params (first_name, last_name, email);
-- add_teacher function should return true or false depending if the teacher email exists;

create or replace function add_teacher(the_first_name text, the_last_name text, the_email text)
    returns boolean as
$$
declare
    -- declare a variable set the variable to an integer;
    total int;
begin
    -- run a query to check if the teacher email exists;
    select into total count(*) from teacher
        where LOWER(email) = LOWER(the_email);
    -- check if the declared variable is truthy then
    if (total = 0) then
        -- otherwise, insert the values (first_name, last_name, email) into the teacher database and
        insert into teacher (first_name, last_name, email) values (the_first_name, the_last_name, the_email);
        return true;
    else 
        return false;
    end if;

end;
$$
Language plpgsql;
