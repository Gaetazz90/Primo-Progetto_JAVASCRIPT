
fetch( "./annunci.json" ).then( (response) => response.json() ).then( (data) => {
    // console.log(data);


     //Funzione crea card-prodotti
     function showProducts(array) { 
        
        array.sort((a,b) => a.price - b.price);
        
        cardwrapper.innerHTML = "";        
        
        array.forEach( (annuncio) => {
            
            let cardwrapper = document.querySelector("#cardwrapper");
            
            let divProduct = document.createElement("div");
            divProduct.classList.add("card-custom");
            divProduct.innerHTML = 
            `
            <div class="card-body d-flex flex-column align-items-center mt-5">
            <h5 class="card-title fs-3 text-colorB">${annuncio.name}</h5>
            <h6 class="card-subtitle mb-2 mt-5 text-colorG fs-4">${annuncio.category}</h6>  
            <p class="card-subtitle mb-2 mt-5 text-colorG fs-5">${annuncio.price}</p>                   
            </div>
            
            `
            cardwrapper.appendChild(divProduct);
            
        })
        
        
    }
    
    showProducts(data);


    //Funzione crea categorie per filtri dinamicamente
    function showCategoryFilters(){

        let totalCategories = data.map( (annuncio) => annuncio.category )

        let uniqueCategories = [];   
  
        totalCategories.forEach( (category) => {
            if(!uniqueCategories.includes(category)){
            uniqueCategories.push(category);

            }
        
        })

    uniqueCategories.forEach( (category) => {

        let filterwrapper = document.querySelector("#filterwrapper");

        let divfilter = document.createElement("div");
        divfilter.classList.add("form-check", "d-flex", "justify-content-start");
        divfilter.innerHTML = 
        `
        <input class="form-check-input me-2" type="radio" name="Category" id="${category}">
        <label class="form-check-label" for="${category}"> ${category} </label> 
        
        `
        filterwrapper.appendChild(divfilter);
        })
    
    }
    
    showCategoryFilters();

    //Funzione FILTRA per CATEGORIA

    let radiobutton = document.querySelectorAll(".form-check-input");
    
    function filterByCateagory () {
       
        let checked = Array.from(radiobutton).find( (button) => button.checked);

        let categoria = checked.id;

        if(categoria != "All" ) {
           
            let filtered1 = data.filter( (annuncio) => annuncio.category == categoria );

            showProducts(filtered1); 

        } else {    
            showProducts(data);                

        }
           

    } 

    filterByCateagory();

    
    radiobutton.forEach((button) => {
        button.addEventListener("click", () => {
            filterByCateagory()
        })

    })

       
    //Funzione FILTRA per PREZZO
    
    //Prima parte: creare il range(input-barrablu) in base al prezzo massimo dei prodotti
    let inputRange = document.querySelector(".inputRange");
    let inputPrice = document.querySelector("#inputPrice");
    
    function setPriceInput () {
        
        let maxprice = data[47].price;
        
        inputRange.max = maxprice; 
        inputRange.value = maxprice;
        
        inputRange.addEventListener("input", () => {
            
            inputPrice.innerHTML = inputRange.value;
            filterByPrice();
            
        })
        
    }
    
    setPriceInput();
    
    //Seconda parte: collegare l'inputrange alle card
    
    function filterByPrice () {
        
        let filtered2 = data.filter( (annuncio) => annuncio.price <= inputRange.value)
        showProducts(filtered2);
        
    }
       
    
    //Funzione FILTRA per PAROLA
    
    let inputWord = document.querySelector("#inputWord");
    
    function filterByWord() {
        
        let filtered3 = data.filter((annuncio) => annuncio.name.toLowerCase().includes(inputWord.value))
        showProducts(filtered3);
        
    }
    
    inputWord.addEventListener("input", () => {
        filterByWord();
        
    })
    
} );