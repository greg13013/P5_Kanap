import { getPanier, supprimerElementPanier } from "./models/panier.js";

const sectionPanier = document.querySelector("#cart__items");
const spanQuantiteTotalArticle = document.querySelector("#totalQuantity");
const spanPrixTotal = document.querySelector("#totalPrice");

const inputNom = document.querySelector("#lastName");
const inputPrenom = document.querySelector("#firstName");
const inputAdresse = document.querySelector("#address");
const inputVille = document.querySelector("#city");
const inputEmail = document.querySelector("#email");

const messageErreurPrenom = document.querySelector("#firstNameErrorMsg");
const messageErreurNom = document.querySelector("#lastNameErrorMsg");
const messageErreurAdresse = document.querySelector("#addressErrorMsg");
const messageErreurVille = document.querySelector("#cityErrorMsg");
const messageErreurEmail = document.querySelector("#emailErrorMsg");
let erreurForm = false;

const btnCommander = document.querySelector("#order");

let panier = getPanier();
let prixTotal = 0;
let quantiteTotal = 0;

console.log(panier);

renderHTML(panier);

inputNom.addEventListener("input", (e) => {
  let regex = new RegExp("^[a-zA-Z]+$");
  verifForm(e, regex);
});

inputPrenom.addEventListener("input", (e) => {
  let regex = new RegExp("^[a-zA-Z]+$");
  verifForm(e, regex);
});

inputAdresse.addEventListener("input", (e) => {
  let regex = new RegExp("([^\s])");
  verifForm(e, regex);
});

inputVille.addEventListener("input", (e) => {
  let regex = new RegExp("^[a-zA-Z]+$");
  verifForm(e, regex);
});

inputEmail.addEventListener("input", (e) => {
  
  let regex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$");
  verifForm(e, regex);
});

function renderHTML(panier) {
  sectionPanier.innerHTML = "";

  panier.forEach((element) => {
    sectionPanier.innerHTML += buildArticleHTML(element);

    prixTotal += element.canape.prix * element.quantite;
    quantiteTotal += element.quantite;
    ajoutEvent();
  });

  spanPrixTotal.innerHTML = prixTotal;
  spanQuantiteTotalArticle.innerHTML = quantiteTotal;
}

function buildArticleHTML(element) {
  return `<article class="cart__item" data-id="${
    element.canape.id
  }" data-color="${element.canape.couleurChoisie}">
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
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${
                element.quantite
              }">
            </div>
            <div class="cart__item__content__settings__delete">
              <p data-id="${element.canape.id}" data-color="${
    element.canape.couleurChoisie
  }" class="deleteItem">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
}

function ajoutEvent() {
  let btnSupprimer = document.querySelectorAll(".deleteItem");

  btnSupprimer.forEach((element) => {
    element.addEventListener("click", (e) => {
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

function verifForm(e, regex) {

  let erreur = false;
  let msgErreur;

  // console.log(e.target.value);
  
  // console.log(e.target);

  // switch (!regex.test())


  if (!regex.test(e.target.value)) {
    msgErreur = e.target.id;
    erreur = true;
    // console.log("erreur");
  } else{
    messageErreurNom.innerHTML = '';
    messageErreurPrenom.innerHTML = '';
    messageErreurAdresse.innerHTML = '';
    messageErreurVille.innerHTML = '';
    messageErreurEmail.innerHTML = '';

    erreur = false;
  }
  // console.log(msgErreur);
  erreurForm = erreur;

  if (erreur) {
    e.target.style.boxShadow = '0px 0px 10px 3px red';
    switch (msgErreur){
      case 'lastName':
        messageErreurNom.innerHTML = `Minimum 1 caractère <br> Seulement des lettres`;
        break;
      case 'firstName':
        messageErreurPrenom.innerHTML = `Minimum 1 caractère <br> Seulement des lettres`;
        break;
      case 'address':
        messageErreurAdresse.innerHTML = 'Minimum 1 caractère';
        break;
      case 'city':
        messageErreurVille.innerHTML = `Minimum 1 caractère <br> Seulement des lettres`;
        break;
      case 'email':
        messageErreurEmail.innerHTML = `Minimum 1 caractère <br> Exemple: test@test.com`;
        break;

        default:
          console.log('aucune erreur');
    }
  } else {
    e.target.style.boxShadow = '0px 0px 10px 3px green';
  }
}

function submitForm(){
  if (!erreurForm){
    let data;

    data = [...panier];
    console.log(data);
  }
  
}
