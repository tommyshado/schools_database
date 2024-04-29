-- Create a function called find_teachers_for_subject that returns all the teachers that teach a specified subject.

create or replace function find_teachers_for_subject(specified_subject text)
    returns table (
        id int,
        first_name text,
        last_name text
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