const Chat = require('./chat.js');
const {productosDB} = require("./productosDB.js");
const { mensajeria } = require("./mensajesDB.js");
const express = require('express');
const handlebars = require('express-handlebars');
const {Server: IOServer } = require('socket.io');
const {Server: HTTPServer} = require('http');
const app = express();
const httpServer = new HTTPServer(app)
const io = new IOServer(httpServer)
const chat = new Chat('./chat.json');
// const {Router} = express;
// const router = Router();

app.use(express.static('/public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine("hbs", handlebars.engine({
    extname: ".hbs", ///extension of the file
    defaultLayout: "index.hbs", ///layout por defecto
    layoutsDir: __dirname + "/views/layouts",  ///ruta de los layouts
    partialDir: __dirname + "/views/partials" ///ruta de los partials
}))

app.set('view engine', 'hbs');
app.set('views', './views');


// servidor.on("error", (err) => {
//     console.log(err);
// })

// app.use(function(req, res, next) {
//     res.status(500).json({
//         error: "producto no encontrado"
//     })

// })

const productos = productosDB.getAll(); 

io.on('connection',  async (socket) => {
    console.log("Nueva conexion");
    socket.emit('productos', await productos);
    socket.emit("mensajes", await mensajeria.getAll());

    socket.on('agregarProducto', async (data) => {
        await productosDB.save(data);
        socket.emit('productos', await productos);
    })

    socket.on('enviarMensaje', async (data) => {
        await mensajeria.save(data);
        io.sockets.emit("mensajes", await mensajeria.getAll());
    })

})


httpServer.listen(8080, () => {
    console.log('Servidor iniciado en el puerto 8080');
});

app.get('/', (req, res) => {
    try{
        res.render('productos', {productos: productos, lista: true})
    }catch(err){
        console.log(err);
    }

})

app.get("/Chat", (req, res) => {
    res.render("chat")
})

// router.get("/productosFormulario", (req, res) => {
//     res.render('formulario')
// })

// router.post("/productos", (req, res) => {
//     c.save(req.body);
//     res.redirect("/api");
// })
