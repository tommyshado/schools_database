create or replace function create_grade (the_name varchar)
    returns boolean as
$$
declare
    grade_pair int;
begin
    select count(*) into grade_pair from grade where name = the_name;
    if grade_pair > 0 then
        return false;
    end if;

    insert into grade (name) values (the_name);
    return true;
end;
$$
language plpgsql;