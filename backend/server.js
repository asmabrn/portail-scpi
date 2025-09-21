const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const societeRoutes = require('./routes/societes');
const scpiRoutes = require('./routes/scpis');
const connectMongoDB = require('./bdd/connectbdd');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à la base de données
connectMongoDB(); 

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/societes', societeRoutes);
app.use('/api/scpis', scpiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});