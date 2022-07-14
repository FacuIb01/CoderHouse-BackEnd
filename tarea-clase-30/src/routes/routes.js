const routerRandom = require("express").Router()
const {fork} = require("child_process")
const routerInfo = require("express").Router()
const {info, args} = require("../utils/info")
const random = require("../utils/numeroRandom")


routerInfo.get("/info", (req, res) => {
    res.json({
        info: info()
    })
})

routerRandom.get("/random?", (req, res) => {
    const cant = req.query.cant ? req.query.cant : 10
    const forket = fork("tarea-clase-30/src/utils/numeroRandom.js")
    forket.send(cant)
    forket.on("message", (data) => {
    res.json({
        puerto: process.argv[2],
        random: data
        })
    }) 
})


module.exports = {routerRandom, routerInfo}