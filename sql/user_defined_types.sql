do $$
begin    
    create type grade_type as (
        id integer,
        name text
    );
exception
    when duplicate_object then null;
end $$;

do $$
begin
    create type learner_type as (
        id integer,
        first_name text,
        last_name text,
        email text,
        grade_id integer
    );
exception
    when duplicate_object then null;
end $$;

do $$
begin
    create type schools_type as (
        id integer,
        name text,
        region text,
        learners_count integer,
        teachers_count integer
    );
exception
    when duplicate_object then null;
end $$;

do $$
begin
    create type schools_type as (
        id integer,
        name text,
        region text,
        learners_count integer,
        teachers_count integer
    );
exception
    when duplicate_object then null;
end $$;

do $$
begin
    create type subject_type as (
        id int,
        name text
    );
exception
    when duplicate_object then null;
end $$;

do $$
begin    
    create type teacher_type as (
        id int,
        first_name text,
        last_name text,
        email text
    );
exception
    when duplicate_object then null;
end $$;