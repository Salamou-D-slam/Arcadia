import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import { dirname, join } from "path";
import  path from "path";
import { fileURLToPath } from "url";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";
import db from "../config/db.js";

const router = express.Router();
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("Public"));



router.get("/", (req, res) => {
   //res.sendFile(__dirname + "/Public/HTML/Index.html"); 
   res.sendFile(path.join(__dirname, "../Public/HTML/Index.html"));
});

router.get("/connexion", (req, res) => {
  //res.sendFile(__dirname + "./Public/HTML/Connexion.html"); 
  res.sendFile(path.join(__dirname, "../Public/HTML/Connexion.html"));

});

router.get("/service", (req, res) => {
  res.sendFile(path.join(__dirname, "../Public/HTML/Service.html"));
});

router.get("/habitat", (req, res) => {
  res.sendFile(path.join(__dirname, "../Public/HTML/Habitat.html"));
});

router.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "../Public/HTML/Contact.html"));
});

router.get("/savane", (req, res) => {
  res.sendFile(path.join(__dirname, "../Public/HTML/Savane.html"));
});

router.get("/jungle", (req, res) => {
  res.sendFile(path.join(__dirname, "../Public/HTML/Jungle.html"));
});

router.get("/marais", (req, res) => {
  res.sendFile(path.join(__dirname, "../Public/HTML/Marais.html"));
});




router.get("/deconnexion", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
  });

  // Route pour vérifier l'état d'authentification
router.get('/api/auth/status', (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
      res.json({ isAuthenticated: true, username: req.user.username }); // Si l'utilisateur est connecté
  } else {
      res.json({ isAuthenticated: false }); // Si l'utilisateur n'est pas connecté
  }
});

//
router.get("/profil", (req, res) => {
    if (req.isAuthenticated()) {
      res.render("profil.ejs");
    } else {
      res.redirect("/connexion");
    }
  });

  
  router.post(
    "/connexion",
    passport.authenticate("local", {
      failureRedirect: "/connexion",
      failureFlash: true,
    }),
    (req, res) => {
      // 🔹 Redirection selon le rôle
      switch (req.user.role_id) {
        case 1:
          return res.redirect("/admin");
        case 2:
          return res.redirect("/employe");
        case 3:
          return res.redirect("/veterinaire");
        default:
          return res.redirect("/");
      }
    }
  );


//--------------------AUTHENTIFICATION PASSPORT--------------

  passport.use(new Strategy(async function verify(username, password, cb) {
    console.log(username)
      try {
        const result = await db.query(
          `SELECT users.id, users.email, users.password, users.role_id, roles.label AS label 
           FROM users 
           JOIN roles ON users.role_id = roles.id 
           WHERE users.email = $1`, [
          username,
        ]);

        if (result.rows.length > 0) {
          const user = result.rows[0];  
          const storedHashedPassword = user.password;
          bcrypt.compare(password, storedHashedPassword, (err, result) => {

            if (err) {
              console.error("Error comparing passwords:", err);
              return cb(err);
            } else {
              if (result) {
                return cb(null, user);
              } else {
                return cb("Le mot de pass que vous avez saisi est faux");
              }
            }
          });
        } else {
          return cb("L'utilisateur n'existe pas");
        }
      } catch (err) {
        return cb(err);
      }
    }));
    
    
    export default router;
