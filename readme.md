# Schools Database Project

This project is a database management system designed for schools. It aims to manage and organize data related to schools, teachers, learners, subjects, and grades. The system is built using SQL scripts for various operations, serving as a backend for a school management application or a similar educational platform.

## Overview

The project is organized into two main directories:

- `functions/`: Contains SQL scripts for various functions related to the database, such as adding teachers, changing learner schools, creating subjects, etc.
- `sql/`: Contains SQL scripts for database operations like adding grades, learners, schools, subjects, teachers, creating relationships between entities, etc.

## SQL Functions

### `linkLearnerToSchool`

- **Description**: Links a learner to a school. It does nothing if the learner is already linked to a school.
- **Parameters**:
 - `the_learner_id`: The ID of the learner to be linked to a school.
 - `the_school_id`: The ID of the school to which the learner is to be linked.
- **Returns**: void
- **Raises**: Nothing
- **Side Effects**: Inserts a record into the `learner_school` table if the learner is not already linked to a school.

### `getLearnersCurrentSchool`

- **Description**: Retrieves the current school of a learner.
- **Parameters**:
 - `the_learner_id`: The ID of the learner whose current school is to be retrieved.
- **Returns**: A table containing the ID and name of the current school of the specified learner.
- **Raises**: Nothing
- **Side Effects**: Retrieves the current school of the specified learner from the `learner_school` table.

### `changeLearnerSchool`

- **Description**: Changes the school of a learner. If the learner is already linked to a school, it updates the `current_school` flag to false for the previous school and inserts a new record into the `learner_school` table for the new school.
- **Parameters**:
 - `the_learner_id`: The ID of the learner whose school is to be changed.
 - `the_school_id`: The ID of the new school to which the learner is to be linked.
- **Returns**: void
- **Raises**: Nothing
- **Side Effects**: Updates the `current_school` flag to false for the previous school and inserts a new record into the `learner_school` table for the new school.

### `learner_school` Table

- **Description**: This table links learners to schools, indicating which school a learner is currently associated with.
- **Columns**:
 - `id`: A serial primary key.
 - `learner_id`: The ID of the learner. Foreign key referencing `learner(id)`.
 - `school_id`: The ID of the school. Foreign key referencing `school(id)`.
 - `current_school`: A boolean indicating whether the learner is currently associated with the school.

## Getting Started

To get started with this project, clone the repository and set up your SQL environment. You can then execute the SQL scripts in the `functions/` and `sql/` directories to set up the database and its functions.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
