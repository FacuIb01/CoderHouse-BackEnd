const yargs = require("yargs")
const args = yargs.alias("s", "server").argv

const info = () => {
    const objeto ={
        argumentos: args,
        OS: process.platform,
        NodeVersion: process.version,
        Memoria: process.memoryUsage(),
        Path: process.cwd(),
        Id: process.pid,
        Carpeta: process.title,
        numCPUs: require("os").cpus().length,
        Puerto: process.argv[2]
    }

    return objeto
}


module.exports = {info, args}