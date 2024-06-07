-- Create a function called link_teacher_to_subject that links a teacher to a subject 
-- and ensures that a teacher is not linked to a subject more than once.

create or replace function link_teacher_to_subject(the_teacher_id int, the_subject_id int)
    returns boolean as
$$
declare

number_of_pairs int;
subject_count int;
teacher_count int;

begin

    select into subject_count count(*) from subject where id = the_subject_id;
    select into teacher_count count(*) from teacher where id = the_teacher_id;

    if (subject_count = 1 and teacher_count = 1) then
        select into number_of_pairs count(*) from teacher_subject where teacher_id = the_teacher_id;

        if (number_of_pairs = 0) then
            insert into teacher_subject (teacher_id, subject_id) values (the_teacher_id, the_subject_id);
            return true;
        else
            return false;
        end if;
    else
        return false;
    end if;

end;
$$
Language plpgsql;