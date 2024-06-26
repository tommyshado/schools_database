create type grade_type as (
    id integer,
    name text
);
create or replace function find_grades ()
    returns table (
        grade_row grade_type
    ) as
$$
begin
    return query
        select id, name::text from grade;
end;
$$
Language plpgsql;