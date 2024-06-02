CREATE TABLE teacher_school (
    id SERIAL PRIMARY KEY,
    teacher_id INT NOT NULL,
    school_id INT NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES teacher(id),
    FOREIGN KEY (school_id) REFERENCES school(id),
    current_school BOOLEAN NOT NULL
);