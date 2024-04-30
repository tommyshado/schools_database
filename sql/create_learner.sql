create domain contact_name as 
   varchar not null check (value !~ '\s');

create table learner (
    id serial primary key,
    first_name contact_name,
    last_name contact_name,
    email varchar not null unique,
    grade_id int not null,
    foreign key (grade_id) references grade(id)
)