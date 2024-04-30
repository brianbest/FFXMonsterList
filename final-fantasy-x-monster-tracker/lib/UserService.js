import { User } from './User';
import db from './db';


function createUser({uuid, username, email}) {
    // create a create_date value for the datetime column
    const create_date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    return db.query('INSERT INTO users (uuid, username, email, create_date, last_modified_date) VALUES (?)', [uuid, username, email, create_date, create_date]);
}

function updateUser({username, email}) {
    // create a create_date value for the datetime column
    const last_modified_date = new Date().toISOString().slice(0, 19).replace('T', ' ');

    return db.query('INSERT INTO users (uuid, username, email, last_modified_date) VALUES (?)', [username, email, last_modified_date]);
}

async function getUser(uuid) {
    const results = await db.query('SELECT * FROM users WHERE uuid = ?', [uuid]);
    if (results[0].length != 0) {
        return createUserFromRow(results[0][0]);
    }

    return null; // no user found
}

function deleteUser(uuid) {
    return db.query('DELETE FROM users WHERE uuid = ?', [uuid]);
}

function createUserFromRow(row) {
    return new User(row.uuid, row.username, row.email, row.create_date, row.last_modified_date);
}

export default { createUser, updateUser, getUser, deleteUser };