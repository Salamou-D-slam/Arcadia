import express from "express";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import {upload, storage, fileFilter } from "../middlewares/authMiddleware.js"




dotenv.config();

const router = express.Router();
const app = express();

//------------------- DEFINIR EJS COMME MOTEUR DE RENDU-----------------------



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


router.use(bodyParser.urlencoded({extended: true}));
router.use(express.json());  // ✅ Pour les requêtes JSON

router.use(express.static("Public"));

//-----------------CONNEXTION A MONGOOSE ET CREATION BDD----------------------

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI,);

    console.log(`🟢 MongoDB connecté : ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Erreur de connexion à MongoDB : ${error.message}`);
    process.exit(1);
  }
};



mongoose.connection.on("error", (err) => {
  console.error("❌ Erreur de connexion MongoDB :", err);
});
mongoose.connection.once("open", () => {
  console.log("✅ Connexion MongoDB établie !");
});




//----------------------CREATION SCHEMA----------------------------------------

const servicesSchema = new mongoose.Schema ({
  Titre:{ type: String, required: true },
  Description: { type: String, required: true },
  Image: { type: String,required: true}, // URL de l’image
});

//------------------------CREATION MODEL--------------------------------------

const Service = mongoose.model("Service", servicesSchema);

//-------------------------CREATION DOCUMENTS----------------------------------

const service1 = new Service ({
  Titre: "RESTAURATION",
  Description: "La restauration d'un zoo modernise ses installations pour améliorer le bien-être des animaux et enrichir l'expérience des visiteurs. Ce projet comprend la rénovation des enclos, l'intégration de technologies écologiques, et le développement de programmes éducatifs sur la conservation. L'objectif est de créer un environnement adapté aux besoins des animaux tout en sensibilisant le public à la préservation de la biodiversité.",
  Image: "http://localhost:3000/Public/Assets/Service - Restaurant - image 1.jpg"
});

const service2 = new Service ({
  Titre: "Visite Habitat Avec guide",
  Description: "Une visite guidée d'un zoo permet de découvrir les animaux et leurs habitats grâce aux explications d'un expert. Le guide offre des informations intéressantes sur les espèces et les efforts de conservation, tout en répondant aux questions des visiteurs. Cette approche enrichissante rend la visite plus interactive et instructive.",
  Image: "http://localhost:3000/Public/Assets/Serivce - Visite guide.jpg"
});

const service3 = new Service ({
  Titre: "Visite du zoo en petit train",
  Description: "Bienvenue à bord du petit train du zoo ! Au cours de cette visite, vous aurez l'occasion de découvrir plusieurs espèces animales fascinantes tout en profitant d'une promenade agréable. Vous traverserez différents enclos et zones du parc, tout en apprenant des faits intéressants sur la faune et les efforts de conservation du zoo. Installez-vous temporairement et laissez-vous guider à travers ce voyage au cœur de la nature.",
  Image: "http://localhost:3000/Public/Assets/Service - Visite train.jpg"
});


//----LES RANGER DANS UN TABLEAU ARRAY----

const defaultServices = [service1, service2, service3];

/*
const listSchema = {
  name: String,
  services: [servicesSchema]
}
const List = mongoose.model("List", listSchema);*/


//------------------------------ GET ROUTE---------------------------------


router.get("/service2", async (req, res) => {
  console.log("🟢 Route '/services' appelée !");

    try {
        // RECHERCHE TOUS LES ÉLÉMENTS DANS LA COLLECTION
        const foundServices = await Service.find({});
        console.log("Services récupérés :", foundServices);

  
        // SI LA COLLECTION EST VIDE, INSÈRE LES ÉLÉMENTS PAR DÉFAUT
        if (foundServices.length === 0) {
          console.log("La collection est vide, on va insérer les services par défaut.");

          console.log("✅ Services ajoutés.");
          
          const checkServices = await Service.find({});
          console.log("Vérification après insertion :", checkServices);  // Vérifie que les services sont bien enregistrés

            //INSERT MANY
            await Service.insertMany(defaultServices);
            console.log("✅ Éléments par défaut enregistrés avec succès dans la base de données.");
            res.redirect("/service2"); // REDIRIGE VERS LA PAGE SERVICE APRÈS L'INSERTION
            
        } else {

            // SI LA COLLECTION N'EST PAS VIDE, AFFICHE LES ÉLÉMENTS
            console.log("Nombre de services trouvés :", foundServices.length);
            console.log("Services trouvés :", foundServices);
            res.render("service.ejs", { listTitle: "Services", newListServices: foundServices});
        }
    } catch (err) {
        console.error("❌ Erreur lors de la récupération des éléments ou de l'insertion :", err);
        res.status(500).send("Erreur interne du serveur");
    }
  });
  
  
  //----------------------------------------POST ROUTE---------------------------------
  
          //----------------AJOUT DE NOUVEAU SERVICE ----------------------
          router.post("/service2", upload.single("Image"), async (req, res) => {
            try {
              console.log("Données reçues :", req.body);
              console.log("Fichier reçu :", req.file); // Vérifie si Multer reçoit bien le fichier

              if (!req.body.Titre || !req.body.Description || !req.file) {
                return res.status(400).json({ error: "Tous les champs sont obligatoires." });
            }
                // RÉCUPÉRER LE NOM DE L'ÉLÉMENT ENVOYÉ PAR LE FORMULAIRE
                const serviceTitre = req.body.Titre;
                const serviceDescription = req.body.Description;
                const serviceImage = req.file ? `/uploads/${req.file.filename}` : "";
        

                 // Si Image est un champ obligatoire, pense à fournir une valeur par défaut ou à renvoyer une erreur personnalisée
        if (!serviceImage) {
          throw new Error("Le champ image est obligatoire.");
      }
      
                // CRÉER UN NOUVEL ÉLÉMENT AVEC LES DONNEES FOURNI
                const service = new Service({
                  Titre: serviceTitre,
                  Description: serviceDescription,
                  Image: serviceImage
                });
        
                // SAUVEGARDER L'ÉLÉMENT DANS LA BASE DE DONNÉES
                await service.save();
        
                // REDIRIGER VERS LA PAGE DE SERVICE APRÈS L'AJOUT
                res.redirect("/service2");
            } catch (err) {
                // GÉRER LES ERREURS ET AFFICHER UN MESSAGE DANS LA CONSOLE
                console.error("❌ ERREUR LORS DE L'AJOUT DE L'ÉLÉMENT :", err);
                
                // ENVOYER UNE RÉPONSE D'ERREUR AU CLIENT
                res.status(500).send("ERREUR INTERNE DU SERVEUR");
            }
        });
  
        
         //--------------------SUPPRESSION D'ITEM----------------------
  
      router.post("/delete", async (req, res) => {
          try {
              const checkedServiceId = req.body.supprimer;
              
              const deletedService = await Service.findByIdAndDelete(checkedServiceId);
              
              if (deletedService) {
                  console.log("Successfully deleted checked item.");
              } else {
                  console.log("Item not found.");
              }
              
              res.redirect("/service2"); // Rediriger après suppression
          } catch (err) {
              console.error("Error deleting item:", err);
              res.status(500).send("Internal Server Error");
          }
      });



export { connectDB, router}