//Récupération du panier dans le localStorage s'il existe
export function getPanier() {
  return JSON.parse(localStorage.getItem('panier')) ? JSON.parse(localStorage.getItem('panier')) : [];
}

//Ajout article au panier dans le localStorage
export function ajouterArticle(product, quantite) {
  let panier = getPanier();

  //Verifie si l'article est déjà dans le panier avec la bonne couleur
  let findProduct = panier.find(element => element.canape.id === product.id && element.canape.couleurChoisie === product.couleurChoisie);

  if (findProduct) {

    //Ajoute la quantité choisie à l'article qui est deja dans le panier
    panier.find(element => element.canape.id === product.id && element.canape.couleurChoisie === product.couleurChoisie).quantite = Number(findProduct.quantite) + quantite;

  } else {
    //Ajoute l'article au panier
    panier.push({ canape: product, quantite: quantite });

  }

  console.log(panier);
  alert('Produit ajouté');
  localStorage.setItem('panier', JSON.stringify(panier));

}

//Supprime l'article selon son id et sa couleur du panier et maj du localStorage
export function supprimerElementPanier(id, color) {

  let panier = getPanier();
  panier.forEach((element, index) => {
    if (element.canape.id === id && element.canape.couleurChoisie === color) {

      //Si supérieur à 1  quantité -1 sinon suppression du panier
      if (element.quantite > 1) {
        element.quantite--;
      } else {
        panier.splice(index, 1);
      }

    }
  });
  localStorage.setItem('panier', JSON.stringify(panier));
}

//Met a jour la quantite de l'article
export function setQuantite(id, color, newQuantite) {
  let panier = getPanier();

  console.log(id, color);
  // panier.find(element => console.log(element.canape.id));
  // console.log(panier.find(element => element.canape.id === product.canape.id && element.canape.couleurChoisie === product.canape.couleurChoisie));

  //Met a jour la quantite de l'article dans la panier
  panier.find((element, index) => {
    if (element.canape.id === id && element.canape.couleurChoisie === color) {
      console.log(element);
      panier[index].quantite = Number(newQuantite);
      // console.log(panier[index]);
    }
  });

  localStorage.setItem('panier', JSON.stringify(panier));

}

