-- Create the database
CREATE DATABASE IF NOT EXISTS ffx_monsters;
USE ffx_monsters;

-- Create locations table
CREATE TABLE locations (
    location_id INT AUTO_INCREMENT PRIMARY KEY,
    location_name VARCHAR(100) NOT NULL UNIQUE
);

-- Create fiend_types table
CREATE TABLE fiend_types (
    fiend_type_id INT AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(50) NOT NULL UNIQUE
);

-- Create elements table
CREATE TABLE elements (
    element_id INT AUTO_INCREMENT PRIMARY KEY,
    element_name VARCHAR(50) NOT NULL UNIQUE
);

-- Create fiends table
CREATE TABLE fiends (
    fiend_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    hp INT NOT NULL,
    mp INT NOT NULL,
    fiend_type_id INT,
    location_id INT,
    FOREIGN KEY (fiend_type_id) REFERENCES fiend_types(fiend_type_id),
    FOREIGN KEY (location_id) REFERENCES locations(location_id)
);

-- Create drops table
CREATE TABLE drops (
    drop_id INT AUTO_INCREMENT PRIMARY KEY,
    fiend_id INT,
    common_drop VARCHAR(100),
    bribe_drop VARCHAR(100),
    FOREIGN KEY (fiend_id) REFERENCES fiends(fiend_id)
);

-- Create elemental_weaknesses table
CREATE TABLE elemental_weaknesses (
    weakness_id INT AUTO_INCREMENT PRIMARY KEY,
    fiend_id INT,
    element_id INT,
    multiplier DECIMAL(3,1),
    is_immune BOOLEAN DEFAULT FALSE,
    absorbs BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (fiend_id) REFERENCES fiends(fiend_id),
    FOREIGN KEY (element_id) REFERENCES elements(element_id)
);

-- Insert basic element types
INSERT INTO elements (element_name) VALUES 
('Fire'), ('Ice'), ('Lightning'), ('Water'), 
('Wind'), ('Earth'), ('Holy'), ('Light'), ('None');

-- Insert fiend types
INSERT INTO fiend_types (type_name) VALUES
('Lupine'), ('Bird'), ('Flan'), ('Wolf'), ('Insect'), 
('Dragon'), ('Worm'), ('Plant'), ('Lizard'), ('Spirit'),
('Elemental'), ('Beast'), ('Ghost'), ('Reptile'), ('Cat'),
('Dwarf'), ('Specter'), ('Undead'), ('Twin'), ('Rock'),
('Giant'), ('Turtle'), ('Feline'), ('Wasp'), ('Eye'),
('Amphibian'), ('Demon'), ('Hybrid'), ('Fish'), ('Serpent'),
('Construct'), ('Snake'), ('Brain'), ('Fungus'), ('Canine'),
('Golem'), ('Dragonfly'), ('Bomb');

-- Insert locations
INSERT INTO locations (location_name) VALUES
('Besaid'), ('Bikanel'), ('Omega Dungeon'), ('Inside Sin'),
('Macalania'), ('Mt. Gagazet'), ('Djose Road'), 
('Stolen Fayth Cavern'), ('Thunder Plains'), ('Kilika'),
('Calm Lands'), ('Mushroom Rock Road'), ('Mi''ihen Highroad'); 