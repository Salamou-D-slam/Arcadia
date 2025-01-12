//-------------------HABITAT PAGE D'ACCEUIL---------------------

// document.addEventListener('DOMContentLoaded', function() {
// function bigImg(x) {
//     x.style.width = "548px";
//     x.style.height = "375px";

// };

// function normalImg(x) {
//     x.style.width = "448px";
//     x.style.height = "275px";

// };
//    document.querySelector(`.habitat-img`).onmouseenter = function() {
//     onmouseover = bigImg(this);  
//    };

//    document.querySelector(`.habitat-img`).onmouseleave = function() {
//     onmouseout = normalImg(this);
//    };

// });

//-------------FORMULAIRE D'AVIS SUR LA PAGE D'ACCUEIL------------

    document.addEventListener('DOMContentLoaded', function() {
       document.querySelector(`.avis`).onsubmit = function() {
        const name = document.querySelector('#pseudo').value;
        alert(`Votre Commentaire a bien été envoyé au nom de ${name}. Merci pour votre avis`);
    };
});

   


//-------------FORMULAIRE D'AVIS SUR LA PAGE DE CONTACT--------

    document.addEventListener('DOMContentLoaded', function() {
        document.querySelector(`#contactForm`).onsubmit = function() {
            alert("Le formulaire a bien été envoyé.");
        };
});  


//------------------DATE COPYRIGHT FOOTER-----------------

    document.addEventListener('DOMContentLoaded', function() {
        new Date().getFullYear();
        document.getElementById("year").innerHTML = new Date().getFullYear();
});  



//------------------ANIMAUX PAGE D'ACCUEIL-----------------

function enter(x) {
    x.style.boxShadow = "15px 15px 10px 0px rgb(110, 134, 0)";
};

function leave(x) {
    x.style.boxShadow = "0px 0px 0px 0px rgb(110, 134, 0)";
};

   document.querySelector(`.container-animaux`).onmouseenter = function() {
    onmouseover = enter(this);    
   };

   document.querySelector(`.container-animaux`).onmouseleave = function() {
    onmouseout = leave(this);
   };