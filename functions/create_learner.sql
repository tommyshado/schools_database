/**
 * @name create_learner
 * @description This function creates a new learner in the learners table.
 * @param {varchar} the_first_name - The first name of the learner.
 * @param {varchar} the_last_name - The last name of the learner.
 * @param {varchar} the_email - The email of the learner.
 * @param {int} the_grade_id - The grade id of the learner.
 * @returns {boolean} Returns true if the learner is successfully created, false otherwise.
 * @example
 * create_learner('John', 'Doe', 'john.doe@example.com', 10);
 */

create or replace function create_learner(the_first_name varchar, the_last_name varchar, the_email varchar, the_grade_id int)
    returns boolean as
$$
declare

    email_count int;
    grade_count int;

begin

    select count(*) into email_count from learner where email = the_email;
    select count(*) into grade_count from grade where id = the_grade_id;

    if grade_count = 0 then
        return false;
    end if;

    if email_count = 0 then
        insert into learner (first_name, last_name, email, grade_id) 
            values (the_first_name, the_last_name, the_email, the_grade_id);
        return true;
    else 
        return false;
    end if;
end;
$$
language plpgsql;