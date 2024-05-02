create table learner_school_history (
    id serial primary key,
    learner_id int not null,
    school_id int not null,
    foreign key (learner_id) references learner(id),
    foreign key (school_id) references school(id)
)