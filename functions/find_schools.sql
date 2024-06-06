create type schools_type as (
    id integer,
    name text,
    region text,
    learners_count integer,
    teachers_count integer
);

create or replace function find_schools ()
    returns table (
        school_row schools_type
    ) as
$$
begin
    return query
        select s.id, s.name::text, s.region::text, count(ls.id)::integer as learners_count, count(ts.id)::integer as teachers_count
        from school s
        left join learner_school ls on s.id = ls.school_id
        left join teacher_school ts on s.id = ts.school_id
        group by s.id
        order by s.id;
end;
$$
Language plpgsql;