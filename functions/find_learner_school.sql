create type school_type as (
    id int,
    current_school varchar
);

create or replace function getLearnersCurrentSchool(the_learner_id int)
    returns table (
        school_row school_type
    ) as
$$
begin

return query
    select id, current_school from learner_school 
        where learner_id = the_learner_id order by id desc limit 1;

end;
$$
Language plpgsql;