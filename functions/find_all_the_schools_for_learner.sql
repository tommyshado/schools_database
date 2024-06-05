-- Function: getSchoolsForLearner
-- Description: This function retrieves the schools that a learner is associated with. It returns a table containing the ID and name of the schools that the specified learner is associated with.
-- Parameters:
--   the_learner_id: The ID of the learner whose associated schools are to be retrieved.
-- Returns: A table containing the ID and name of the schools that the specified learner is associated with.
-- Raises: Nothing
-- Side Effects: It retrieves the schools that the specified learner is associated with from the learner, learner_school, and school tables.

create or replace function getSchoolsForLearner(the_learner_id int)
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