
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const db = require('../config/db');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. Please login first.'
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        // Create SHA-256 hash of token
        const tokenHash = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

        // Check whether token has been revoked
        const sql = `
            SELECT id FROM revoked_tokens
            WHERE token_hash = ?
        `;

        db.query(sql, [tokenHash], (err, results) => {
            if (err) {
                console.error('Token check error:', err.message);

                return res.status(500).json({
                    success: false,
                    message: 'Authentication service unavailable'
                });
            }

            if (results.length > 0) {
                return res.status(401).json({
                    success: false,
                    message: 'Session expired. Please login again.'
                });
            }

req.user = decoded;
req.token = token;

next();
        });

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token'
        });
    }
};

module.exports = verifyToken;
