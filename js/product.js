import { getProductById } from "./api.js";
import Canape from "./models/canape.js";
import { ajouterArticle } from "./models/panier.js";

const parametreUrl = window.location.search;
const urlSearch = new URLSearchParams(parametreUrl);
const id = urlSearch.get('id');

const imgCanap = document.querySelector('.item__img');
const titleCanap = document.querySelector('#title');
const prixCanap = document.querySelector('#price');
const descriptionCanap = document.querySelector('#description');
const selectColorsCanap = document.querySelector('#colors');
const inputQuantite = document.querySelector('#quantity');

const btnAjouterPanier = document.querySelector('#addToCart');

let canape;


//Appel à l'API du produit dont l'id est récupéré dans l'url
getProductById(id).then((data) => {

  canape = new Canape(data._id, data.name, data.price, data.imageUrl, data.description, data.colors, data.altTxt);

  document.title = canape.nom;

  renderHTML(canape);

}).catch(error => {
  console.log(error);
});

//Rendu HTML de l'article
function renderHTML(canape) {
  imgCanap.innerHTML = `
    <img src="${canape.imageUrl}" alt="${canape.altText}">
    `;

  titleCanap.innerHTML = canape.nom;

  prixCanap.innerHTML = canape.prix;

  descriptionCanap.innerHTML = canape.description;

  canape.couleurs.forEach(element => {
    selectColorsCanap.innerHTML += `<option value="${element}">${element}</option>`;
  });

  inputQuantite.value = 1;

}

//Au clic du bouton ajouter, récupération couleur choisie qui ne peut pas etre vide et la quantité puis appel de la fonction ajouterArticle
btnAjouterPanier.addEventListener('click', () => {

  canape.couleurChoisie = selectColorsCanap.value;

  let quantite = Number(inputQuantite.value);

  if (selectColorsCanap.value !== '') {
    ajouterArticle(canape, quantite);
  } else {
    alert('Vous devez choisir une couleur');
  }


});