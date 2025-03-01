import express from 'express';
import { checkAuth, checkRole } from '../middlewares/auth.js';

const router = express.Router();


router.get("/admin", isAuthenticated, checkRole(1), (req, res) => {
    res.render("profil", { user: req.user });
  });
  
  router.get("/employe", isAuthenticated, checkRole(2), (req, res) => {
    res.render("employe", { user: req.user });
  });
  
  router.get("/veterinaire", isAuthenticated, checkRole(3), (req, res) => {
    res.render("veterinaire", { user: req.user });
  });

export default router;
