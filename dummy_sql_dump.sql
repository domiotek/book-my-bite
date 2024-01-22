INSERT INTO country (name) VALUES ('Poland');

INSERT INTO voivodeship (voivodeship_id, country_id, name) VALUES (1, 1, 'Lesser Poland');

INSERT INTO city (city_id, voivodeship_id, name) VALUES 
(1, 1, 'Krakow'),
(2, 1, 'Wroclaw'),
(3, 1, 'Warszawa'),
(4, 1, 'Gdansk'),
(5, 1, 'Poznan');

INSERT INTO role (name) VALUES ('Customer'), ('Manager');

INSERT INTO "user" (email, password_hash, name, surname, phone, role_id) VALUES 
('user1@example.com', '$2b$10$/Kzy8eANzA5pJjvaSc5d2uyF78fAgqytlySC8TtJAJOGi9/J6Vpfu', 'User1', 'Surname1', '0000000001', 2),
('user2@example.com', '$2b$10$RaYiaLncJhrqEFFPNNqUnOdItvjKfHz2sZGswZhBU1pon5QNxZjB2', 'User2', 'Surname2', '0000000002', 2);

INSERT INTO address (city_id, street_name, building_number, zip_code) VALUES 
(1, 'Main Street 1', '31', '31-000'),
(1, 'Main Street 2', '32', '31-000'),
(1, 'Main Street 6', '36', '31-000'),
(1, 'Main Street 7', '37', '31-000'),
(1, 'Main Street 8', '38', '31-000'),
(1, 'Main Street 9', '39', '31-000'),
(1, 'Main Street 10', '40', '31-000'),
(3, 'Main Street 5', '35', '31-000'),
(2, 'Main Street 3', '33', '31-000'),
(5, 'Main Street 4', '34', '31-000');

INSERT INTO foodtype (name) VALUES ('Włoska'), ('Meksykańska'), ('Chińska'), ('Japońska'), ('Indonezyjska'), ('Polska'), ('Amerykańska');

INSERT INTO menu (url) VALUES ('http://menu1.com'), ('http://menu2.com'), ('http://menu3.com'), ('http://menu4.com'), ('http://menu5.com');

