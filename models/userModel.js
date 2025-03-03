
import db from "../config/db.js";

export const getAllUsers = async () => {
    return await db.query(
        `SELECT users.id, users.email, users.password, users.role_id, roles.label AS role_name 
           FROM users 
           JOIN roles ON users.role_id = roles.id 
           WHERE users.email = $1`
           );
};
