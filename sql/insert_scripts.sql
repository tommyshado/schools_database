-- grade table
insert into grade (name) values ('Grade-12');
insert into grade (name) values ('Grade-11');
insert into grade (name) values ('Grade-10');
insert into grade (name) values ('Grade-9');
insert into grade (name) values ('Grade-8');

-- learner table
insert into learner (first_name, last_name, email, grade_id) values ('Tom', 'Timmy', 'tom@email.com', 1);
insert into learner (first_name, last_name, email, grade_id) values ('Simba', 'Katy', 'simba@khumalo.com', 2);
insert into learner (first_name, last_name, email, grade_id) values ('Zen', 'Dlongo', 'zen@email.com', 3);
insert into learner (first_name, last_name, email, grade_id) values ('Fam', 'Forever', 'fam@gmail.com', 4);
insert into learner (first_name, last_name, email, grade_id) values ('big', 'john', 'big@email.com', 5);
insert into learner (first_name, last_name, email, grade_id) values ('Kevin', 'Hart', 'kevin@email.com', 5);

-- schools table
insert into school (name, region) values ('Vuzamanzi', 'Khayelitsha');
insert into school (name, region) values ('Zola', 'Khayelitsha');
insert into school (name, region) values ('Nolungile', 'Khayelitsha');
insert into school (name, region) values ('Vuselela', 'Khayelitsha');
insert into school (name, region) values ('Masiphakame', 'Khayelitsha');

-- learner_school table
insert into learner_school (learner_id, school_id, current_school) values (1, 1, true);
insert into learner_school (learner_id, school_id, current_school) values (2, 2, true);
insert into learner_school (learner_id, school_id, current_school) values (3, 3, false);
insert into learner_school (learner_id, school_id, current_school) values (4, 4, false);
insert into learner_school (learner_id, school_id, current_school) values (5, 5, true);

-- subject table
insert into subject(name) values('Mathematics');
insert into subject(name) values('English');
insert into subject(name) values('IsiXhosa');
insert into subject(name) values('Mathematical_literacy');
insert into subject(name) values('Life_orientation');
insert into subject(name) values('Geography');
insert into subject(name) values('Life_sciences');
insert into subject(name) values('Business_studies');
insert into subject(name) values('Accounting');
insert into subject(name) values('Economics');

-- teacher table
insert into teacher (first_name, last_name, email) values ('Lindani', 'Pani', 'lindani@email.com');
insert into teacher (first_name, last_name, email) values ('Siba', 'Khumalo', 'siba@khumalo.com');
insert into teacher (first_name, last_name, email) values ('Zenande', 'Dlongodlongo', 'zenande@email.com');
insert into teacher (first_name, last_name, email) values ('Ace', 'Tom', 'ace@tom.com');
insert into teacher (first_name, last_name, email) values ('mlungu', 'john', 'mlungu@email.com');

-- teacher_subject
insert into teacher_subject (teacher_id, subject_id) values (1, 5);
insert into teacher_subject (teacher_id, subject_id) values (2, 6);
insert into teacher_subject (teacher_id, subject_id) values (3, 7);
insert into teacher_subject (teacher_id, subject_id) values (4, 8);
insert into teacher_subject (teacher_id, subject_id) values (5, 9);
insert into teacher_subject (teacher_id, subject_id) values (6, 10);
insert into teacher_subject (teacher_id, subject_id) values (6, 9);
insert into teacher_subject (teacher_id, subject_id) values (6, 8);
insert into teacher_subject (teacher_id, subject_id) values (6, 7);