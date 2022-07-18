const routerRandom = require("express").Router()
const {fork} = require("child_process")
const routerInfo = require("express").Router()
const {info, args} = require("../utils/info")



routerInfo.get("/info", (req, res) => {
    res.json({
        info: info()
    })
})

routerRandom.get("/random?", (req, res) => {
    const cant = req.query.cant ? req.query.cant : 100000000
    if(args.server === "fork"){ //si iniciamos el servidor como fork 
        const forket = fork("tarea-clase-27/src/utils/numeroRandom.js")
        forket.send(cant)
        forket.on("message", (data) => {
            res.json({
                random: data
            })
        })
    }else{ //si lo ejecutamos como cluster
        const numeros = random(cant)
        res.json({
            random: numeros
        })
    }
})


module.exports = {routerRandom, routerInfo}