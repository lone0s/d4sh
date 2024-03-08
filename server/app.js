const pool = require('./db');


pool.connect((err, client, release) => {
    if (err) {
      return console.error('Impossible de se connecter à la base de données :', err.stack);
    }
    console.log('Connexion à la base de données réussie.');
    release();
  });
  