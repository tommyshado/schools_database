-- Function: find_teachers_for_subject
-- Description: This function retrieves all the teachers that teach a specified subject. It returns a table containing the ID, first name, last name, and email of the teachers that teach the specified subject.
-- Parameters:
--   specified_subject: The name of the subject for which the teachers are to be retrieved.
-- Returns: A table containing the ID, first name, last name, and email of the teachers that teach the specified subject.
-- Raises: Nothing
-- Side Effects: It retrieves the teachers that teach the specified subject from the teacher, teacher_subject, and subject tables.


create or replace function find_teachers_for_subject(specified_subject text)
    returns table (
        id int,
        first_name text,
        last_name text,
        email text
    ) as
$$

begin
    return query
    select teacher.id, teacher.first_name, teacher.last_name from teacher
        join teacher_subject on teacher.id = teacher_subject.teacher_id
        join subject on teacher_subject.subject_id = subject.id
        where subject.name = specified_subject;
end;
$$
Language plpgsql;