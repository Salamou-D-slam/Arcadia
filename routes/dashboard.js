import express from 'express';
import bodyParser from "body-parser";
import { dirname, join } from "path";
import { fileURLToPath } from "url";



import { checkAuthenticated, checkRole , isAuthenticated} from '../middlewares/authMiddleware.js';

const router = express.Router();


router.get("/admin", isAuthenticated, checkRole(1), (req, res) => {
    res.render("profil.ejs", { user: req.user });
  });
  
  router.get("/employe", isAuthenticated, checkRole(2), (req, res) => {
    res.render("employe.ejs", { user: req.user });
  });
  
  router.get("/veterinaire", isAuthenticated, checkRole(3), (req, res) => {
    res.render("vete.ejs", { user: req.user });
  });

export default router;
