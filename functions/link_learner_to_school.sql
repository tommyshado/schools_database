-- Create a function called, linkLearnerToSchool(the_learner_id, the_school_id) - link a learner to a school. 
-- Do nothing if the learner is already linked to a school.

create or replace function linkLearnerToSchool(the_learner_id int, the_school_id int)
    returns boolean as
$$
declare

linked_learner int;
current_school varchar;
learner_count int;
school_count int;

begin

    select into learner_count count(*) from learner where id = the_learner_id;
    select into school_count count(*) from school where id = the_school_id;

    if (school_count = 1 and learner_count = 1) then
        select into linked_learner count(*) from learner_school where learner_school.learner_id = the_learner_id;

        -- if a learner is not linked then
        if (linked_learner = 0) then
            -- retrieve the name from the school db then
            select into current_school name from school where id = the_school_id;

            -- check current_school if truthy then
            if (current_school is not null) then
                -- insert into learner_school both the_learner_id & the_school_id into the values (learner_id, school_id)
                insert into learner_school (learner_id, school_id, current_school) 
                    values (the_learner_id, the_school_id, current_school);
                return true;
            end if;
        else
            return false;
        end if;
    else
        return false;
    end if;

end;
$$
Language plpgsql;