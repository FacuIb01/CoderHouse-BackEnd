const routerRandom = require("express").Router()
const {fork} = require("child_process")
const routerInfo = require("express").Router()
const {info, args} = require("../utils/info")
const random = require("../utils/numeroRandom")
const { consoleLog, warnLog, errorLog } = require("../utils/logs")


routerInfo.get("/info", (req, res) => {
    consoleLog.info(`ruta: ${req.url}, method: ${req.method}`);
    //consoleLog.info(info());
    res.json({
        info: info()
    })
})

routerRandom.get("/random?", (req, res) => {
    consoleLog.info(`ruta: ${req.url}, method: ${req.method}`);
    const cant = req.query.cant ? req.query.cant : 100000000
    res.json({
        puerto: process.argv[2],
        random: random(cant)
    })

})


module.exports = {routerRandom, routerInfo}