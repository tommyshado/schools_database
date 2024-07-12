create or replace function find_subjects ()
    returns table (
        subject_row subject_type
    ) as
$$
begin

return query
    select
        "subject".id,
        "subject".name
    from subject;

end;
$$
Language plpgsql;