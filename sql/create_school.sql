create table school (
    id serial primary key,
    name varchar not null unique,
    region varchar not null
)