#!/bin/bash

# Define the directories containing your SQL scripts
DIRS=("./sql/" "./functions/")

# Loop through each directory
for dir in "${DIRS[@]}"
do
    # Check if the directory exists
    if [[ -d "$dir" ]]; then
        echo "Processing files in $dir..."

        # Loop through each.sql file in the directory
        for file in "$dir"*.sql
        do
            # Extract the filename without the path
            FILENAME=$(basename "$file")

            # Print the file being processed
            echo "Processing $FILENAME..."

            # Execute the SQL script using psql
            # Make sure to replace 'your_username', 'your_password', and 'your_database' with your actual PostgreSQL credentials
            PGPASSWORD=codex123 psql -h localhost -U codex-coder -d schools -a -f "$file"
        done
    else
        echo "Directory $dir does not exist."
    fi
done

echo "All scripts executed successfully."