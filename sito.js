//CATTURA ELEMENTI

let barra = document.querySelector("#barra");
let navlinks = document.querySelectorAll(".nav-link");

let firstnumber = document.querySelector("#firstnumber");
let secondnumber = document.querySelector("#secondnumber");
let thirdnumber = document.querySelector("#thirdnumber");
let titlenumbers = document.querySelector("#title-sec");


//NAVABAR

window.addEventListener("scroll", () =>{
    
    let scrollvert = window.scrollY;
    
    if(scrollvert > 0){              
        changenavbar("bg-navbar2", "bg-navbar1", "rgb(235, 232, 220)", "rgb(255, 220, 20)", "rgb(235, 232, 220)");
    } else {
        changenavbar("bg-navbar1","bg-navbar2", "rgb(27, 25, 24)", "rgb(155, 25, 136)", "rgb(27, 25, 24)");       
    }
    
})


function changenavbar(backgroundcolor1, backgroundcolor2, colorlink, colorhover1, colorhover2){
    barra.classList.add(backgroundcolor1);
    barra.classList.remove(backgroundcolor2);
    
    navlinks.forEach( (link) => {
        link.style.color = colorlink;
        
        link.addEventListener("mouseenter", () => {
            link.style.color = colorhover1; 
        });
        link.addEventListener("mouseout", () => {
            link.style.color = colorhover2;
        });
    });
    
}


//SECTION NUMBERS

function createnumbers(number, element, timing){
    
    let counter = 0;
    
    let interval = setInterval( () => {
        if( counter<number ) {
            counter++;
            element.innerHTML = counter;
        }
        else{
            clearInterval(interval);
        }
        
    }, timing)
    
}

let check = false;
let observ = new IntersectionObserver((entries) => {
    entries.forEach( (entry) => {
        if (entry.isIntersecting && check == false ) {
            createnumbers(2000, firstnumber, 1);
            createnumbers(1000, secondnumber, 10);
            createnumbers(100, thirdnumber, 100);
            
            check = true;
        } 
    })
})

observ.observe(titlenumbers);



//SECTION CAROSELLI

let swiper = new Swiper(".mySwiper", {

    direction : "horizontal",
    loop: false,

    effect: "flip",
    grabCursor: true,
    
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    
});


let swiperwrapper = document.querySelector(".swiper-wrapper")

let albums = [
    {copertina: "./media/Cypress_Hill-1.png" , titolo: "Black Sunday ", anno: "1992", descrizione:" Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, fugit. " },
    {copertina: "./media/cypresshill2.png" , titolo: "Hits from the bong ", anno: "1994", descrizione:" Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, fugit. " },
    {copertina: "./media/cypreshill3.png" , titolo: "Skull and Bones ", anno: "1996", descrizione:" Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, fugit. " },
    {copertina: "./media/Cypress-hill-4.png" , titolo: "Stoned Raiders ", anno: "2002", descrizione:" Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, fugit. " },
    {copertina: "./media/cypresshill5.png" , titolo: "Elephants on acid ", anno: "2006", descrizione:" Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum, fugit. " }
]


albums.forEach((album) => {
    let divcd = document.createElement("div");
    divcd.classList.add("swiper-slide");
    divcd.innerHTML = 
    `
    <div class="swiper-slide">
     <div class="card-caroselli">
      <img src=${album.copertina} class="card-img-top" alt="img-album">
       <div class="card-body d-flex flex-column align-items-center mt-3 ms-2">
        <h5 class="card-title">${album.titolo}</h5>
        <p class="card-text">${album.anno}</p>
        <p class="card-text">${album.descrizione}</p>
       </div>
     </div>
    </div>
    
    `
    swiperwrapper.appendChild(divcd);
});










