-- Populate users table with dummy data
INSERT INTO users (username, password, email) VALUES
    ('user1', 'password1', 'user1@example.com'),
    ('user2', 'password2', 'user2@example.com'),
    ('user3', 'password3', 'user3@example.com');

-- Populate clients table with dummy data
INSERT INTO clients (user_id, ip_address) VALUES
    (1, '192.168.1.101'),
    (2, '192.168.1.102'),
    (3, '192.168.1.103');

-- Populate data table with dummy data
INSERT INTO data (client_id, up_time, off_time, device_type, browser_info, geolocation) VALUES
    (1, '2024-03-31 08:00:00', '2024-03-31 18:00:00', 'Windows', 'Chrome 99.0', '40.7128,-74.0060'), -- New York, USA
    (2, '2024-03-31 09:30:00', '2024-03-31 19:30:00', 'MacOS', 'Safari 15.0', '34.0522,-118.2437'), -- Los Angeles, USA
    (3, '2024-03-31 10:45:00', '2024-03-31 20:45:00', 'Debian', 'Firefox 98.0', '51.5074,-0.1278'); -- London, UK


-- Populate data table with dummy data
INSERT INTO data (client_id, up_time, off_time, device_type, browser_info, geolocation) VALUES
    (1, '2024-03-31 08:00:00', '2024-03-31 18:00:00', 'Windows', 'Chrome 99.0', 'New York, USA'),
    (2, '2024-03-31 09:30:00', '2024-03-31 19:30:00', 'MacOS', 'Safari 15.0', 'Los Angeles, USA'),
    (3, '2024-03-31 10:45:00', '2024-03-31 20:45:00', 'Debian', 'Firefox 98.0', 'London, UK');