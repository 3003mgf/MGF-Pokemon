const d = document,
$main = d.querySelector("main"),
$links = d.querySelector(".links");




// Primero hacemos la peticion hacia la URL principal con todos los pokemons que tiene laa API. Esta API nos da el nombre del pokemon y su ID. 
// Vamos a tener que conectarnos a un endpoint en particular que nos da toda la informacion restante de los pokemons.

let urlPoke = "https://pokeapi.co/api/v2/pokemon/";

async function loadPokemons(url){
try{
    $main.innerHTML = `<img class="loader" src="images/ringsPoke.svg" alt="loader">`;
  
    let obj = await fetch(url);
    let json = await obj.json();
    
    let $template = "",
    $prevLink,
    $nextLink;


    if(!obj.ok)throw{status: obj.status, statusText: obj.statusText}; //Debemos ponerlo asi para que capte el error.
    
    for(let i = 0; i < json.results.length; i++){
        //console.log(json.results[i]);
        try{
          let obj = await fetch(json.results[i].url);
          let pokemon = await obj.json();
          
          if(!obj.ok)throw{status: obj.status, statusText: obj.statusText}; //Debemos ponerlo asi para que capte el error.
          
          $template  += `
          <figure class="cards">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <figcaption>${pokemon.name}</figcaption>
          </figure>
          
          `;
          

          $main.innerHTML= $template;
          $prevLink = json.previous ? `<a href="${json.previous}"> 🔙 </a>` : "";
          $nextLink = json.next ? `<a href="${json.next}"> 🔜 </a>`:"";
          $links.innerHTML = $prevLink + " " + $nextLink;
        }catch(err){
            console.log("error");

        }
    }
    
}catch(err){
   let message = err.statusText || "Something went wrong";
   let stat = err.status || "Error";
   $main.innerHTML = `Error  ${stat}: ${message}`;
}
}


document.addEventListener("DOMContentLoaded", e=> loadPokemons(urlPoke));


document.addEventListener("click", e=>{
if(e.target.matches(".links a")){
    e.preventDefault();
    loadPokemons(e.target.href);
}
})

document.addEventListener("scroll", e=>{
if(scrollY > 160){
    document.querySelector(".pokeball").classList.add("none");
    document.querySelector(".pokeball2").classList.add("none");
}else{
    document.querySelector(".pokeball").classList.remove("none");
    document.querySelector(".pokeball2").classList.remove("none");
}
})