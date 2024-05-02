create type school_type as (
    id int,
    name varchar
);

create or replace function getLearnersCurrentSchool(the_learner_id int)
    returns table (
        school_row school_type
    ) as
$$
begin

return query
    select school.id, school.name from school
        join learner_school on school.id = learner_school.school_id
        join learner on learner_school.learner_id = learner.id
        where learner.id = the_learner_id;

end;
$$
Language plpgsql;