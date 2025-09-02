import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import responseRoutes from './routes/responseRoutes.js';
import experimentRoutes from './routes/experimentRoutes.js';
import authRoutes from './routes/authRoutes.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); //  Εδώ επιτρέπει requests από όλα τα origins (ή  origin: 'http://localhost:5176')
app.use(express.json());

// Routes
app.use('/api/experiments', experimentRoutes);
app.use('/api/responses', responseRoutes);
app.use('/api/auth', authRoutes);


// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log(' Connected to MongoDB');
  app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

