-- Create the database named d4sh
CREATE DATABASE d4sh;

-- Connect to the d4sh database
\c d4sh

-- Create users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50),
    password VARCHAR(30),
    email VARCHAR(100) UNIQUE
);

-- Create clients table with composite primary key
CREATE TABLE clients (
    client_id SERIAL,
    user_id INT REFERENCES users(user_id),
    ip_address INET,
    PRIMARY KEY (client_id, user_id)
);

-- Create data table with composite foreign key
CREATE TABLE data (
    data_id SERIAL,
    client_id INT,
    FOREIGN KEY (client_id) REFERENCES clients(client_id),
    up_time TIMESTAMP,
    off_time TIMESTAMP,
    device_type VARCHAR(50),
    browser_info TEXT,
    geolocation VARCHAR(100),
    PRIMARY KEY (data_id)
);

