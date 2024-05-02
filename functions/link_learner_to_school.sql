-- Create a function called, linkLearnerToSchool(the_learner_id, the_school_id) - link a learner to a school. 
-- Do nothing if the learner is already linked to a school.

create or replace function linkLearnerToSchool(the_learner_id int, the_school_id int)
    returns void as
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
            insert into learner_school_history (learner_id, school_id)
                values (the_learner_id, the_school_id);
            insert into learner_school (learner_id, school_id, current_school) 
                values (the_learner_id, the_school_id, true);
        end if;
    end if;

end;
$$
Language plpgsql;