-- Populate users table with dummy data
INSERT INTO users (username, password, email) VALUES
    ('user1', 'password1', 'user1@example.com'),
    ('user2', 'password2', 'user2@example.com'),
    ('user3', 'password3', 'user3@example.com'),
    ('user4', 'password4', 'user4@example.com'),
    ('user5', 'password5', 'user5@example.com');

-- Populate clients table with dummy data
INSERT INTO clients (user_id, ip_address) VALUES
    (1, '192.168.1.101'),
    (2, '192.168.1.102'),
    (3, '192.168.1.103'),
    (4, '192.168.1.104'),
    (5, '192.168.1.105'),
    (1, '192.168.1.106'),
    (1, '192.168.1.107');

-- Populate data table with dummy data
INSERT INTO data (client_id, user_id, up_time, off_time, device_type, browser_info, geolocation) VALUES
    (1, 1, '2024-03-31 08:00:00', '2024-03-31 18:00:00', 'Windows', 'Chrome 99.0', '40.7128,-74.0060'), -- New York, USA
    (2, 2, '2024-03-31 09:30:00', '2024-03-31 19:30:00', 'MacOS', 'Safari 15.0', '34.0522,-118.2437'), -- Los Angeles, USA
    (3, 3, '2024-03-31 10:45:00', '2024-03-31 20:45:00', 'Debian', 'Firefox 98.0', '51.5074,-0.1278'), -- London, UK
    (4, 4, '2024-03-31 12:00:00', '2024-03-31 22:00:00', 'iOS', 'Safari 15.0', '37.7749,-122.4194'), -- San Francisco, USA
    (5, 5, '2024-03-31 13:15:00', '2024-03-31 23:15:00', 'Android', 'Chrome 99.0', '48.8566,2.3522'), -- Paris, France
    (6, 1, '2024-03-31 13:15:00', '2024-03-31 23:15:00', 'Android', 'Chrome 99.0', '48.8566,2.3522'),
    (7, 1, '2024-03-31 12:00:00', '2024-03-31 22:00:00', 'iOS', 'Safari 15.0', '37.7749,-122.4194');