INSERT INTO restaurant (name, description, menu_id, foodtype_id, address_id, table_map, image) VALUES
('Olio | Pizza Napoletana', 'Tutaj jest kozak pizzca', 1, 1, 2, '{"width":800,"height":600,"tables":[{"id":11,"type":"Rect","name":"A1","x":10,"y":100,"width":140,"height":80},{"id":1,"type":"Rect","name":"A2","x":10,"y":255,"width":140,"height":80},{"id":2,"type":"Rect","name":"A3","x":10,"y":410,"width":140,"height":80},{"id":3,"type":"Rect","name":"B1","x":360,"y":100,"width":80,"height":80},{"id":4,"type":"Rect","name":"B2","x":275,"y":255,"width":80,"height":80},{"id":5,"type":"Rect","name":"B3","x":445,"y":255,"width":80,"height":80},{"id":6,"type":"Rect","name":"B4","x":360,"y":410,"width":80,"height":80},{"id":7,"type":"Rect","name":"B5","x":360,"y":565,"width":80,"height":80},{"id":8,"type":"Rect","name":"C1","x":650,"y":100,"width":140,"height":80},{"id":9,"type":"Rect","name":"C2","x":650,"y":255,"width":140,"height":80},{"id":10,"type":"Rect","name":"C3","x":650,"y":410,"width":140,"height":80}],"decors":[{"x":360,"y":185,"width":80,"height":220},{"x":160,"y":10,"width":115,"height":30,"label":"Drzwi"},{"x":530,"y":10,"width":115,"height":30,"label":"Drzwi"},{"x":30,"y":615,"width":110,"height":30,"label":"WC"},{"x":555,"y":615,"width":110,"height":30,"label":"TV"}]}', 'olio.JPG'),
('Lees Chinese', 'Tomasza 20 to super miejsce na zjedzenie czegoś!', 2, 3, 8, '{"width":800,"height":600,"tables":[{"id":11,"type":"Rect","name":"A1","x":10,"y":100,"width":140,"height":80},{"id":1,"type":"Rect","name":"A2","x":10,"y":255,"width":140,"height":80},{"id":2,"type":"Rect","name":"A3","x":10,"y":410,"width":140,"height":80},{"id":3,"type":"Rect","name":"B1","x":360,"y":100,"width":80,"height":80},{"id":4,"type":"Rect","name":"B2","x":275,"y":255,"width":80,"height":80},{"id":5,"type":"Rect","name":"B3","x":445,"y":255,"width":80,"height":80},{"id":6,"type":"Rect","name":"B4","x":360,"y":410,"width":80,"height":80},{"id":7,"type":"Rect","name":"B5","x":360,"y":565,"width":80,"height":80},{"id":8,"type":"Rect","name":"C1","x":650,"y":100,"width":140,"height":80},{"id":9,"type":"Rect","name":"C2","x":650,"y":255,"width":140,"height":80},{"id":10,"type":"Rect","name":"C3","x":650,"y":410,"width":140,"height":80}],"decors":[{"x":360,"y":185,"width":80,"height":220},{"x":160,"y":10,"width":115,"height":30,"label":"Drzwi"},{"x":530,"y":10,"width":115,"height":30,"label":"Drzwi"},{"x":30,"y":615,"width":110,"height":30,"label":"WC"},{"x":555,"y":615,"width":110,"height":30,"label":"TV"}]}','lees-chinese.jpg'),
('Tomasza 20 Restro Bar', 'A cozy place for dining', 3, 1, 1, '{"width":800,"height":600,"tables":[{"id":11,"type":"Rect","name":"A1","x":10,"y":100,"width":140,"height":80},{"id":1,"type":"Rect","name":"A2","x":10,"y":255,"width":140,"height":80},{"id":2,"type":"Rect","name":"A3","x":10,"y":410,"width":140,"height":80},{"id":3,"type":"Rect","name":"B1","x":360,"y":100,"width":80,"height":80},{"id":4,"type":"Rect","name":"B2","x":275,"y":255,"width":80,"height":80},{"id":5,"type":"Rect","name":"B3","x":445,"y":255,"width":80,"height":80},{"id":6,"type":"Rect","name":"B4","x":360,"y":410,"width":80,"height":80},{"id":7,"type":"Rect","name":"B5","x":360,"y":565,"width":80,"height":80},{"id":8,"type":"Rect","name":"C1","x":650,"y":100,"width":140,"height":80},{"id":9,"type":"Rect","name":"C2","x":650,"y":255,"width":140,"height":80},{"id":10,"type":"Rect","name":"C3","x":650,"y":410,"width":140,"height":80}],"decors":[{"x":360,"y":185,"width":80,"height":220},{"x":160,"y":10,"width":115,"height":30,"label":"Drzwi"},{"x":530,"y":10,"width":115,"height":30,"label":"Drzwi"},{"x":30,"y":615,"width":110,"height":30,"label":"WC"},{"x":555,"y":615,"width":110,"height":30,"label":"TV"}]}', 'restro_bar.jpg'),
('Masala Grill & Bar', 'Tu se zjesz indonezyjskie', 4, 5, 3, '{"width":800,"height":600,"tables":[{"id":11,"type":"Rect","name":"A1","x":10,"y":100,"width":140,"height":80},{"id":1,"type":"Rect","name":"A2","x":10,"y":255,"width":140,"height":80},{"id":2,"type":"Rect","name":"A3","x":10,"y":410,"width":140,"height":80},{"id":3,"type":"Rect","name":"B1","x":360,"y":100,"width":80,"height":80},{"id":4,"type":"Rect","name":"B2","x":275,"y":255,"width":80,"height":80},{"id":5,"type":"Rect","name":"B3","x":445,"y":255,"width":80,"height":80},{"id":6,"type":"Rect","name":"B4","x":360,"y":410,"width":80,"height":80},{"id":7,"type":"Rect","name":"B5","x":360,"y":565,"width":80,"height":80},{"id":8,"type":"Rect","name":"C1","x":650,"y":100,"width":140,"height":80},{"id":9,"type":"Rect","name":"C2","x":650,"y":255,"width":140,"height":80},{"id":10,"type":"Rect","name":"C3","x":650,"y":410,"width":140,"height":80}],"decors":[{"x":360,"y":185,"width":80,"height":220},{"x":160,"y":10,"width":115,"height":30,"label":"Drzwi"},{"x":530,"y":10,"width":115,"height":30,"label":"Drzwi"},{"x":30,"y":615,"width":110,"height":30,"label":"WC"},{"x":555,"y":615,"width":110,"height":30,"label":"TV"}]}', 'masala.jpg'),
('Zen On Restaurant', 'Japońskie jedzenie tak o', 5, 4, 4, '{"width":800,"height":600,"tables":[{"id":11,"type":"Rect","name":"A1","x":10,"y":100,"width":140,"height":80},{"id":1,"type":"Rect","name":"A2","x":10,"y":255,"width":140,"height":80},{"id":2,"type":"Rect","name":"A3","x":10,"y":410,"width":140,"height":80},{"id":3,"type":"Rect","name":"B1","x":360,"y":100,"width":80,"height":80},{"id":4,"type":"Rect","name":"B2","x":275,"y":255,"width":80,"height":80},{"id":5,"type":"Rect","name":"B3","x":445,"y":255,"width":80,"height":80},{"id":6,"type":"Rect","name":"B4","x":360,"y":410,"width":80,"height":80},{"id":7,"type":"Rect","name":"B5","x":360,"y":565,"width":80,"height":80},{"id":8,"type":"Rect","name":"C1","x":650,"y":100,"width":140,"height":80},{"id":9,"type":"Rect","name":"C2","x":650,"y":255,"width":140,"height":80},{"id":10,"type":"Rect","name":"C3","x":650,"y":410,"width":140,"height":80}],"decors":[{"x":360,"y":185,"width":80,"height":220},{"x":160,"y":10,"width":115,"height":30,"label":"Drzwi"},{"x":530,"y":10,"width":115,"height":30,"label":"Drzwi"},{"x":30,"y":615,"width":110,"height":30,"label":"WC"},{"x":555,"y":615,"width":110,"height":30,"label":"TV"}]}', 'zen-on.jpg'),
('Ale wino!', 'Tu zjesz dobrze po polsku', 1, 6, 5, '{"width":800,"height":600,"tables":[{"id":11,"type":"Rect","name":"A1","x":10,"y":100,"width":140,"height":80},{"id":1,"type":"Rect","name":"A2","x":10,"y":255,"width":140,"height":80},{"id":2,"type":"Rect","name":"A3","x":10,"y":410,"width":140,"height":80},{"id":3,"type":"Rect","name":"B1","x":360,"y":100,"width":80,"height":80},{"id":4,"type":"Rect","name":"B2","x":275,"y":255,"width":80,"height":80},{"id":5,"type":"Rect","name":"B3","x":445,"y":255,"width":80,"height":80},{"id":6,"type":"Rect","name":"B4","x":360,"y":410,"width":80,"height":80},{"id":7,"type":"Rect","name":"B5","x":360,"y":565,"width":80,"height":80},{"id":8,"type":"Rect","name":"C1","x":650,"y":100,"width":140,"height":80},{"id":9,"type":"Rect","name":"C2","x":650,"y":255,"width":140,"height":80},{"id":10,"type":"Rect","name":"C3","x":650,"y":410,"width":140,"height":80}],"decors":[{"x":360,"y":185,"width":80,"height":220},{"x":160,"y":10,"width":115,"height":30,"label":"Drzwi"},{"x":530,"y":10,"width":115,"height":30,"label":"Drzwi"},{"x":30,"y":615,"width":110,"height":30,"label":"WC"},{"x":555,"y":615,"width":110,"height":30,"label":"TV"}]}', 'ale-wino.jpg'),
('Restaurant 7', 'A cozy place for dining', 2, 2, 7, '{"width":800,"height":600,"tables":[{"id":11,"type":"Rect","name":"A1","x":10,"y":100,"width":140,"height":80},{"id":1,"type":"Rect","name":"A2","x":10,"y":255,"width":140,"height":80},{"id":2,"type":"Rect","name":"A3","x":10,"y":410,"width":140,"height":80},{"id":3,"type":"Rect","name":"B1","x":360,"y":100,"width":80,"height":80},{"id":4,"type":"Rect","name":"B2","x":275,"y":255,"width":80,"height":80},{"id":5,"type":"Rect","name":"B3","x":445,"y":255,"width":80,"height":80},{"id":6,"type":"Rect","name":"B4","x":360,"y":410,"width":80,"height":80},{"id":7,"type":"Rect","name":"B5","x":360,"y":565,"width":80,"height":80},{"id":8,"type":"Rect","name":"C1","x":650,"y":100,"width":140,"height":80},{"id":9,"type":"Rect","name":"C2","x":650,"y":255,"width":140,"height":80},{"id":10,"type":"Rect","name":"C3","x":650,"y":410,"width":140,"height":80}],"decors":[{"x":360,"y":185,"width":80,"height":220},{"x":160,"y":10,"width":115,"height":30,"label":"Drzwi"},{"x":530,"y":10,"width":115,"height":30,"label":"Drzwi"},{"x":30,"y":615,"width":110,"height":30,"label":"WC"},{"x":555,"y":615,"width":110,"height":30,"label":"TV"}]}', 'restro_bar.jpg'),
('Restaurant 8', 'A cozy place for dining', 3, 3, 8, '{"width":800,"height":600,"tables":[{"id":11,"type":"Rect","name":"A1","x":10,"y":100,"width":140,"height":80},{"id":1,"type":"Rect","name":"A2","x":10,"y":255,"width":140,"height":80},{"id":2,"type":"Rect","name":"A3","x":10,"y":410,"width":140,"height":80},{"id":3,"type":"Rect","name":"B1","x":360,"y":100,"width":80,"height":80},{"id":4,"type":"Rect","name":"B2","x":275,"y":255,"width":80,"height":80},{"id":5,"type":"Rect","name":"B3","x":445,"y":255,"width":80,"height":80},{"id":6,"type":"Rect","name":"B4","x":360,"y":410,"width":80,"height":80},{"id":7,"type":"Rect","name":"B5","x":360,"y":565,"width":80,"height":80},{"id":8,"type":"Rect","name":"C1","x":650,"y":100,"width":140,"height":80},{"id":9,"type":"Rect","name":"C2","x":650,"y":255,"width":140,"height":80},{"id":10,"type":"Rect","name":"C3","x":650,"y":410,"width":140,"height":80}],"decors":[{"x":360,"y":185,"width":80,"height":220},{"x":160,"y":10,"width":115,"height":30,"label":"Drzwi"},{"x":530,"y":10,"width":115,"height":30,"label":"Drzwi"},{"x":30,"y":615,"width":110,"height":30,"label":"WC"},{"x":555,"y":615,"width":110,"height":30,"label":"TV"}]}', 'restro_bar.jpg'),
('Restaurant 9', 'A cozy place for dining', 4, 4, 9, '{"width":800,"height":600,"tables":[{"id":11,"type":"Rect","name":"A1","x":10,"y":100,"width":140,"height":80},{"id":1,"type":"Rect","name":"A2","x":10,"y":255,"width":140,"height":80},{"id":2,"type":"Rect","name":"A3","x":10,"y":410,"width":140,"height":80},{"id":3,"type":"Rect","name":"B1","x":360,"y":100,"width":80,"height":80},{"id":4,"type":"Rect","name":"B2","x":275,"y":255,"width":80,"height":80},{"id":5,"type":"Rect","name":"B3","x":445,"y":255,"width":80,"height":80},{"id":6,"type":"Rect","name":"B4","x":360,"y":410,"width":80,"height":80},{"id":7,"type":"Rect","name":"B5","x":360,"y":565,"width":80,"height":80},{"id":8,"type":"Rect","name":"C1","x":650,"y":100,"width":140,"height":80},{"id":9,"type":"Rect","name":"C2","x":650,"y":255,"width":140,"height":80},{"id":10,"type":"Rect","name":"C3","x":650,"y":410,"width":140,"height":80}],"decors":[{"x":360,"y":185,"width":80,"height":220},{"x":160,"y":10,"width":115,"height":30,"label":"Drzwi"},{"x":530,"y":10,"width":115,"height":30,"label":"Drzwi"},{"x":30,"y":615,"width":110,"height":30,"label":"WC"},{"x":555,"y":615,"width":110,"height":30,"label":"TV"}]}', 'restro_bar.jpg'),
('Restaurant 10', 'A cozy place for dining', 5, 5, 10, '{"width":800,"height":600,"tables":[{"id":11,"type":"Rect","name":"A1","x":10,"y":100,"width":140,"height":80},{"id":1,"type":"Rect","name":"A2","x":10,"y":255,"width":140,"height":80},{"id":2,"type":"Rect","name":"A3","x":10,"y":410,"width":140,"height":80},{"id":3,"type":"Rect","name":"B1","x":360,"y":100,"width":80,"height":80},{"id":4,"type":"Rect","name":"B2","x":275,"y":255,"width":80,"height":80},{"id":5,"type":"Rect","name":"B3","x":445,"y":255,"width":80,"height":80},{"id":6,"type":"Rect","name":"B4","x":360,"y":410,"width":80,"height":80},{"id":7,"type":"Rect","name":"B5","x":360,"y":565,"width":80,"height":80},{"id":8,"type":"Rect","name":"C1","x":650,"y":100,"width":140,"height":80},{"id":9,"type":"Rect","name":"C2","x":650,"y":255,"width":140,"height":80},{"id":10,"type":"Rect","name":"C3","x":650,"y":410,"width":140,"height":80}],"decors":[{"x":360,"y":185,"width":80,"height":220},{"x":160,"y":10,"width":115,"height":30,"label":"Drzwi"},{"x":530,"y":10,"width":115,"height":30,"label":"Drzwi"},{"x":30,"y":615,"width":110,"height":30,"label":"WC"},{"x":555,"y":615,"width":110,"height":30,"label":"TV"}]}', 'restro_bar.jpg');

