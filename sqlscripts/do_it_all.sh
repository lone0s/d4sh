#!/bin/bash

# Set PostgreSQL connection parameters
# These are the default values, feel free to change them if you've got a specialized config
username="postgres"
password="postgres"
port="5432"
database="d4sh"

# Function to drop the database
drop_database() {
    echo "Dropping database $database"
    PGPASSWORD="$password" psql -U "$username" -p "$port" -c "DROP DATABASE IF EXISTS $database"
}

# Function to execute scripts and handle errors
execute_scripts() {
    echo "Creating database :)"
    PGPASSWORD="$password" psql -U "$username" -p "$port" -f create_db.sql || { echo "Error executing create_db.sql :("; drop_database; exit 1; }

    echo "Populating database :)"
    PGPASSWORD="$password" psql -U "$username" -p "$port" -f populate_db.sql -d "$database" || { echo "Error executing populate_db.sql :("; drop_database; exit 1; }
}

# Main script
echo "Connecting to PostgreSQL..."
execute_scripts

echo "Scripts executed successfully!"
