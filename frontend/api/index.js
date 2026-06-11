const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const questionRoutes = require('./routes/questionRoutes');

// Initialize Express
const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Mount Routes - Notice we ensure the path starts with /api
app.use('/api/questions', questionRoutes);

// Basic health check route
app.get('/api', (req, res) => res.send('Elevate11 API is running on Vercel!'));

// CRITICAL FOR VERCEL: Export the app instead of using app.listen()
module.exports = app;