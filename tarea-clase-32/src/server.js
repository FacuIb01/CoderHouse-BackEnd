const express = require("express");
const session = require("express-session");
const {MONGO_URI} = require("./config/config")
const PORT = process.argv[2] || 8080
const handlebars = require('express-handlebars');
const UserModel = require("./models/usuarios");
const router =  express.Router();
const {routerRandom, routerInfo} = require("./routes/routesPm2")
const { consoleLog, warnLog, errorLog } = require("./utils/logs")


//loggers



//loggers


const passValidator = require("./utils/passValidator");
const createHash = require("./utils/createHash");

const MongoStore = require("connect-mongo")

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const advancedOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}
const app = express();


/*


USAR ESTE PARA FOREVER Y PM2 


*/ 


//middlewares
app.use("/api/", routerRandom)
app.use("", routerInfo)

app.use(session({
    store: MongoStore.create({
        mongoUrl: MONGO_URI,
        mongoOptions: advancedOptions,
        ttl: 60,
    }),
    secret: "coder",
    resave: true,
    saveUninitialized: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(passport.initialize())
app.use(passport.session())
app.use("/", router)
app.use((req, res, next) => {
    consoleLog.info(`Metodo: ${req.method}, ruta ${req.url}`)
    next()   
})


//middlewares

//configuracion HBS

app.engine("hbs", handlebars.engine({
    extname: ".hbs", ///extension of the file
    defaultLayout: "index.hbs", ///layout por defecto
    layoutsDir: __dirname + "/views/layouts",  ///ruta de los layouts
    partialDir: __dirname + "/views/partials", ///ruta de los partials
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    }
}))

app.set('view engine', 'hbs');
app.set('views', __dirname + "/views");

//configuracion HBS


//session


//session

//Estrategias de Passport
passport.serializeUser((user, callback) => {
    callback(null, user._id)
})

passport.deserializeUser((id, callback) => {
    UserModel.findById(id, callback)
})

passport.use("login", new LocalStrategy((username, password, done)=>{
    UserModel.findOne({username: username,}, (err, user)=>{
        if(err){
            return done(err)
        }
        if(!user){
            return done(null, false)
        }
        if(!passValidator(user, password)){
            console.log("invalid password")
            return done(null, false)
        }

        return done(null, user)
    })
}))


passport.use("signup", new LocalStrategy({passReqToCallback: true},(req, username, password, callback)=>{
    UserModel.findOne({username:username}, (err, user)=>{
        if(err){
            return callback(err)
        }
        if(user){
            console.log("usuario existente")
            return callback(null, false)
        }

        console.log(req.body)

        const newUser = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            username: username,
            password: createHash(password),
        }

        UserModel.create(newUser, (err, usuarioConId)=>{
            if (err) {
                console.log('Hay un error al registrarse');
                return callback(err)
            }

            console.log(usuarioConId);
            console.log('Registro de usuario satisfactoria');
            return callback(null, usuarioConId)
        })

    })
}))



//Estrategias de PassPort




//routes

router.get("/", (req, res) => {
    consoleLog.info(`ruta: ${req.url}, method: ${req.method}`);
    res.render("main")
})

router.get("/login", (req, res) => {
    consoleLog.info(`ruta: ${req.url}, method: ${req.method}`);
    if(req.isAuthenticated()){
        res.redirect("/profile")
    }else{
        res.render("login")
    }
})

router.post("/login",passport.authenticate("login", {failureRedirect: "/failLogin"}), (req, res) => {
    if(req.isAuthenticated()){
        res.redirect("/profile")
    }else{
        res.redirect("/login")
    }
})

router.get("/failLogin", (req, res) => {
    consoleLog.info(`ruta: ${req.url}, method: ${req.method}`);
    res.render("login-error")
})

router.get("/profile",checkAuthentication, (req, res) =>{
    consoleLog.info(`ruta: ${req.url}, method: ${req.method}`);
    const usuario = req.user
    res.render("profile", {user: usuario})
})

router.get("/logout", (req, res) => {
    consoleLog.info(`ruta: ${req.url}, method: ${req.method}`);
    req.logout((error) => {
        if(error){
            console.log(error)
        }else{
            res.render("main")
        }
    })
})

//LOGIN

//REGISTER

router.get("/signup", (req, res) => {
    consoleLog.info(`ruta: ${req.url}, method: ${req.method}`);
    res.render("signup")
})

router.post("/signup", passport.authenticate("signup", {failureRedirect: "/failSignup"}), (req, res) => {
    if(req.isAuthenticated()){
        res.redirect("/profile")
    }else{
        res.redirect("/login")
    }
})

router.get("/failSignup", (req, res) => {
    consoleLog.info(`ruta: ${req.url}, method: ${req.method}`);
    res.render("signup-error")
})


//REGISTER

//routes


//inexistentes

app.get("*", (req, res) => {

    consoleLog.warn("Ruta inexistente")
    warnLog.warn("Ruta inexistente")

    res.sendStatus(404)

})

//inexistentes






function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else {
        res.redirect("/login");
    }
}



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})