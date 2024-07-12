create or replace function create_subject (the_name text)
    returns boolean as
$$
declare
    -- declare a variable to be used in the function
    total int;
begin
    -- run a query to check if the subject name exists
    select into total count(*) from find_subjects
        where LOWER(name) = LOWER(the_name);
    -- if total is 0 the subject doesn't exist
    if (total = 0) then
        -- then create the subject
        insert into subject (name) values (the_name);
        -- and returns true if the subject was created already
        return true;
    else
        -- returns false if the subject already exists
        return false;
    end if;

end;
$$
Language plpgsql;