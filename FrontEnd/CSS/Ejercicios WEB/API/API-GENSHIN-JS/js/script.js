/**
 * API = Genshin Impact API
 *
 * consumir una API del juego Genshin Impact con html, css y javascript
 */

const API_URL = "https://genshin.jmp.blue/characters/";

let search = document.getElementById("search");
let API_URL_Caracter = API_URL + search;
let main = document.getElementById("result");

getCharacters(API_URL); // pasar la url de la API a la funcion
// funcion para llamar los personajes
async function getCharacters(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  showCharacters(data);

  console.log("aqui estoy 0");
}

// Función para mostrar los personajes
function showCharacters(characters) {
  main.innerHTML = ""

  characters.forEach((character) => {
    const { name, rarity, element, weapon, region, description, image } =
      character;

    const characterElement = document.createElement("div");
    characterElement.classList.add("character");

    characterElement.innerHTML = `
    <div class="character__info">
      <h2 class="character__name">${name}</h2>
      <p class="character__description">${description}</p>
      <div class="character__details">
        <p class="character__detail"><span class="character__detail--title">Rarity:</span> ${rarity}</p>
        <p class="character__detail"><span class="character__detail--title">Element:</span> ${element}</p>
        <p class="character__detail"><span class="character__detail--title">Weapon:</span> ${weapon}</p>
        <p class="character__detail"><span class="character__detail--title">Region:</span> ${region}</p>
      </div>
    </div>
    `;
    main.appendChild(characterElement);
  });
}
