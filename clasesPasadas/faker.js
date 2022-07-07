const faker = require('faker');
faker.locale = "es"
const {commerce, image} = faker;

function fakerRandom(){
    let datos = []

    for(let i = 0; i < 5 ; i++){
        datos.push({
            id: i+1,
            nombre: commerce.product(),
            precio: commerce.price(),
            img: image.image()
    })
    }

    return datos
}

module.exports = fakerRandom