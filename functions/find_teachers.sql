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