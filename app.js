import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import linksRouter from './routes/links.js';
import usersRouter from './routes/users.js';
const app = express();

// Middleware
app.use(express.json());

// Routers
app.use('/api/links', linksRouter);
app.use('/api/users', usersRouter);

// DB connection

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
