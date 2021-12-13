export default class Panier {
    constructor(
        produits
    )
    {
        this.produits = produits;
    }

}

export function getPanier(){
    return JSON.parse(localStorage.getItem('panier')) ? JSON.parse(localStorage.getItem('panier')) : [];
}

export function setPanier(product){
    let panier = getPanier();
    let findProduct = panier.find(element => element.id === product.id);

    console.log(panier);
    console.log(product);

    if (findProduct) {
        console.log(findProduct)
        console.log('trouvé');

    } else {
        panier.push(product);
        localStorage.setItem('panier', JSON.stringify(panier));
    }
    
}