require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('../config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(morgan('dev'));  // optional: for logging

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/complaints', require('./routes/complaints'));
app.use('/api/lost-found', require('./routes/lostFound'));

// Home route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handlers
app.use(notFound);
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
