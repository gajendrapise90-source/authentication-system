
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5174',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Authentication Routes
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Authentication System API is running!');
});

// Test database connection
app.get('/test-db', (req, res) => {
    db.query('SELECT 1 AS result', (err, results) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Database connection failed'
            });
        }

        res.json({
            success: true,
            message: 'MySQL database connected successfully!',
            data: results
        });
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
