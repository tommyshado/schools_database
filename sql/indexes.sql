-- Learners indexes
CREATE INDEX idx_learner_id ON learner_school(learner_id);
CREATE INDEX idx_school_id ON learner_school(school_id);
-- Teacher indexes
CREATE INDEX idx_teacher_id ON teacher_school(teacher_id);
CREATE INDEX idx_teacher_school_id ON teacher_school(school_id);
