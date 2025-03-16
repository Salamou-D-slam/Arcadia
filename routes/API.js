 import express from "express";
 import bodyParser from "body-parser";
 import { dirname, join } from "path";
 import { fileURLToPath } from "url";

 
 
 
 
 const router = express.Router();
 const __dirname = dirname(fileURLToPath(import.meta.url));
 const app = express();
 
 app.use(bodyParser.urlencoded({extended: true}));
 app.use(express.static("Public"));
 
 
 
 // Route pour vérifier l'état d'authentification
  
  router.get('/api/auth/status', (req, res) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        res.json({ 
          isAuthenticated: true, // Si l'utilisateur est connecté
          username: req.user.username, // On récupère le username de l'utilisateur depuis la session
          role_name: req.user.role_name,  }); // On récupère le rôle de l'utilisateur depuis la session
    } else {
      return res.json({
        isAuthenticated: false,
        user: null,
        role_name: null,
  
        });
    }
  });





//API Page de service


router.get('/user-role', (req, res) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
      res.json({ username: req.user.username, role_name: req.user.role_name, });
    } else {
        res.json(null);
    }
  });




export default router;