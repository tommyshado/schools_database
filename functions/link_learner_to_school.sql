-- Function: linkLearnerToSchool
-- Description: This function links a learner to a school. It does nothing if the learner is already linked to a school.
-- Parameters:
--   the_learner_id: The ID of the learner to be linked to a school.
--   the_school_id: The ID of the school to which the learner is to be linked.
-- Returns: void
-- Raises: Nothing
-- Side Effects: It inserts a record into the learner_school table if the learner is not already linked to a school.

create or replace function link_learner_to_school(the_learner_id int, the_school_id int)
    returns boolean as
$$
declare
    linked_learner int;
    learner_count int;
    school_count int;
begin
    select into learner_count count(*) from learner where id = the_learner_id;
    select into school_count count(*) from school where id = the_school_id;

    if (school_count = 1 and learner_count = 1) then
        select into linked_learner count(*) from learner_school where learner_school.learner_id = the_learner_id;

        if (linked_learner = 0) then
            insert into learner_school (learner_id, school_id, current_school) 
                values (the_learner_id, the_school_id, true);
            return true;
        else
            return false;
        end if;
    end if;
    return false;
end;
$$
Language plpgsql;