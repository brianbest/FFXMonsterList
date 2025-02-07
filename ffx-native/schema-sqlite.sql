-- SQLite version of the ffx_monsters schema
-- Note: SQLite does not support CREATE DATABASE or USE statements

-- Create locations table
CREATE TABLE IF NOT EXISTS locations (
    location_id INTEGER PRIMARY KEY AUTOINCREMENT,
    location_name TEXT NOT NULL UNIQUE
);

-- Create fiend_types table
CREATE TABLE IF NOT EXISTS fiend_types (
    fiend_type_id INTEGER PRIMARY KEY AUTOINCREMENT,
    type_name TEXT NOT NULL UNIQUE
);

-- Create elements table
CREATE TABLE IF NOT EXISTS elements (
    element_id INTEGER PRIMARY KEY AUTOINCREMENT,
    element_name TEXT NOT NULL UNIQUE
);

-- Create fiends table
CREATE TABLE IF NOT EXISTS fiends (
    fiend_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    hp INTEGER NOT NULL,
    mp INTEGER NOT NULL,
    fiend_type_id INTEGER,
    location_id INTEGER,
    FOREIGN KEY (fiend_type_id) REFERENCES fiend_types(fiend_type_id),
    FOREIGN KEY (location_id) REFERENCES locations(location_id)
);

-- Create drops table
CREATE TABLE IF NOT EXISTS drops (
    drop_id INTEGER PRIMARY KEY AUTOINCREMENT,
    fiend_id INTEGER,
    common_drop TEXT,
    bribe_drop TEXT,
    FOREIGN KEY (fiend_id) REFERENCES fiends(fiend_id)
);

-- Create elemental_weaknesses table
-- For booleans, we use INTEGER (0 for false, 1 for true)
CREATE TABLE IF NOT EXISTS elemental_weaknesses (
    weakness_id INTEGER PRIMARY KEY AUTOINCREMENT,
    fiend_id INTEGER,
    element_id INTEGER,
    multiplier REAL,
    is_immune INTEGER DEFAULT 0,
    absorbs INTEGER DEFAULT 0,
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