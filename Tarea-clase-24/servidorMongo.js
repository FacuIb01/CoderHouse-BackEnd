const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const handlebars = require('express-handlebars');
const MongoStore = require("connect-mongo")
const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
const app = express();


//configuracion HBS

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(cookieParser("coder"));

app.engine("hbs", handlebars.engine({
    extname: ".hbs", ///extension of the file
    defaultLayout: "index.hbs", ///layout por defecto
    layoutsDir: __dirname + "/views/layouts",  ///ruta de los layouts
    partialDir: __dirname + "/views/partials" ///ruta de los partials
}))

app.set('view engine', 'hbs');
app.set('views', __dirname + "/views");

//configuracion HBS

app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://kirad:0912@cluster0.gv6yipm.mongodb.net/?retryWrites=true&w=majority",
        mongoOptions: advancedOptions,
        ttl: 60,
    }),
    secret: "coder",
    resave: true,
    saveUninitialized: true
}))

const server = app.listen(8080, () => {
    console.log("Servidor iniciado en el puerto 8080");
})

server.on("error", (err)=>{
    console.log(err);
})



app.get("/login" ,(req,res)=>{
    if(req.session.usuarioSession){
        const { usuarioSession } = req.session;
        res.render("login", { usuario: usuarioSession})
    }else{
        if(req.query.usuario){
            const {usuario} = req.query;
            req.session.usuarioSession = usuario;
            res.redirect("/login");
        }else{
            res.render("login", { usuario: false})
        }
    }

})



app.get("/logout", (req,res)=>{
    const { usuarioSession } = req.session;
    req.session.destroy();
    res.render("logout", { usuario: usuarioSession})
})

