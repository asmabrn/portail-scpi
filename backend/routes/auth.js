
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/Admin');

const router = express.Router();



router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    console.log("Tentative de connexion avec:", username);
    
   
    const allUsers = await User.find();
    console.log("Tous les utilisateurs:", allUsers);
    
   
    const userWithoutPassword = await User.findOne({ username });
    console.log("Utilisateur sans select password:", userWithoutPassword);
    
   
    const user = await User.findOne({ username }).select('+password');
    console.log("Utilisateur avec select password:", user);
    
    if (!user) {
      console.log("Aucun utilisateur trouvé avec select password");
      return res.status(401).json({ message: 'Username ou mot de passe incorrect' });
    }
    
   
    console.log("Mot de passe fourni:", password);
    console.log("Mot de passe hash en base:", user.password);
    
    const isPasswordCorrect = await user.correctPassword(password);
    console.log("Password correct?", isPasswordCorrect);
    
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Username ou mot de passe incorrect' });
    }

    
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || 'votre_secret_jwt',
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    console.error("Erreur complète:", error);
    res.status(500).json({ message: error.message });
  }
});


router.post('/setup', async (req, res) => {
  try {
   
    const existingAdmin = await User.findOne({ isAdmin: true });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Un administrateur existe déjà' });
    }

    
    const user = new User({
      username: 'admin',
      email: 'admin@example.com', 
      password: 'admin',
      isAdmin: true
    });

    await user.save();

   
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET || 'votre_secret_jwt',
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;