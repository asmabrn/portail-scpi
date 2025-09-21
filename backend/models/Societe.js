const mongoose = require('mongoose');

const societeSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true
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

module.exports = mongoose.model('Societe', societeSchema);