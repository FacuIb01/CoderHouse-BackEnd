const c = require('./index.js');
const express = require('express');
const {Router} = express;
const app = express();
const router = Router();
const servidor = app.listen(8080, () => {
    console.log('Servidor iniciado en el puerto 8080');
});



app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use("/api", router)
app.set('view engine', 'pug');
app.set('views', './views');


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
    res.render('index.pug', {productos,})
})

router.post("/productos", (req, res) => {
    c.save(req.body);
    res.redirect("/api");
})