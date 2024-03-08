const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../app');

const User = sequelize.define('user', {
  // Définissez les attributs du modèle User
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Assure que chaque adresse mail est unique
  },
  // Ajoutez la colonne "createdAt" explicite
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  }
}, {
  tableName: 'users', // Définissez le nom de la table
});

module.exports = User;
