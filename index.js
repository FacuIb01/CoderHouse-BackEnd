const fs = require('fs');
const { json } = require('stream/consumers');

const express = require('express');
const app = express();
const servidor = app.listen(8080, () => {
    console.log('Servidor iniciado en el puerto 8080');
});

servidor.on("error", (err) => {
    console.log(err);
})

class Contenedor {
    constructor(ruta) {
        this.id = 1,
        this.ruta = ruta;
    }

    save(objeto){
        let data = fs.readFileSync(this.ruta, 'utf8');
        objeto.id = this.id;
        if(data.length == 0){
            let array = [objeto];
            fs.writeFileSync(this.ruta, JSON.stringify(array));
        }
        else{
            let array = JSON.parse(data);
            array.push(objeto);
            fs.writeFileSync(this.ruta, JSON.stringify(array));
        }
        this.id++
    }

    getById(id){
        let data = fs.readFileSync(this.ruta, 'utf8');
        try{
            let array = JSON.parse(data);
            let objeto = array.find(obj => obj.id == id);
            return console.log(objeto)
        }catch(err){
            return console.log("algo fallo!, solucionalo crack, te dejo el error: \n" + err);
        }
    }

    getAll(){
        try{
            let data = fs.readFileSync(this.ruta, 'utf8');
            let array = JSON.parse(data);
            return array
        }catch(err){
            return console.log("algo fallo!, solucionalo crack, te dejo el error: \n" + err);
        }
    }
    
    deleteById(id){
        let data = fs.readFileSync(this.ruta, 'utf8');
        let array = JSON.parse(data);
        let objeto = array.find(obj => obj.id === id);
        if(objeto == undefined){
            return "Ingrese un id valido"
        }else{
            let index = array.indexOf(objeto);
            array.splice(index, 1);
            fs.writeFileSync(this.ruta, JSON.stringify(array));
        }
    }

    deleteAll(){
        fs.writeFileSync(this.ruta, '');
    }
}

let c = new Contenedor("./productos.json");


// let producto1 = {nombre: "Leche", precio: "5", img: "img.jpg"};
// let producto2 = {nombre: "Huevo", precio: "15", img: "img.jpg"};
// let producto3 = {nombre: "Gomitas", precio: "10", img: "img.jpg"};

// c.save(producto1);
// c.save(producto2);
// c.save(producto3);

function numeroRandom(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


app.get("/", (req, res) => {
    res.send(`<h1 style="color:red">Hola Coders!</h1>`);
})
app.get("/productos", (req, res) => {
    let productos = c.getAll();
    res.json({
        resultado : "Productos obtenidos",
        productos : productos
    })
});

app.get("/productoRandom", (req, res) => {
    let productos = c.getAll();
    let random = numeroRandom(0, productos.length - 1);
    res.json({
        resultado : "Producto obtenido",
        producto : productos[random]
    })
})




