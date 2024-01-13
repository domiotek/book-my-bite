INSERT INTO country (name) VALUES ('Poland');

INSERT INTO voivodeship (voivodeship_id, country_id, name) VALUES (1, 1, 'Lesser Poland');

INSERT INTO city (city_id, voivodeship_id, name) VALUES (1, 1, 'Krakow');

INSERT INTO role (name) VALUES ('Customer'), ('Manager');

INSERT INTO "user" (email, password_hash, name, surname, phone, role_id) VALUES 
('user1@example.com', 'passwordhash1', 'User1', 'Surname1', '0000000001', 2),
('user2@example.com', 'passwordhash2', 'User2', 'Surname2', '0000000002', 2);

INSERT INTO address (city_id, street_name, building_number, zip_code) VALUES 
(1, 'Main Street 1', '31', '31-000'),
(1, 'Main Street 2', '32', '31-000'),
(1, 'Main Street 3', '33', '31-000'),
(1, 'Main Street 4', '34', '31-000'),
(1, 'Main Street 5', '35', '31-000'),
(1, 'Main Street 6', '36', '31-000'),
(1, 'Main Street 7', '37', '31-000'),
(1, 'Main Street 8', '38', '31-000'),
(1, 'Main Street 9', '39', '31-000'),
(1, 'Main Street 10', '40', '31-000');

INSERT INTO foodtype (name) VALUES ('Italian'), ('Mexican'), ('Chinese'), ('Japanese'), ('Indian');

INSERT INTO menu (url) VALUES ('http://menu1.com'), ('http://menu2.com'), ('http://menu3.com'), ('http://menu4.com'), ('http://menu5.com');

INSERT INTO restaurant (name, description, menu_id, foodtype_id, address_id) VALUES 
('Restaurant 1', 'A cozy place for dining', 1, 1, 1),
('Restaurant 2', 'A cozy place for dining', 2, 2, 2),
('Restaurant 3', 'A cozy place for dining', 3, 3, 3),
('Restaurant 4', 'A cozy place for dining', 4, 4, 4),
('Restaurant 5', 'A cozy place for dining', 5, 5, 5),
('Restaurant 6', 'A cozy place for dining', 1, 1, 6),
('Restaurant 7', 'A cozy place for dining', 2, 2, 7),
('Restaurant 8', 'A cozy place for dining', 3, 3, 8),
('Restaurant 9', 'A cozy place for dining', 4, 4, 9),
('Restaurant 10', 'A cozy place for dining', 5, 5, 10);

INSERT INTO "table" (restaurant_id, table_name, description, max_clients_number) VALUES 
(1, 'Table 1-1', 'Near the window', 4),
(1, 'Table 1-2', 'VIP section', 6),
(1, 'Table 1-3', 'Private room', 2),
(1, 'Table 1-4', 'Patio', 4),
(1, 'Table 1-5', 'Main hall', 8),
(2, 'Table 2-1', 'Near the window', 4),
(2, 'Table 2-2', 'VIP section', 6),
(2, 'Table 2-3', 'Private room', 2),
(2, 'Table 2-4', 'Patio', 4),
(2, 'Table 2-5', 'Main hall', 8),
(3, 'Table 3-1', 'Near the window', 4),
(3, 'Table 3-2', 'VIP section', 6),
(3, 'Table 3-3', 'Private room', 2),
(3, 'Table 3-4', 'Patio', 4),
(3, 'Table 3-5', 'Main hall', 8),
(4, 'Table 4-1', 'Near the window', 4),
(4, 'Table 4-2', 'VIP section', 6),
(4, 'Table 4-3', 'Private room', 2),
(4, 'Table 4-4', 'Patio', 4),
(4, 'Table 4-5', 'Main hall', 8),
(5, 'Table 5-1', 'Near the window', 4),
(5, 'Table 5-2', 'VIP section', 6),
(5, 'Table 5-3', 'Private room', 2),
(5, 'Table 5-4', 'Patio', 4),
(5, 'Table 5-5', 'Main hall', 8),
(6, 'Table 6-1', 'Near the window', 4),
(6, 'Table 6-2', 'VIP section', 6),
(6, 'Table 6-3', 'Private room', 2),
(6, 'Table 6-4', 'Patio', 4),
(6, 'Table 6-5', 'Main hall', 8),
(7, 'Table 7-1', 'Near the window', 4),
(7, 'Table 7-2', 'VIP section', 6),
(7, 'Table 7-3', 'Private room', 2),
(7, 'Table 7-4', 'Patio', 4),
(7, 'Table 7-5', 'Main hall', 8),
(8, 'Table 8-1', 'Near the window', 4),
(8, 'Table 8-2', 'VIP section', 6),
(8, 'Table 8-3', 'Private room', 2),
(8, 'Table 8-4', 'Patio', 4),
(8, 'Table 8-5', 'Main hall', 8),
(9, 'Table 9-1', 'Near the window', 4),
(9, 'Table 9-2', 'VIP section', 6),
(9, 'Table 9-3', 'Private room', 2),
(9, 'Table 9-4', 'Patio', 4),
(9, 'Table 9-5', 'Main hall', 8),
(10, 'Table 10-1', 'Near the window', 4),
(10, 'Table 10-2', 'VIP section', 6),
(10, 'Table 10-3', 'Private room', 2),
(10, 'Table 10-4', 'Patio', 4),
(10, 'Table 10-5', 'Main hall', 8);

INSERT INTO restaurant_manager (restaurant_id, user_id) VALUES 
(1, 1),
(2, 2);