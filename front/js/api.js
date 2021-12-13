export function getAllProducts() {

    return new Promise((resolve, reject) => {
        fetch('http://localhost:3000/api/products').then((res) => {
            if (res.ok) {
                console.log(res);
                return res.json();
            }
        }).then((data) => {

            resolve(data);


        }).catch((error) => {

            reject(error);
        })
    })
}

export function getProductById(id) {

    return new Promise((resolve, reject) => {
        fetch('http://localhost:3000/api/products/' + id).then((res) => {
            if (res.ok) {
                return res.json();
            }
        }).then((data) => {
            
            resolve(data)
        
        }).catch((error) => {

            reject(error);
        })
    })
}




