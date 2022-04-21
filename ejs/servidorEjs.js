const c = require('./index.js');
const express = require('express');
const handlebars = require('express-handlebars');
const {Router} = express;
const app = express();
const router = Router();
const servidor = app.listen(8080, () => {
    console.log('Servidor iniciado en el puerto 8080');
});



app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);
app.set('views', './views');
app.set('view engine', 'ejs');



servidor.on("error", (err) => {
    console.log(err);
})

app.use(function(req, res, next) {
    res.status(500).json({
        error: "producto no encontrado"
    })

})


router.get('/', (req, res) => {
    let productos = c.getAll();
    if(productos.length > 0) {
    res.render('pages/productos', {productos, lista: true})
    } else {
        res.render('pages/productos', {productos: [], lista: false})
    }
})

router.get("/productosformulario", (req, res) => {
    res.render('pages/formulario')
})

router.post("/productos", (req, res) => {
    c.save(req.body);
    res.redirect("/api");
})