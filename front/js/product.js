import Canape from "./models/canape.js";

const parametreUrl = window.location.search;
const urlSearch = new URLSearchParams(parametreUrl);
const id = urlSearch.get('id');

console.log(id);

fetch('http://localhost:3000/api/products/' + id).then((res) => {
    if (res.ok) {
        return res.json();
    }
}).then((data) => {
    console.log(data);
    let canape = new Canape(data._id, data.name, data.price, data.imageUrl, data.description, data.colors, data.altTxt);
    console.log(canape);

}).catch((error) => {
    console.log(error);
})