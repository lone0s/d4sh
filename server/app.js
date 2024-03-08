const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const readlineSync = require('readline-sync');

const app = express();
const PORT = process.env.PORT || 3003;

// Middleware pour analyser les corps de requête
app.use(bodyParser.json());

// Demander le nom d'utilisateur et le mot de passe à l'utilisateur
const username = 'postgres'; 
const password = readlineSync.question('Mot de passe PostgreSQL : ', { hideEchoBack: true });

// Connexion à la base de données PostgreSQL
const sequelize = new Sequelize('d4sh', username, password, {
  host: 'localhost',
  dialect: 'postgres',
});



// on vérifit  la connexion à la base de données
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie.');
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données:', err);
  });

module.exports = sequelize;

const mainRouter = require('./routes'); // Importez le fichier routes correctement
app.use('/', mainRouter);

// ecoute du serveur sur le port spécifié
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}.`);
});
