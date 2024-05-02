
create or replace function changeLearnerSchool(the_learner_id int, the_school_id int)
    returns void as
$$
declare

linked_learner int;
the_current_school varchar;
learner_count int;
school_count int;

begin

    select into learner_count count(*) from learner where id = the_learner_id;
    select into school_count count(*) from school where id = the_school_id;

    if (school_count = 1 and learner_count = 1) then
        select into linked_learner count(*) from learner_school where learner_school.learner_id = the_learner_id;
        if (linked_learner > 0) then
            select into the_current_school name from school where id = the_school_id;
            update learner_school set current_school = the_current_school, school_id = the_school_id
                where learner_school.learner_id = the_learner_id;
        end if;
    end if;

end;
$$
Language plpgsql;