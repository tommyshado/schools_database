create table teacher_subject (
    teacher_id int not null,
    subject_id int not null,
    foreign key (teacher_id) references teacher(id),
    foreign key (subject_id) references subject(id),
    unique(teacher_id, subject_id)
);