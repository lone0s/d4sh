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

-- Create clients table with additional information
CREATE TABLE clients (
    client_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    ip_address INET
);

-- Create data table
CREATE TABLE data (
    data_id SERIAL PRIMARY KEY,
    client_id INT REFERENCES clients(client_id),
    up_time TIMESTAMP,
    off_time TIMESTAMP,
    device_type VARCHAR(50),
    browser_info TEXT,
    geolocation VARCHAR(100)
);
