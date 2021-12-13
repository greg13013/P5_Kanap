import { getProductById } from "./api.js";
import Canape from "./models/canape.js";
import {getPanier, setPanier} from "./models/panier.js";

const parametreUrl = window.location.search;
const urlSearch = new URLSearchParams(parametreUrl);
const id = urlSearch.get('id');

const imgCanap = document.querySelector('.item__img');
const titleCanap = document.querySelector('#title');
const prixCanap = document.querySelector('#price');
const descriptionCanap = document.querySelector('#description');
const selectColorsCanap = document.querySelector('#colors');

const btnAjouterPanier = document.querySelector('#addToCart');

let panier = [];
let canape;

console.log(id);

getProductById(id).then((data) => {

    canape = new Canape(data._id, data.name, data.price, data.imageUrl, data.description, data.colors, data.altTxt);
    console.log(canape);

    document.title = canape.nom;

    canapeDetail(canape);

    // getPanier() ? panier = getPanier() : panier = [];

}).catch(error => {
    console.log(error);
})

function canapeDetail(canape){
    imgCanap.innerHTML = `
    <img src="${canape.imageUrl}" alt="${canape.altText}">
    `;

    titleCanap.innerHTML = canape.nom;

    prixCanap.innerHTML = canape.prix;

    descriptionCanap.innerHTML = canape.description;

    canape.couleurs.forEach(element => {
        selectColorsCanap.innerHTML += `<option value="${element}">${element}</option>`
    });


}

btnAjouterPanier.addEventListener('click', () => {
    // console.log(event.target);
    setPanier(canape);
    panier = getPanier();
})