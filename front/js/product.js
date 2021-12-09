import Canape from "./models/canape.js";

const parametreUrl = window.location.search;
const urlSearch = new URLSearchParams(parametreUrl);
const id = urlSearch.get('id');

const imgCanap = document.querySelector('.item__img');
const titleCanap = document.querySelector('#title');
const prixCanap = document.querySelector('#price');
const descriptionCanap = document.querySelector('#description');
const selectColorsCanap = document.querySelector('#colors');

console.log(id);

fetch('http://localhost:3000/api/products/' + id).then((res) => {
    if (res.ok) {
        return res.json();
    }
}).then((data) => {
    console.log(data);
    let canape = new Canape(data._id, data.name, data.price, data.imageUrl, data.description, data.colors, data.altTxt);
    console.log(canape);
    canapeDetail(canape);

}).catch((error) => {
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