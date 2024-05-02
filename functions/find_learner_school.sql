-- Function: getLearnersCurrentSchool
-- Description: This function retrieves the current school of a learner. It returns a table containing the ID and name of the current school of the specified learner.
-- Parameters:
--   the_learner_id: The ID of the learner whose current school is to be retrieved.
-- Returns: A table containing the ID and name of the current school of the specified learner.
-- Raises: Nothing
-- Side Effects: It retrieves the current school of the specified learner from the learner_school table.

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
        where learner.id = the_learner_id and learner_school.current_school = true;

end;
$$
Language plpgsql;