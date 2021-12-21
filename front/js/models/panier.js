export default class Panier {
    constructor(
        produits,
        quantite
    ) {
        this.produits = produits;
        this.quantite = quantite;
    }

}

export function getPanier() {
    return JSON.parse(localStorage.getItem('panier')) ? JSON.parse(localStorage.getItem('panier')) : [];
}

export function ajouterArticle(product, quantite) {
    let panier = getPanier();
    let findProduct = panier.find(element => element.canape.id === product.id && element.canape.couleurChoisie === product.couleurChoisie);

    // console.log(panier);
    // console.log(product);
    // console.log(findProduct);

    if (findProduct) {
        panier.find(element => element.canape.id === product.id && element.canape.couleurChoisie === product.couleurChoisie).quantite = Number(findProduct.quantite) + quantite;

    } else {
        // product.nbre = quantite;
        panier.push({canape: product, quantite: quantite});

    }

    console.log(panier);
    alert('Produit ajouté');
    localStorage.setItem('panier', JSON.stringify(panier));

}

export function supprimerElementPanier(id, color) {

    let panier = getPanier();
    panier.forEach((element, index) => {
        if (element.canape.id === id && element.canape.couleurChoisie === color) {

            if (element.quantite > 1) {
                element.quantite--;
            } else {
                panier.splice(index, 1);
            }

        }
    });
    localStorage.setItem('panier', JSON.stringify(panier));
}

// export function verifQuantite(quantite){
//     return Number(quantite < 1 ? 1 : quantite);
// }

