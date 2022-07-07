const yargs = require("yargs")
const args = yargs.argv

const info = () => {
    const objeto ={
        argumentos: args,
        OS: process.platform,
        NodeVersion: process.version,
        Memoria: process.memoryUsage(),
        Path: process.cwd(),
        Id: process.pid,
        Carpeta: process.title,
    }

    return objeto
}


module.exports = info