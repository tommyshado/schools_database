/**
 * @name create_teacher
 * @description This function creates a new learner in the learners table.
 * @param {varchar} the_first_name - The first name of the teacher.
 * @param {varchar} the_last_name - The last name of the teacher.
 * @param {varchar} the_email - The email of the teacher.
 * @param {int} the_grade_id - The grade id of the teacher.
 * @returns {boolean} Returns true if the teacher is successfully created, false otherwise.
 * @example
 * create_teacher('John', 'Doe', 'john.doe@example.com');
 */

create or replace function create_teacher(the_first_name varchar, the_last_name varchar, the_email varchar)
    returns boolean as
$$
declare
    email_count int;
begin
    select count(*) into email_count from teacher where email = the_email;
    if email_count = 0 then
        insert into teacher (first_name, last_name, email) 
            values (the_first_name, the_last_name, the_email);
        return true;
    else
        return false;
    end if;
end;
$$
language plpgsql;