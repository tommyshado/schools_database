-- Function: changeLearnerSchool
-- Description: This function changes the school of a learner. If the learner is already linked to a school, 
--              it updates the current_school flag to false for the previous school and inserts a new record into the learner_school table for the new school.
-- Parameters:
--   the_learner_id: The ID of the learner whose school is to be changed.
--   the_school_id: The ID of the new school to which the learner is to be linked.
-- Returns: void
-- Raises: Nothing
-- Side Effects: It updates the current_school flag to false for the previous school and inserts a new record into the learner_school table for the new school.

create or replace function change_learner_school(the_learner_id int, the_school_id int)
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
        if (linked_learner > 0) then
            update learner_school set current_school = false
                where learner_id = the_learner_id 
                and current_school = true;
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