INSERT INTO "table" (restaurant_id, table_name, description, min_clients, max_clients) VALUES
(1, 'Table 1-1', 'Near the window', 2, 4),
(1, 'Table 1-2', 'VIP section', 3, 6),
(1, 'Table 1-3', 'Private room', 1, 2),
(1, 'Table 1-4', 'Patio', 2, 4),
(1, 'Table 1-5', 'Main hall', 4, 8),
(1, 'Table 2-1', 'Near the window', 2, 4),
(1, 'Table 2-2', 'VIP section', 3, 6),
(1, 'Table 2-3', 'Private room', 1, 2),
(1, 'Table 2-4', 'Patio', 2, 4),
(1, 'Table 2-5', 'Main hall', 4, 8),
(1, 'Table 3-1', 'Near the window', 2, 4),
(3, 'Table 3-2', 'VIP section', 3, 6),
(3, 'Table 3-3', 'Private room', 1, 2),
(3, 'Table 3-4', 'Patio', 2, 4),
(3, 'Table 3-5', 'Main hall', 4, 8),
(4, 'Table 4-1', 'Near the window', 2, 4),
(4, 'Table 4-2', 'VIP section', 3, 6),
(4, 'Table 4-3', 'Private room', 1, 2),
(4, 'Table 4-4', 'Patio', 2, 4),
(4, 'Table 4-5', 'Main hall', 4, 8),
(5, 'Table 5-1', 'Near the window', 2, 4),
(5, 'Table 5-2', 'VIP section', 3, 6),
(5, 'Table 5-3', 'Private room', 1, 2),
(5, 'Table 5-4', 'Patio', 2, 4),
(5, 'Table 5-5', 'Main hall', 4, 8),
(6, 'Table 6-1', 'Near the window', 2, 4),
(6, 'Table 6-2', 'VIP section', 3, 6),
(6, 'Table 6-3', 'Private room', 1, 2),
(6, 'Table 6-4', 'Patio', 2, 4),
(6, 'Table 6-5', 'Main hall', 4, 8),
(7, 'Table 7-1', 'Near the window', 2, 4),
(7, 'Table 7-2', 'VIP section', 3, 6),
(7, 'Table 7-3', 'Private room', 1, 2),
(7, 'Table 7-4', 'Patio', 2, 4),
(7, 'Table 7-5', 'Main hall', 4, 8),
(8, 'Table 8-1', 'Near the window', 2, 4),
(8, 'Table 8-2', 'VIP section', 3, 6),
(8, 'Table 8-3', 'Private room', 1, 2),
(8, 'Table 8-4', 'Patio', 2, 4),
(8, 'Table 8-5', 'Main hall', 4, 8),
(9, 'Table 9-1', 'Near the window', 2, 4),
(9, 'Table 9-2', 'VIP section', 3, 6),
(9, 'Table 9-3', 'Private room', 1, 2),
(9, 'Table 9-4', 'Patio', 2, 4),
(9, 'Table 9-5', 'Main hall', 4, 8),
(10, 'Table 10-1', 'Near the window', 2, 4),
(10, 'Table 10-2', 'VIP section', 3, 6),
(10, 'Table 10-3', 'Private room', 1, 2),
(10, 'Table 10-4', 'Patio', 2, 4),
(10, 'Table 10-5', 'Main hall', 4, 8);

INSERT INTO restaurant_manager (restaurant_id, user_id) VALUES (1, 1), (2, 2);

INSERT INTO booking (user_id, table_id, datetime, clients) VALUES
(1, 1, '2024-01-10 10:00', 1), (2, 2, '2024-01-10 10:30', 2), (1, 1, '2024-01-10 16:30', 2);