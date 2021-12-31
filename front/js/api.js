//Appel à l'API get tous les produits
export function getAllProducts() {
  return new Promise((resolve, reject) => {
    fetch("http://localhost:3000/api/products")
      .then((res) => {
        if (res.ok) {
          console.log(res);
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
    fetch("http://localhost:3000/api/products/" + id)
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
    fetch("http://localhost:3000/api/products/order", {
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