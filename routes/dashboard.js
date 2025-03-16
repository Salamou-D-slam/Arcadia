import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import db from "../config/db.js";

import {checkRole , isAuthenticated} from '../middlewares/authMiddleware.js';



dotenv.config();

// On utilise __dirname avec fileURLToPath pour que le code fonctionne avec ES Modules.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const app = express();
const saltRounds = 10;

// Middleware pour servir des fichiers statiques
app.use(express.static("Public"));
app.use(express.json());  // Important pour les requêtes JSON
app.use(express.urlencoded({ extended: true })); // Pour gérer les données de formulaires

// Vue moteur EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));



router.get("/admin", isAuthenticated, checkRole([1]), async (req, res) => {
  try {
    //const result = await getAllUsers();
    const result = await db.query(
      'SELECT users.id, users.nom, users.email, users.role_id, roles.label AS role_name  FROM users JOIN roles ON users.role_id = roles.id'
      );
    res.render("profil.ejs", { user: req.user, users: result.rows});
} catch (err) {
    res.status(500).send("Erreur serveur");
}
  });
  
  // Route pour afficher les users

  router.post('/createUsers', async (req, res) => {
    const nom = req.body.nom;
    const email  = req.body.email;
    const password  = req.body.password;
    const role_id  = req.body.role_id;

  
    
    console.log('Requête reçue');
    console.log('Body:', req.body);  // Affiche les données reçues
  
  if (!nom || !email ||!password || !role_id  ) {
          console.log('Erreur : données manquantes');
          return res.status(400).send('Tous les champs sont requis.');
      }
    try {
      
      
        // Insérer le contact dans la base de données
        const checkResult = await db.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (checkResult.rows.length > 0) {
          return res.status(400).send("L'email existe déjà");
        } else {
          //hashage du password et le sauvegarder dans la base de donnée
          const hashedPassword = await bcrypt.hash(password, saltRounds);
           
              const result = await db.query(
                'INSERT INTO users (nom, email, password , role_id) VALUES ($1, $2, $3, $4) RETURNING *',
                [nom, email, hashedPassword, role_id ]
            );
           
          
        // Vérifie si l'insertion a réussi
        console.log("Utilisateur créé :", result.rows[0]);
     };
        return res.redirect('/admin');  // Redirige vers la page admin
    } catch (err) {
        console.error(err.message);  // Affiche les erreurs éventuelles
        res.status(500).send("Erreur lors de la creation de l'utilisateur");
      }
    });
 


// Route pour supprimer un users

router.post('/users/:id/delete', async (req, res) => {
  const { id } = req.params;
  try {
      const result = await db.query('DELETE FROM users WHERE id = $1', [id]);
      if (result.rowCount > 0) {
          res.redirect("/admin");
      } else {
          res.status(404).send('Utilisateur non trouvé');
      }
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Erreur serveur');
  }
});



  router.get("/employe", isAuthenticated, checkRole([2]), (req, res) => {
    res.render("employe.ejs", { user: req.user });
  });

export default router;
