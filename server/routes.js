//routes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./models/user.model');



//GET
router.get('/about', (req, res) => {
  res.send('À propos de nous');
});

router.get('/contact', (req, res) => {
  res.send('Contactez-nous');
});

//POST

// Route pour la création de compte
router.post('/signup', async (req, res) => {
    try {
      const { username, password,mail } = req.body;
  
      // on vérifie si l'utilisateur existe déjà
      const existingUser = await User.findOne({ where: { mail } });
      if (existingUser) {
        return res.status(400).json({ message: 'Cet utilisateur existe déjà.' });
      }
  
      // on hash le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // on crée un nouvel utilisateur avec le mot de passe hashé
      const newUser = await User.create({ username, password: hashedPassword,mail : mail });
      
      console.log("newUSer : ",newUser);
      res.status(201).json({ message: 'Compte créé avec succès.', user: newUser });
    } catch (error) {
      console.error('Erreur lors de la création du compte :', error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la création du compte.' });
    }
  });

module.exports = router;
