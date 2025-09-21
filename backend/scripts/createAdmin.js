
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectMongoDB = require('../bdd/connectbdd');

async function recreateAdmin() {
  try {
    await connectMongoDB();

    console.log('Connecté à MongoDB');

    
    await mongoose.connection.collection('users').deleteMany({});
    console.log('Anciens utilisateurs supprimés');

   
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash('admin', saltRounds);
    console.log('Nouveau mot de passe haché:', hashedPassword);

    //pour inserer directement un admin direct
    const result = await mongoose.connection.collection('users').insertOne({
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    console.log('Nouvel administrateur créé avec ID:', result.insertedId);

   
    const admin = await mongoose.connection.collection('users').findOne({ username: 'admin' });
    console.log('Administrateur en base de données:', admin);

    
    const isMatch = await bcrypt.compare('admin', admin.password);
    console.log('Test de correspondance du mot de passe:', isMatch);

    process.exit(0);
  } catch (error) {
    console.error('Erreur:', error);
    process.exit(1);
  }
}

recreateAdmin();