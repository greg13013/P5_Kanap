import { postProduct } from "./api.js";
import { getPanier, supprimerElementPanier, setQuantite } from "./models/panier.js";

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


const btnCommander = document.querySelector("#order");

let panier = getPanier();
let prixTotal = 0;
let quantiteTotal = 0;


//Verification de la page actuel
if (window.location.pathname.split("/").pop() === 'confirmation.html') {


  //Récupération orderID depuis l'URL
  const parametreUrl = window.location.search;
  const urlSearch = new URLSearchParams(parametreUrl);
  const orderID = urlSearch.get('orderId');

  const htmlOrderID = document.querySelector("#orderId");
  htmlOrderID.innerHTML = orderID;

  localStorage.removeItem('panier');
} else {

  //Appel de la fonction qui construit l'HTML
  renderHTML(panier);

  //Verification sur chaque input si il y a une erreur
  inputNom.addEventListener("input", (e) => {
    verifForm(e);
  });

  inputPrenom.addEventListener("input", (e) => {
    verifForm(e);
  });

  inputAdresse.addEventListener("input", (e) => {
    verifForm(e);
  });

  inputVille.addEventListener("input", (e) => {
    verifForm(e);
  });

  inputEmail.addEventListener("input", (e) => {
    verifForm(e);
  });




  var styleErreurForm = "0px 0px 10px 3px red";
  var styleSansErreurForm = "0px 0px 10px 3px green";

  //Bouton commande on verifie les erreur
  btnCommander.addEventListener("click", (e) => {
    e.preventDefault();
    let erreurForm = false;
    if (
      erreurNom ||
      erreurAdresse ||
      erreurPrenom ||
      erreurEmail ||
      erreurVille
    ) {

      //Erreur dans le formulaire on change la couleur de l'input
      erreurForm = true;
      erreurNom
        ? (inputNom.style.boxShadow = styleErreurForm)
        : styleSansErreurForm;
      erreurPrenom
        ? (inputPrenom.style.boxShadow = styleErreurForm)
        : styleSansErreurForm;
      erreurAdresse
        ? (inputAdresse.style.boxShadow = styleErreurForm)
        : styleSansErreurForm;
      erreurVille
        ? (inputVille.style.boxShadow = styleErreurForm)
        : styleSansErreurForm;
      erreurEmail
        ? (inputEmail.style.boxShadow = styleErreurForm)
        : styleSansErreurForm;
    }

    if (!erreurForm) {

      //Aucune erreur création de l'objet contact et du tableau d'id
      let contact = {
        firstName: inputNom.value,
        lastName: inputPrenom.value,
        address: inputAdresse.value,
        city: inputVille.value,
        email: inputEmail.value,
      };
      let idProduit = [];
      panier.forEach((element) => {
        idProduit.push(element.canape.id);
      });

      let data;
      data = { contact: contact, products: idProduit };

      //Envoi du produit à l'API et récupération du numéro de commande puis changement de page
      postProduct(data)
        .then((element) => {

          window.location.href = '../html/confirmation.html?orderId='+element.orderId;
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("erreur form");
    }
  });

}

//Rendu HTML de la partie dynamique de la page
function renderHTML(panier) {
  sectionPanier.innerHTML = "";
  prixTotal = 0;
  quantiteTotal = 0;

  panier.forEach((element) => {
    sectionPanier.innerHTML += buildArticleHTML(element);

    prixTotal += element.canape.prix * element.quantite;
    quantiteTotal += element.quantite;
    ajoutEvent();
  });

  spanPrixTotal.innerHTML = prixTotal;
  spanQuantiteTotalArticle.innerHTML = quantiteTotal;
}

//Rendu HTML d'un article 
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
  <p id="prixArticle">Prix : ${element.quantite * element.canape.prix} €</p>
  </div>
  <div class="cart__item__content__settings">
  <div class="cart__item__content__settings__quantity">
  <p>Qté : </p>
  <input data-id="${element.canape.id}" data-color="${element.canape.couleurChoisie}" type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.quantite}">
  </div>
  <div class="cart__item__content__settings__delete">
  <p data-id="${element.canape.id}" data-color="${element.canape.couleurChoisie}" class="deleteItem">Supprimer</p>
  </div>
        </div>
        </div>
        </article>`;
}

//Ajout evenement pour tous les boutons supprimer des articles et maj de l'html
function ajoutEvent() {

  let inputNumberArticle = document.querySelectorAll('.itemQuantity');

  inputNumberArticle.forEach((elementInput) => {

    elementInput.addEventListener('change', (e) => {

      let idArticle = e.target.dataset.id;
      let couleurArticle = e.target.dataset.color;
  
      setQuantite(idArticle, couleurArticle, e.target.value);
    
      renderHTML(getPanier());
    });
  });

  let btnSupprimer = document.querySelectorAll(".deleteItem");

  btnSupprimer.forEach((element) => {
    element.addEventListener("click", (e) => {
      let idArticle = e.target.dataset.id;
      let couleurArticle = e.target.dataset.color;

      supprimerElementPanier(idArticle, couleurArticle);

      prixTotal = 0;
      quantiteTotal = 0;

      renderHTML(getPanier());
    });
  });
}

//Verification si l'input est un texte ajout couleur à l'input si erreur
function verifTexte(input) {
  let regex = new RegExp("^[a-zA-Z ]+$");
  let verifErreur = regex.test(input.value);
  if (verifErreur) {
    btnCommander.disabled = false;
    input.style.boxShadow = styleSansErreurForm;
  } else {
    btnCommander.disabled = true;
    input.style.boxShadow = styleErreurForm;

  }
  return verifErreur;
}

//Verification si l'input est un mail ajout couleur à l'input si erreur
function verifMail(input) {
  let regex = new RegExp(
    "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
  );
  let verifErreur = regex.test(input.value);
  if (verifErreur) {
    btnCommander.disabled = false;
    input.style.boxShadow = styleSansErreurForm;
  } else {
    btnCommander.disabled = true;
    input.style.boxShadow = styleErreurForm;

  }
  return verifErreur;
}

//Verification si l'input n'est pas vide ajout couleur à l'input si erreur
function verifMinimumCaractere(input) {
  let regex = new RegExp("^[a-zA-Z0-9 ]+$");
  let verifErreur = regex.test(input.value);
  if (verifErreur) {
    btnCommander.disabled = false;
    input.style.boxShadow = styleSansErreurForm;
  } else {
    btnCommander.disabled = true;
    input.style.boxShadow = styleErreurForm;

  }
  return verifErreur;
}

let erreurNom = true;
let erreurPrenom = true;
let erreurAdresse = true;
let erreurVille = true;
let erreurEmail = true;


//Verification du formulaire
function verifForm(e) {

  let idInput = e.target.id;

  const messageErreurTexte = `Minimum 1 caractère <br> Seulement des lettres`;

  //Selon l'input action différente
  switch (idInput) {
    case "lastName":

      erreurNom = !verifTexte(e.target);


      messageErreurNom.innerHTML = erreurNom ? messageErreurTexte : "";
      break;
    case "firstName":

      erreurPrenom = !verifTexte(e.target);

      messageErreurPrenom.innerHTML = erreurPrenom
        ? messageErreurTexte
        : "";
      break;
    case "address":

      erreurAdresse = !verifMinimumCaractere(e.target);

      messageErreurAdresse.innerHTML = erreurAdresse
        ? `Minimum 1 caractère`
        : "";
      break;
    case "city":

      erreurVille = !verifTexte(e.target);

      messageErreurVille.innerHTML = erreurVille
        ? messageErreurTexte
        : "";
      break;
    case "email":

      erreurEmail = !verifMail(e.target);

      messageErreurEmail.innerHTML = erreurEmail
        ? `Minimum 1 caractère <br> Exemple: test@test.com`
        : "";
      break;

    default:

  }
}