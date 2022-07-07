const Chat = require('./chat.js');
const {productosDB} = require("./productosDB.js");
// const { mensajeria } = require("./mensajesDB.js");

const express = require('express');
const handlebars = require('express-handlebars');
const {Server: IOServer } = require('socket.io');
const {Server: HTTPServer} = require('http');
const app = express();
const httpServer = new HTTPServer(app)
const io = new IOServer(httpServer)
const chat = require("./contenedorArchivo.js")
const fakerRandom = require('./faker.js');
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
app.set('views', __dirname + '/views');






io.on('connection',  async (socket) => {
    const productos =  fakerRandom() 
    const mensajes = chat.getAll();
    console.log(mensajes)

    console.log("Nueva conexion");
    socket.emit('productos', productos);
    socket.emit("mensajes", mensajes);

    socket.on('agregarProducto', async (data) => {
        await productosDB.save(data);

        socket.emit('productos', await productosDB.getAll());
    })

    socket.on('enviarMensaje', async (data) => {
        await mensajeria.save(data);
        let mensajes = await chat.getAll();
        console.log(mensajes)
        io.sockets.emit("mensajes", mensajes);
    })

})


httpServer.listen(8080, () => {
    console.log('Servidor iniciado en el puerto 8080');
});

app.get('/', (req, res) => {
    try{
        res.render('productos', { lista: true})
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
