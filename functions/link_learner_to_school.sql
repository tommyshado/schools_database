-- Create a function called, linkLearnerToSchool(the_learner_id, the_school_id) - link a learner to a school. 
-- Do nothing if the learner is already linked to a school.

create or replace function linkLearnerToSchool(the_learner_id int, the_school_id int)
    returns boolean as
$$
declare

linked_learner int;
current_school varchar;

begin
    /*
    * retrieve both learner_id & school_id count from the learner_school db
    * by joining both learner, school, and learner_school tables
    * add both values count into linked_learner
     */
    select into linked_learner count(*) from learner
        join learner_school on learner.id = learner_school.learner_id
        join school on learner_school.school_id = school.id
        where learner_school.learner_id = the_learner_id and learner_school.school_id = the_school_id;

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
    end if;
    -- otherwise do nothing

end;
$$
Language plpgsql;