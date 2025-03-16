import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from "path";
import dotenv from 'dotenv';
import db from "../config/db.js";
import {checkRole , isAuthenticated} from '../middlewares/authMiddleware.js';



dotenv.config();

// On utilise __dirname avec fileURLToPath pour que le code fonctionne avec ES Modules.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const app = express();

// Middleware pour servir des fichiers statiques
app.use(express.static("Public"));
app.use(express.json());  // Important pour les requêtes JSON
app.use(express.urlencoded({ extended: true })); // Pour gérer les données de formulaires

// Vue moteur EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));




// Route pour récupérer les avis en attente de validation
router.get('/avis', isAuthenticated, checkRole([1,2]), async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM avis WHERE approuve = false');
        res.render('avis.ejs', { avisList: result.rows, user: req.user });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur');
    }
  });

  

// Route pour afficher les services
router.post('/avis', async (req, res) => {
  const pseudo = req.body.pseudo;
  const commentaire  = req.body.commentaire;

  
  console.log('Requête reçue');
  console.log('Body:', req.body);  // Affiche les données reçues

if (!pseudo || !commentaire) {
        console.log('Erreur : pseudo ou commentaire manquant');
        return res.status(400).send('Le pseudo et le commentaire sont requis.');
    }
  try {
    
    
      // Insérer l'avis dans la base de données
      const result = await db.query(
          'INSERT INTO avis (pseudo, commentaire) VALUES ($1, $2) RETURNING *',
          [pseudo, commentaire]
      );

      // Vérifie si l'insertion a réussi
      console.log(result.rows);  // Affiche les lignes insérées pour le debug

      // Si l'insertion est réussie, redirige l'utilisateur
      res.redirect('/');  // Redirige vers la page d'accueil
  } catch (err) {
      console.error(err.message);  // Affiche les erreurs éventuelles
      res.status(500).send('Erreur lors de la soumission de l\'avis');
  }
});





// Route pour valider un avis
router.post('/avis/:id/valider', async (req, res) => {
  const { id } = req.params;
  try {
      const result = await db.query(
          'UPDATE avis SET approuve = true WHERE id = $1 RETURNING *',
          [id]
      );
      if (result.rowCount > 0) {
          res.redirect("/avis");
      } else {
          res.status(404).send('Avis non trouvé');
      }
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Erreur serveur');
  }
});

// Route pour rejeter un avis
router.post('/avis/:id/rejeter', async (req, res) => {
  const { id } = req.params;
  try {
      const result = await db.query('DELETE FROM avis WHERE id = $1', [id]);
      if (result.rowCount > 0) {
          res.redirect("/avis");
      } else {
          res.status(404).send('Avis non trouvé');
      }
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Erreur serveur');
  }
});


export default router;