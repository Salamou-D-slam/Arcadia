CREATE ROLE admin LOGIN PASSWORD 'admin_arcadia' SUPERUSER;
CREATE ROLE employe LOGIN PASSWORD 'employé_arcadia';
CREATE ROLE veterinaire LOGIN PASSWORD 'vete_arcadia';



CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    nom VARCHAR (100),
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR (100)
);


CREATE table roles (
  id SERIAL primary key,
  label varchar (100)
);


CREATE table services(
  id SERIAL primary key,
  nom varchar (100),
  descriptions varchar,
  images BYTEA
);


CREATE table animal(
  id SERIAL primary key,
  prenom varchar (100),
  race varchar (100),
  etat varchar(100)
);


CREATE table rapport_veterinaire(
  id SERIAL primary key,
  dates varchar (100),
  detail varchar(100)
);


CREATE table habitat(
  id SERIAL primary key,
  nom varchar (100),
  descriptions varchar,
  images BYTEA,
  commentaire_habitat varchar (100)
);

CREATE table avis(
  id SERIAL primary key,
  pseudo varchar (100),
  commentaire varchar(100),
  isVisible Boolean
);



--users 

INSERT INTO users
VALUES (1, 'José', 'jose@gmail.com', crypt('admin_arcadia', gen_salt('bf')));
INSERT INTO users
VALUES (2, 'Josette', 'josette@gmail.com', crypt('emp_arcadia', gen_salt('bf')));
INSERT INTO users
VALUES (3, 'ben', 'ben@gmail.com', crypt('vtr_arcadia', gen_salt('bf')));

--roles 

INSERT INTO roles
VALUES (1, 'administrateur');
INSERT INTO roles
VALUES (2, 'employé');
INSERT INTO roles
VALUES (3, 'vétérinaire');

--services 

INSERT INTO services
VALUES (1, 'Restauration', "La restauration d'un zoo modernise ses installations pour améliorer le bien-être des animaux et enrichir l'expérience des visiteurs. Ce projet comprend la rénovation des enclos, l'intégration de technologies écologiques, et le développement de programmes éducatifs sur la conservation. L'objectif est de créer un environnement adapté aux besoins des animaux tout en sensibilisant le public à la préservation de la biodiversité.");
INSERT INTO services
VALUES (2, 'Visite Habitat Avec guide', "Une visite guidée d'un zoo permet de découvrir les animaux et leurs habitats grâce aux explications d'un expert. Le guide offre des informations intéressantes sur les espèces et les efforts de conservation, tout en répondant aux questions des visiteurs. Cette approche enrichissante rend la visite plus interactive et instructive.");
INSERT INTO services
VALUES (3, 'Visite du zoo en petit train', "Bienvenue à bord du petit train du zoo ! Au cours de cette visite, vous aurez l'occasion de découvrir plusieurs espèces animales fascinantes tout en profitant d'une promenade agréable. Vous traverserez différents enclos et zones du parc, tout en apprenant des faits intéressants sur la faune et les efforts de conservation du zoo. Installez-vous temporairement et laissez-vous guider à travers ce voyage au cœur de la nature.");


--animal

INSERT INTO animal
VALUES (1, 'Melman', 'Girafe de Kordofan','bon');
INSERT INTO animal
VALUES (2, 'Simba', 'lion Africain', 'bon');
INSERT INTO animal
VALUES (3, 'Marty', 'Zèbre de Burchell', 'bon');
INSERT INTO animal
VALUES (4, 'Chip','Ecureuil gris', 'bon');
INSERT INTO animal
VALUES (5, 'Max', 'Singe capucin', 'bon');
INSERT INTO animal
VALUES (6, 'Owlbert','Hibou grand-duc', 'bon');
INSERT INTO animal
VALUES (7, 'Pingu', 'Manchot Empereur', 'bon');
INSERT INTO animal
VALUES (8, 'Doflamingo', 'Flamant rose','bon');
INSERT INTO animal
VALUES (9, 'Daffy', 'Canard colvert', 'bon');


--rapport_veterinaire

INSERT INTO rapport_veterinaire
VALUES (1, '01/01/2024', 'vétérinaire détail');



--Habitat

INSERT INTO habitat
VALUES (1, 'Jungle',

                "Entrez dans notre jungle tropicale, un véritable sanctuaire de verdure et de biodiversité. Ici, vous serez émerveillé par les singes agiles qui se balancent d’arbre en arbre, 
                jouant et faisant des acrobaties. Les écureuils, vifs et curieux, explorent les branches à la recherche de noix et de fruits. À la tombée de la nuit, les hiboux se réveillent, 
                leurs grands yeux brillants scrutant l’obscurité. Cette zone du zoo vous invite à découvrir la magie de la jungle et à en apprendre davantage sur les animaux qui y vivent.", 
                
                'Je suis le commentaire de cet habitat');
INSERT INTO habitat
VALUES (2, 'Savane', 
            "Bienvenue dans notre zone de marais, un écosystème captivant où l'eau et la terre se rencontrent. Ici, vous pourrez observer nos pingouins, 
                qui se déplacent avec une grâce étonnante, plongeant dans l'eau pour attraper leurs poissons. Admirez les élégants flamants roses, qui se tiennent en équilibre sur une patte,
                ajoutant une touche de couleur à ce paysage humide. Les canards, quant à eux, glissent paisiblement sur l'eau, poussant parfois un croassement joyeux. 
                Cette partie du zoo vous offre un aperçu fascinant de la vie dans les zones humides et de la beauté de ses habitants.", 
            'Je suis le commentaire de cet habitat');
INSERT INTO habitat
VALUES (3, 'Marais', 
          "Bienvenue dans notre section dédiée à la savane, où vous pourrez découvrir un paysage inspiré des vastes plaines africaines. 
                Admirez les élégantes girafes qui se nourrissent des feuilles des arbres, les lions, véritables rois de la savane, qui se prélassent au soleil, 
                les visiteurs peuvent également observer des zèbres vivant dans leur espace naturel.  Ce coin du zoo vous plongera au cœur de la vie sauvage et de ses merveilles.", 
          'Je suis le commentaire de cet habitat');






