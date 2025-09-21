const express = require('express');
const router = express.Router();
const Societe = require('../models/Societe');
const auth = require('../middleware/auth');


router.get('/', async (req, res) => {
  try {
    console.log('Tentative de récupération des sociétés');
    const societes = await Societe.find().sort({ nom: 1 });
    console.log('Sociétés trouvées:', societes);
    res.json(societes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/', auth, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Accès non autorisé' });
  }

  const societe = new Societe({
    nom: req.body.nom,
    description: req.body.description,
    logo: req.body.logo
  });

  try {
    const nouvelleSociete = await societe.save();
    res.status(201).json(nouvelleSociete);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put('/:id', auth, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Accès non autorisé' });
  }

  try {
    const societe = await Societe.findById(req.params.id);
    if (!societe) {
      return res.status(404).json({ message: 'Société non trouvée' });
    }

    if (req.body.nom != null) {
      societe.nom = req.body.nom;
    }
    if (req.body.description != null) {
      societe.description = req.body.description;
    }
    if (req.body.logo != null) {
      societe.logo = req.body.logo;
    }

    const societeModifiee = await societe.save();
    res.json(societeModifiee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete('/:id', auth, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Accès non autorisé' });
  }

  try {
    const societe = await Societe.findById(req.params.id);
    if (!societe) {
      return res.status(404).json({ message: 'Société non trouvée' });
    }

    
    await Societe.deleteOne({ _id: req.params.id });
    res.json({ message: 'Société supprimée' });
  } catch (err) {
    console.error('Erreur de suppression société:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;