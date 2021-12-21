import { getPanier, supprimerElementPanier } from './models/panier.js';

const sectionPanier = document.querySelector('#cart__items');
const spanQuantiteTotalArticle = document.querySelector('#totalQuantity');
const spanPrixTotal = document.querySelector('#totalPrice');


let panier = getPanier();
let prixTotal = 0;
let quantiteTotal = 0;


console.log(panier);


renderHTML(panier);


function renderHTML(panier) {
    sectionPanier.innerHTML = '';

    panier.forEach(element => {
        sectionPanier.innerHTML +=
            buildArticleHTML(element);

        prixTotal += element.canape.prix * element.quantite;
        quantiteTotal += element.quantite;
        ajoutEvent();
    });


    spanPrixTotal.innerHTML = prixTotal;
    spanQuantiteTotalArticle.innerHTML = quantiteTotal;
}





function buildArticleHTML(element) {
    return `<article class="cart__item" data-id="${element.canape.id}" data-color="${element.canape.couleurChoisie}">
        <div class="cart__item__img">
          <img src="${element.canape.imageUrl}" alt="${element.canape.altText}">
        </div>
        <div class="cart__item__content">
          <div class="cart__item__content__description">
            <h2>${element.canape.nom}</h2>
            <p>${element.canape.couleurChoisie}</p>
            <p>${element.canape.prix} € / unité</p>
            <p>Prix : ${element.quantite * element.canape.prix} €</p>
          </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
              <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.quantite}">
            </div>
            <div class="cart__item__content__settings__delete">
              <p data-id="${element.canape.id}" data-color="${element.canape.couleurChoisie}" class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
}

function ajoutEvent() {
    let btnSupprimer = document.querySelectorAll('.deleteItem');

    btnSupprimer.forEach(element => {
        element.addEventListener('click', (e) => {

            let idArticle = e.target.dataset.id;
            let couleurArticle = e.target.dataset.color;
          
            // console.log(e.target.dataset);
            supprimerElementPanier(idArticle, couleurArticle);

            // let newPanier = getPanier()
            prixTotal = 0;
            quantiteTotal = 0;

            renderHTML(getPanier());




        });
    });
}






