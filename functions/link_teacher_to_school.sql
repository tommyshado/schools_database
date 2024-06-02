-- Function: linkTeacherToSchool
-- Description: This function links a teacher to a school. It does nothing if the learner is already linked to a school.
-- Parameters:
--   the_teacher_id: The ID of the teacher to be linked to a school.
--   the_school_id: The ID of the school to which the learner is to be linked.
-- Returns: void
-- Raises: Nothing
-- Side Effects: It inserts a record into the teacher_school table if the teacher is not already linked to a school.

create or replace function link_teacher_to_school (the_teacher_id int, the_school_id int)
    returns boolean as
$$
declare
    linked_teacher int;
    teacher_count int;
    school_count int;
begin
    select into teacher_count count(*) from teacher where id = the_teacher_id;
    select into school_count count(*) from school where id = the_school_id;

    if (school_count = 1 and teacher_count = 1) then
        select into linked_teacher count(*) from teacher_school where teacher_school.teacher_id = the_teacher_id;
        if (linked_teacher = 0) then
            insert into teacher_school (teacher_id, school_id, current_school) 
                values (the_teacher_id, the_school_id, true);
            return true;
        else
            return false;
        end if;
    end if;
    return false;
end;
$$
Language plpgsql;