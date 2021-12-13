export default class Canape {
    constructor(
        id,
        nom,
        prix,
        imageUrl,
        description,
        couleurs,
        altText
    )
    {
        this.id = id;
        this.nom = nom;
        this.prix = prix;
        this.imageUrl = imageUrl;
        this.description = description;
        this.couleurs = couleurs;
        this.altText = altText;
        this.couleurChoisie = '';
    }
}
