const mongoose = require('mongoose');

const scpiSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true
  },
  societe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Societe',
    required: true
  },
  prixPart: {
    type: Number,
    required: true
  },
  rendement: {
    type: Number,
    required: true
  },
  capitalisation: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['diversifié', 'bureau', 'commerce', 'santé', 'logistique'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  
  dateCreation: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Scpi', scpiSchema);