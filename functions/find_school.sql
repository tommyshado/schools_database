create or replace function find_school (the_school_name text default null, the_region text default null)
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
        where
            (the_school_name is not null and s.name = the_school_name and (the_region is null or s.region = the_region)) or 
            (the_school_name is null and the_region is not null and s.region = the_region)
        group by s.id
        order by s.id;
end;
$$
Language plpgsql;