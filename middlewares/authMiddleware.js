import multer from "multer";
import bodyParser from "body-parser";
import express from "express";

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
express.urlencoded({ extended: true })
app.use(express.json());  // ✅ Pour les requêtes JSON


// 🔹 Middleware pour vérifier l'authentification
export function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/connexion"); // Redirige vers la page de connexion si non connecté
}


/*
export const checkRole = (roles) => {
    return (req, res, next) => {
        if (!req.isAuthenticated() || !roles.includes(req.user.role)) {
            return res.status(403).send("Accès interdit");
        }
        next();
    };
};*/

//  Middleware pour vérifier les rôles

export function checkRole(roleId) {
    return (req, res, next) => {
        if (!req.user || !roleId.includes(req.user.role_id)) { //pour que ça soit en tableau
        //if (!req.user || req.user.role_id !== roleId) {
            return res.status(403).send("Accès refusé");
        }
        next();
    };
}


// MULTER POUR STOCKER L'URL DES IMAGES

  export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Public/uploads"); // Stocke les fichiers ici
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname); // Renomme le fichier
    }
});

// Filtre pour accepter uniquement les images
export const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Seuls les fichiers image sont autorisés !"), false);
    }
};

export const upload = multer({ storage: storage, fileFilter: fileFilter });