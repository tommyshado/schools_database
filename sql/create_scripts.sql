do $$
begin
    create domain contact_name as 
    varchar not null check (value !~ '\s');
exception
    when duplicate_object then null;
end $$;

create table if not exists grade(
    id serial primary key,
    name varchar not null unique
);

create table if not exists learner (
    id serial primary key,
    first_name contact_name,
    last_name contact_name,
    email varchar not null unique,
    grade_id int not null,
    foreign key (grade_id) references grade(id)
);

create table if not exists school (
    id serial primary key,
    name varchar unique,
    region varchar
);

create table if not exists learner_school (
    id serial primary key,
    learner_id int not null,
    school_id int not null,
    foreign key (learner_id) references learner(id),
    foreign key (school_id) references school(id),
    current_school boolean not null
);

create table if not exists subject(
    id serial not null primary key,
    name text unique
);

create table if not exists teacher(
    id serial not null primary key,
    first_name text not null,
    last_name text not null,
    email text not null unique
);

CREATE TABLE if not exists teacher_school (
    id SERIAL PRIMARY KEY,
    teacher_id INT NOT NULL,
    school_id INT NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES teacher(id),
    FOREIGN KEY (school_id) REFERENCES school(id),
    current_school BOOLEAN NOT NULL
);

create table if not exists teacher_subject (
    teacher_id int not null,
    subject_id int not null,
    foreign key (teacher_id) references teacher(id),
    foreign key (subject_id) references subject(id),
    unique(teacher_id, subject_id)
);