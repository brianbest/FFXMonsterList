require('dotenv').config();
const express = require('express');
const cors = require('cors');
const monstersRoutes = require('./routes/monsters');
const locationsRoutes = require('./routes/locations');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/monsters', monstersRoutes);
app.use('/api/locations', locationsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Add basic error handling for database connection
app.use((err, req, res, next) => {
  console.error('Error:', err);
  if (err.code === 'ECONNREFUSED') {
    return res.status(500).json({ 
      error: 'Database connection failed. Please check if MySQL is running.' 
    });
  }
  next(err);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 