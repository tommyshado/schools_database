do $$
begin
    create type subject_type as (
        id int,
        name text
    );
exception
    when duplicate_object then null;
end $$;

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