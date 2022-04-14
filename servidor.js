const c = require('./index.js');
const express = require('express');
const {Router} = express;
const app = express();
const router = Router();
const servidor = app.listen(8080, () => {
    console.log('Servidor iniciado en el puerto 8080');
});


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/static", express.static(__dirname + '/public'));
app.use("/api", router)


servidor.on("error", (err) => {
    console.log(err);
})

app.use(function(req, res, next) {
    console.log(err)
    res.status(500).json({
        error: "producto no encontrado"
    })

})



app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})

router.get("/productos", (req, res) => {
    let productos = c.getAll();

        res.json({
            resultado : "Productos obtenidos",
            productos : productos
        })

});

router.get("/productos/:id", (req, res) => {
    let producto = c.getById(req.params.id)
    if(producto === undefined){
        res.status(500).send("producto no encontrado")
    }
    res.json({
        respuesta: "obtenido por id",
        producto: producto
    })
})

router.put("/productos/:id", (req, res)=>{

    let id = Number(req.params.id);
    let nuevoProducto = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        img: req.body.img
    }
    c.update(id,nuevoProducto)
    res.json({
        respuesta: "actualizado",
        producto: nuevoProducto
    })
})

router.post("/productos", (req, res) => {
    let nuevoProducto = {
        nombre: req.body.nombre,
        precio: req.body.precio,
        img: req.body.img
    }
    c.save(nuevoProducto)
    res.json({
        respuesta: "agregado",
        productoAgregado: nuevoProducto 
    }
    )
})

router.delete("/productos/:id", (req, res) => {
    let id = Number(req.params.id)
    if(c.deleteById(id) === undefined){
        res.status(500).send("producto no encontrado")
    }
    res.json({
        respuesta: "eliminado"
    })
})


