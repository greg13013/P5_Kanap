export default class Panier {
    constructor(
        produits
    ) {
        this.produits = produits;
    }

}

export function getPanier() {
    return JSON.parse(localStorage.getItem('panier')) ? JSON.parse(localStorage.getItem('panier')) : [];
}

export function ajouterArticle(product, quantite) {
    let panier = getPanier();
    let findProduct = panier.find(element => element.id === product.id);

    // console.log(panier);
    // console.log(product);

    if (findProduct && findProduct.couleurChoisie === product.couleurChoisie) {
        panier.find(element => element.id === product.id).nbre = Number(findProduct.nbre) + quantite;

    } else {
        product.nbre = quantite;
        panier.push(product);

    }

    console.log(panier);
    alert('Produit ajouté');
    localStorage.setItem('panier', JSON.stringify(panier));

}

export function supprimerElementPanier(id, color) {

    let panier = getPanier();
    panier.forEach((element, index) => {
        if (element.id === id && element.couleurChoisie === color) {

            if (element.nbre > 1) {
                element.nbre--;
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

