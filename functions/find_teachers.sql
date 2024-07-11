do $$
begin    
    create type teacher_type as (
        id int,
        first_name text,
        last_name text,
        email text
    );
exception
    when duplicate_object then null;
end $$;

create or replace function find_teachers ()
    returns table (
        teacher_row teacher_type
    ) as
$$
begin
    return query
        select id, first_name, last_name, email from teacher;
end;
$$
Language plpgsql;