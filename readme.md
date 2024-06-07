# Schools Database Project
[![Node.js CI](https://github.com/tommyshado/schools_database/actions/workflows/node.js.yml/badge.svg)](https://github.com/tommyshado/schools_database/actions/workflows/node.js.yml)

## Overview

This project is a database management system designed for schools. It aims to manage and organize data related to schools, teachers, learners, subjects, and grades. The system is built using SQL scripts for various operations, serving as a backend for a school management application or a similar educational platform.

## Directory Structure

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

## Continuous Integration with GitHub Actions

The Schools Database Project leverages GitHub Actions for continuous integration, automating the execution of SQL scripts and running tests against a PostgreSQL database. This ensures consistency and reliability across development environments.

### GitHub Actions Workflow

The project's CI pipeline is configured in `.github/workflows/node.js.yml`. It automates the following:

1. **Service Setup**: Configures a PostgreSQL service with predefined credentials and database name.
2. **Dependency Installation**: Installs Node.js dependencies required for the project.
3. **Database Preparation**: Executes SQL scripts to set up the database schema and seed initial data.
4. **Testing**: Runs the test suite against the prepared PostgreSQL instance.

### Workflow Trigger

The workflow activates on pushes and pull requests to the master branch, providing immediate feedback on the impact of changes.

### How to Use the Workflow

To use the GitHub Actions workflow, follow these steps:

1. **Ensure PostgreSQL Service Configuration**: The workflow sets up a PostgreSQL service container with the following environment variables:
    ```yaml
    services:
      postgres:
        image: postgres:latest
        env:
          POSTGRES_USER: codex-coder
          POSTGRES_PASSWORD: codex123
          POSTGRES_DB: schools
        ports:
          - 5432:5432
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    ```

2. **Execute SQL Scripts**: Before running tests, the workflow executes SQL scripts to prepare the database. This involves truncating tables and inserting initial data as defined in `./sql/` and `./functions/`.
    ```yaml
    - name: Create PostgreSQL tables
      run: |
        chmod +x ./utils/run_sql_scripts.sh
        ./utils/run_sql_scripts.sh
    ```

    Ensure the `run_sql_scripts.sh` utility script is correctly set up to execute SQL scripts found in the `sql/` directory, including `insert_scripts.sql` for initializing the database schema and creating records.

3. **Run Tests**: With the database prepared, the workflow proceeds to run tests using the `npm test` command, ensuring that the application behaves as expected with the database in a known state.
    ```yaml
    - name: Run tests with PostgreSQL
      env:
        DB_URL: postgresql://codex-coder:codex123@localhost:5432/schools
      run: npm test
    ```

### Utilization

- **Automation**: Automates database setup and testing, enhancing development efficiency and reliability.
- **Visibility**: Access workflow runs via the GitHub repository's "Actions" tab for insights into execution logs and outcomes.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
