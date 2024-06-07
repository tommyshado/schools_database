create or replace function create_schools (the_name text, the_region text)
    returns boolean as
$$
declare
    school_count integer;
begin
    select count(*) into school_count from school where name = the_name;
    if school_count = 0 then
        insert into school (name, region) values (the_name, the_region);
        return true;
    else 
        return false;
    end if;
end;
$$ language plpgsql;