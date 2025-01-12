// document.addEventListener('DOMContentLoaded', function() {
//     document.querySelector(`.container`).onmouseenter = function() {
//         const hover = document.querySelector('.card').style;
//         hover.style.boxShadow = "0px 0px 10px 0px rgb(0, 255, 85)";
//     }
// });  


//Card

function shadow(x) {
    x.style.boxShadow = "0px 0px 10px 0px rgb(0, 255, 85)";
}

function normal(x) {
    x.style.boxShadow = "0px 0px 0px 0px rgb(200, 255, 85)";
}

   document.querySelector(`.card`).onmouseenter = function() {
    onmouseover = shadow(this);
    
   };
   document.querySelector(`.card`).onmouseleave = function() {
    onmouseout = normal(this);
   };




//Title

// function enter(x) {
//     x.style.boxShadow = "10px 10px 10px 0px rgb(0, 94, 31)";
// }

// function leave(x) {
//     x.style.boxShadow = "0px 0px 0px 0px rgb(0, 94, 31)";
// }
// document.addEventListener('DOMContentLoaded', function() {
// document.querySelector(`.card-title`).onmouseenter = function() {
//     onmouseover = enter(this);
    
//    };
//    document.querySelector(`.card-title`).onmouseleave = function() {
//     onmouseout = leave(this);
//    };
// });

   