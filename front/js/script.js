const sectionItems = document.getElementById('items');

 fetch('http://localhost:3000/api/products').then((res) => {
        if (res.ok) {
            return res.json();
        } 
    }).then((data) => {
        console.log(data);
        ajouterItems(data);
        
    }).catch((error) => {
        console.log(error);
    })


function ajouterItems(data){
    data.forEach(element => {
        sectionItems.innerHTML += `<a href="#">
    <article>
      <img src="${element.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
      <h3 class="productName">${element.name}</h3>
      <p class="productDescription">${element.description}</p>
    </article>
  </a>`
    });
}

