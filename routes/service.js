import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from "path";
import dotenv from 'dotenv';
import {upload} from "../middlewares/authMiddleware.js"
import {Service} from '../config/mongodb.js';

dotenv.config();

// On utilise __dirname avec fileURLToPath pour que le code fonctionne avec ES Modules.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
const app = express();

// Middleware pour servir des fichiers statiques
app.use(express.static("Public"));
app.use(express.urlencoded({ extended: true })); // Pour gérer les données de formulaires

// Vue moteur EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));




// Route pour afficher les services
router.get('/service', async (req, res) => {
  try {
    const services = await Service.find();
    res.render('service.ejs', { services });
    
  } catch (err) {
    console.log(err);
    res.status(500).send('Erreur serveur');
  }
});

// Route pour ajouter un service avec image
router.post('/add', upload.single('image'), async (req, res) => {
  const { title, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : ""; // Utiliser le nom de fichier de l'image téléchargée

  const newService = new Service({
    title,
    description,
    image // Le chemin relatif de l'image sera stocké
  });

  try {
    await newService.save();
    res.redirect('/service');
  } catch (err) {
    console.log(err);
    res.status(500).send('Erreur d\'ajout de service');
  }
});


// Route pour supprimer un service
router.post('/delete', async (req, res) => {
  const { id } = req.body;

  try {
    await Service.deleteOne({ _id: id });
    res.redirect('/service');
  } catch (err) {
    console.log(err);
    res.status(500).send('Erreur de suppression de service');
  }
});

//Route pour modfier un service

// Afficher le formulaire de modification
router.get("/modif/:id", async (req, res) => {
  try {
    const serviceModif = await Service.findById(req.params.id);
    if (!serviceModif) {
      return res.status(404).send("Service non trouvé");
    } else {
    res.render("modif.ejs", { serviceModif });
  }
  } catch (err) {
    res.status(500).send("Erreur serveur");
  }
});


// Modifier un service
router.post("/maj/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    let image = req.body.oldImage; // Conserver l'ancienne image par défaut

    // Si une nouvelle image est uploadée, on met à jour
    if (req.file) {
      image = "/uploads/" + req.file.filename;
    }

    await Service.findByIdAndUpdate(req.params.id, { title, description, image });
    res.redirect("/service");
  } catch (err) {
    res.status(500).send("Erreur serveur");
  }
  
});



export default router;