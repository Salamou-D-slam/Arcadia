

//-------------------DEPENDANCE-------------------------

import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import pg from "pg";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import bcrypt from "bcrypt";

import dotenv from 'dotenv';
dotenv.config();


//--------------------PORT--------------

const app = express();
const port = process.env.PORT || 3000;
const saltRounds = 10;


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("Public"));

//--------------------SESSION--------------

app.use(
  session ({
  secret: "TOPSECRETWORD",
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,
  }
}
));


app.use(passport.initialize());
app.use(passport.session());


//--------------------BDD--------------

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Arcadia",
  password: "setifsalamou_19000",
  port: 5432,
});


db.connect();


 //--------------------ROUTES--------------

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/Public/HTML/Index.html"); 
});

app.get("/connexion", (req, res) => {
  res.sendFile(__dirname + "/Public/HTML/Connexion.html"); 
});

app.get("/service", (req, res) => {
  res.sendFile(__dirname + "/Public/HTML/Service.html"); 
});

app.get("/habitat", (req, res) => {
  res.sendFile(__dirname + "/Public/HTML/Habitat.html"); 
});

app.get("/contact", (req, res) => {
  res.sendFile(__dirname + "/Public/HTML/Contact.html"); 
});

app.get("/savane", (req, res) => {
  res.sendFile(__dirname + "/Public/HTML/Savane.html"); 
});

app.get("/jungle", (req, res) => {
  res.sendFile(__dirname + "/Public/HTML/Jungle.html"); 
});

app.get("/marais", (req, res) => {
  res.sendFile(__dirname + "/Public/HTML/Marais.html"); 
});



app.get("/deconnexion", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
  });

  // Route pour vérifier l'état d'authentification
app.get('/api/auth/status', (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
      res.json({ isAuthenticated: true, username: req.user.username }); // Si l'utilisateur est connecté
  } else {
      res.json({ isAuthenticated: false }); // Si l'utilisateur n'est pas connecté
  }
});

//
app.get("/profil", (req, res) => {
    if (req.isAuthenticated()) {
      res.render("profil.ejs");
    } else {
      res.redirect("/connexion");
    }
  });

  
app.post("/connexion", passport.authenticate("local", {
  successRedirect: "/profil",
  failureRedirect: "/connexion",
}));


//--------------------AUTHENTIFICATION PASSPORT--------------

  passport.use(new Strategy(async function verify(username, password, cb) {
    console.log(username)
      try {
        const result = await db.query("SELECT * FROM users WHERE email = $1", [
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
                return cb(null, false);
              }
            }
          });
        } else {
          return cb("User not found");
        }
      } catch (err) {
        return cb(err);
      }
    }));
    
    
    
    passport.serializeUser((user, cb) => {
      cb(null, user);
    });
    
    passport.deserializeUser((user, cb) => {
      cb(null, user);
    });





app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });