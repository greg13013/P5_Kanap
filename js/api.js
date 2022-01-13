const baseURL = "https://colligregory-p5-kanap.herokuapp.com/api/products";


//Appel à l'API get tous les produits
export function getAllProducts() {
  return new Promise((resolve, reject) => {
    fetch(baseURL)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

//Appel à l'API get un produit avec l'ID
export function getProductById(id) {
  return new Promise((resolve, reject) => {
    fetch(baseURL + "/" + id)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

//Appel à l'API post envoie du panier puis récupération du numéro de commande
export function postProduct(data) {

  return new Promise((resolve, reject) => {
    fetch(baseURL + "/order", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}