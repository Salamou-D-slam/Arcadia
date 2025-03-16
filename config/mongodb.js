import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';


dotenv.config();


const router = express.Router();
const app = express();
const port = 3000;

// On utilise __dirname avec fileURLToPath pour que le code fonctionne avec ES Modules.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



// Middleware pour servir des fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // Pour gérer les données de formulaires

// Vue moteur EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));






/// Connexion à MongoDB via la fonction connectDB
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`🟢 MongoDB connecté : ${conn.connection.host}`);
  
      // Ajouter des services par défaut si la collection est vide
      const count = await Service.countDocuments({});
      if (count === 0) {
        const servicesParDefaut = [{ 
            title: "RESTAURATION", 
            description: "La restauration d'un zoo modernise ses installations pour améliorer le bien-être des animaux et enrichir l'expérience des visiteurs. Ce projet comprend la rénovation des enclos, l'intégration de technologies écologiques, et le développement de programmes éducatifs sur la conservation. L'objectif est de créer un environnement adapté aux besoins des animaux tout en sensibilisant le public à la préservation de la biodiversité.", 
            image: "/Assets/Service - Restaurant - image 1.jpg"
        },
          { 
            title:"Visite Habitat Avec guide", 
            description: "Une visite guidée d'un zoo permet de découvrir les animaux et leurs habitats grâce aux explications d'un expert. Le guide offre des informations intéressantes sur les espèces et les efforts de conservation, tout en répondant aux questions des visiteurs. Cette approche enrichissante rend la visite plus interactive et instructive.",
            image: "/Assets/Serivce - Visite guide.jpg"
        },
          { 
            title: "Visite du zoo en petit train",
             description: "Bienvenue à bord du petit train du zoo ! Au cours de cette visite, vous aurez l'occasion de découvrir plusieurs espèces animales fascinantes tout en profitant d'une promenade agréable. Vous traverserez différents enclos et zones du parc, tout en apprenant des faits intéressants sur la faune et les efforts de conservation du zoo. Installez-vous temporairement et laissez-vous guider à travers ce voyage au cœur de la nature.", 
             image: "/Assets/Service - Visite train.jpg" 
            },
        ];
        await Service.insertMany(servicesParDefaut);
        console.log('Services par défaut ajoutés.');
      }
  
    } catch (error) {
      console.error(`❌ Erreur de connexion à MongoDB : ${error.message}`);
      process.exit(1); // Terminer le processus si la connexion échoue
    }
  };



// Créer un modèle Mongoose pour les services
const serviceSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String // Nom de fichier de l'image
});

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

/*
// Créer un modèle Mongoose pour les avis
const avisSchema = new mongoose.Schema({
  pseudo: String,
  comment: String,
});

const Avis = mongoose.models.Avis || mongoose.model('Avis', avisSchema);*/

export { connectDB, Service}
