import { User } from './User';
import db from './db';


function createUser({uuid, name, email}) {
    // create a create_date value for the datetime column
    const create_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log("Create User");
    console.log(uuid, name, email, create_date);
    return db.query('INSERT INTO users (uuid, username, email, create_date, last_modified_date) VALUES (?, ?, ?, ?, ?)', [uuid, name, email, create_date, create_date]);
}

function updateUser({name, email}) {
    // create a create_date value for the datetime column
    const last_modified_date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    return db.query('INSERT INTO users (uuid, username, email, last_modified_date) VALUES (?, ?, ?)', [name, email, last_modified_date]);
}

async function getUser(uuid) {
    const results = await db.query('SELECT * FROM users WHERE uuid = ?', [uuid]);
    console.log(results);
    if (results[0].length != 0) {
        return _createUserFromRow(results[0][0]);
    }

    return null; // no user found
}

function deleteUser(uuid) {
    return db.query('DELETE FROM users WHERE uuid = ?', [uuid]);
}

function _createUserFromRow(row) {
    return new User(row.uuid, row.username, row.email, row.create_date, row.last_modified_date);
}

export default { createUser, updateUser, getUser, deleteUser };