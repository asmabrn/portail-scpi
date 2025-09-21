const express = require('express');
const router = express.Router();
const Scpi = require('../models/scpi');
const auth = require('../middleware/auth');


router.get('/', async (req, res) => {
  try {
    const scpis = await Scpi.find().populate('societe');
    res.json(scpis);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/', auth, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Accès non autorisé' });
  }

  try {
    const scpi = new Scpi({
      nom: req.body.nom,
      societe: req.body.societe,
      prixPart: req.body.prixPart,
      rendement: req.body.rendement,
      capitalisation: req.body.capitalisation,
      type: req.body.type,
      description: req.body.description,
      image: req.body.image
    });

    const nouvelleScpi = await scpi.save();
    
   
    const scpiPopulee = await Scpi.findById(nouvelleScpi._id).populate('societe');
    
    res.status(201).json(scpiPopulee);
  } catch (err) {
    console.error('Erreur lors de la création de la SCPI:', err);
    res.status(400).json({ message: err.message });
  }
});


router.put('/:id', auth, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Accès non autorisé' });
  }

  try {
    const scpi = await Scpi.findById(req.params.id);
    if (!scpi) {
      return res.status(404).json({ message: 'SCPI non trouvée' });
    }

    if (req.body.nom != null) {
      scpi.nom = req.body.nom;
    }
    if (req.body.societe != null) {
      scpi.societe = req.body.societe;
    }
    if (req.body.prixPart != null) {
      scpi.prixPart = req.body.prixPart;
    }
    if (req.body.rendement != null) {
      scpi.rendement = req.body.rendement;
    }
    if (req.body.capitalisation != null) {
      scpi.capitalisation = req.body.capitalisation;
    }
    if (req.body.type != null) {
      scpi.type = req.body.type;
    }
    if (req.body.description != null) {
      scpi.description = req.body.description;
    }
    if (req.body.image != null) {
      scpi.image = req.body.image;
    }

    const scpiModifiee = await scpi.save();
    
    
    const scpiPopulee = await Scpi.findById(scpiModifiee._id).populate('societe');
    
    res.json(scpiPopulee);
  } catch (err) {
    console.error('Erreur lors de la modification de la SCPI:', err);
    res.status(400).json({ message: err.message });
  }
});


router.delete('/:id', auth, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Accès non autorisé' });
  }

  try {
    const scpi = await Scpi.findById(req.params.id);
    if (!scpi) {
      return res.status(404).json({ message: 'SCPI non trouvée' });
    }

    
    await Scpi.deleteOne({ _id: req.params.id });
    res.json({ message: 'SCPI supprimée' });
  } catch (err) {
    console.error('Erreur de suppression SCPI:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;