
const db = require('../config/db');

const User = {
    // Find user by email
    findByEmail: (email, callback) => {
        const sql = 'SELECT * FROM users WHERE email = ?';

        db.query(sql, [email], callback);
    },

    // Create new user
    create: (username, email, hashedPassword, callback) => {
        const sql = `
            INSERT INTO users (username, email, password)
            VALUES (?, ?, ?)
        `;

        db.query(
            sql,
            [username, email, hashedPassword],
            callback
        );
    }
};

module.exports = User;
