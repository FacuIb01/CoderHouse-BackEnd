require("dotenv").config()

const yargs = require("yargs")
const argv = yargs.alias({
    p: "port"
}).default({
    p: 8080
}).argv

const PORT = argv.p





module.exports = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: PORT
}