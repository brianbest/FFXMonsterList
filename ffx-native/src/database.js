import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('ffx_monsters.db');

export const initDB = () => {
  db.transaction(tx => {
    // Create locations table
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS locations (
        location_id INTEGER PRIMARY KEY AUTOINCREMENT,
        location_name TEXT NOT NULL UNIQUE
      );`
    );

    // Create fiend_types table
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS fiend_types (
        fiend_type_id INTEGER PRIMARY KEY AUTOINCREMENT,
        type_name TEXT NOT NULL UNIQUE
      );`
    );

    // Create elements table
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS elements (
        element_id INTEGER PRIMARY KEY AUTOINCREMENT,
        element_name TEXT NOT NULL UNIQUE
      );`
    );

    // Create fiends table
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS fiends (
        fiend_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        hp INTEGER NOT NULL,
        mp INTEGER NOT NULL,
        fiend_type_id INTEGER,
        location_id INTEGER,
        FOREIGN KEY (fiend_type_id) REFERENCES fiend_types(fiend_type_id),
        FOREIGN KEY (location_id) REFERENCES locations(location_id)
      );`
    );

    // Create drops table
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS drops (
        drop_id INTEGER PRIMARY KEY AUTOINCREMENT,
        fiend_id INTEGER,
        common_drop TEXT,
        bribe_drop TEXT,
        FOREIGN KEY (fiend_id) REFERENCES fiends(fiend_id)
      );`
    );

    // Create elemental_weaknesses table
    // Note: For booleans, we use INTEGER (0 or 1)
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS elemental_weaknesses (
        weakness_id INTEGER PRIMARY KEY AUTOINCREMENT,
        fiend_id INTEGER,
        element_id INTEGER,
        multiplier REAL,
        is_immune INTEGER DEFAULT 0,
        absorbs INTEGER DEFAULT 0,
        FOREIGN KEY (fiend_id) REFERENCES fiends(fiend_id),
        FOREIGN KEY (element_id) REFERENCES elements(element_id)
      );`
    );
  },
  (error) => {
    console.error("Error initializing database", error);
  },
  () => {
    console.log("Database initialized successfully");
  });
};

export default db; 