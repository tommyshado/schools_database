create or replace function find_learner ()
    returns table (
        learner_row learner_type
    ) as
$$
begin
    return query
        select 
            id, first_name::text, last_name::text, email::text, grade_id::integer
        from learner;
end;
$$
Language plpgsql;