import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
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



// Route pour récupérer les contacts

router.get('/contactRole', isAuthenticated, checkRole([1]), async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM contact');
        res.render('contact.ejs', { contactList: result.rows,  user: req.user  });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur');
    }
  });

  // Route pour afficher les services
router.post('/contactRole', async (req, res) => {
  const titre = req.body.titreC;
  const email  = req.body.emailC;
  const description  = req.body.descriptionC;

  
  console.log('Requête reçue');
  console.log('Body:', req.body);  // Affiche les données reçues

if (!titre || !email || !description ) {
        console.log('Erreur : pseudo ou description manquant');
        return res.status(400).send('Le pseudo et le description sont requis.');
    }
  try {
    
    
      // Insérer le contact dans la base de données
      const result = await db.query(
          'INSERT INTO contact (titre, email, description) VALUES ($1, $2, $3) RETURNING *',
          [titre, email, description]
      );

      // Vérifie si l'insertion a réussi
      console.log(result.rows);  // Affiche les lignes insérées pour le debug

      // Si l'insertion est réussie, redirige l'utilisateur

      res.redirect('/contact');  // Redirige vers la page de contact
  } catch (err) {
      console.error(err.message);  // Affiche les erreurs éventuelles
      res.status(500).send('Erreur lors de la soumission du contact');
  }
});

// Route pour supprimer un contact

router.post('/contact/:id/delete', async (req, res) => {
  const { id } = req.params;
  try {
      const result = await db.query('DELETE FROM contact WHERE id = $1', [id]);
      if (result.rowCount > 0) {
          res.redirect("/contactRole");
      } else {
          res.status(404).send('Contact non trouvé');
      }
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Erreur serveur');
  }
});


export default router;