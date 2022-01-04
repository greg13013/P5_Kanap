import Canape from "./models/canape.js";
import { getAllProducts } from "./api.js";

const sectionItems = document.querySelector('#items');
let allCanape = [];

//Appel get à l'API et affichage des produits
getAllProducts().then((data) => {
  data.forEach((element) => {
    let canape = new Canape(element._id, element.name, element.price, element.imageUrl, element.description, element.colors, element.altTxt);
    allCanape.push(canape);
    ajouterItemsHTML(canape);
  });
  console.log(allCanape);
  console.table(allCanape);
}).catch(error => {
  console.log(error);
});

//Rendu HTML d'un article
function ajouterItemsHTML(item) {

  sectionItems.innerHTML += `
    <a href="./html/product.html?id=${item.id}">
        <article>
            <img src="${item.imageUrl}" alt="${item.altText}">
            <h3 class="productName">${item.nom}</h3>
            <p class="productDescription">${item.description}</p>
            <p>${item.prix}€</p>
        </article>
    </a>`;
}


