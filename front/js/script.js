import Canape from "./models/canape.js";

const sectionItems = document.querySelector('#items');
let allCanape = [];

fetch('http://localhost:3000/api/products').then((res) => {
    if (res.ok) {
        return res.json();
    }
}).then((data) => {
    console.log(data);
    data.forEach((element) => {
        let canape = new Canape(element._id, element.name, element.price, element.imageUrl, element.description, element.colors, element.altTxt);
        allCanape.push(canape);
        ajouterItems(canape);
    })
    console.log(allCanape);
    // ajouterItems(data);

}).catch((error) => {
    console.log(error);
})


function ajouterItems(item) {

    sectionItems.innerHTML += `
    <a href="./product.html?id=${item.id}">
        <article>
            <img src="${item.imageUrl}" alt="${item.altText}">
            <h3 class="productName">${item.nom}</h3>
            <p class="productDescription">${item.description}</p>
            <p>${item.prix}€</p>
        </article>
    </a>`
};


