-- Create a function called link_teacher_to_subject that links a teacher to a subject 
-- and ensures that a teacher is not linked to a subject more than once.

create or replace function link_teacher_to_subject(the_teacher_id int, the_subject_id int)
    returns boolean as
$$
declare

number_of_pairs int;

begin

    select into number_of_pairs count(*) from teacher_subject
        where teacher_id = the_teacher_id and subject_id = the_subject_id;

    if (number_of_pairs = 0) then
        insert into teacher_subject (teacher_id, subject_id) values (the_teacher_id, the_subject_id);
        return true;
    else
        return false;
    end if;

end;
$$
Language plpgsql;