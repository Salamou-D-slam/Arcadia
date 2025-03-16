
import db from "../config/db.js";

export const getAllUsers = async () => {
    return db.query(`
        SELECT users.id, users.email, roles.name AS role
        FROM users
        JOIN roles ON users.role_id = roles.id
    `);
};
