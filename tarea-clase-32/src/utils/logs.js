const log4js = require('log4js');


log4js.configure({
    appenders: {
        consola: {type: 'console'},
        fileWarning: {type: 'file', filename: `${__dirname}/../logs/warning.log`, level: 'warn'},
        fileError:{type: 'file', filename: `${__dirname}/../logs/error.log`}
    },
    categories: {
        default: {appenders: ['consola'], level: 'trace'},
        warn: {appenders: [`fileWarning`], level: 'warn'},
        error: {appenders: ["fileError"], level: 'error'}
    }
})

const consoleLog = log4js.getLogger();

const warnLog = log4js.getLogger("warn");
const errorLog = log4js.getLogger("error");

module.exports = {
    consoleLog,
    warnLog,
    errorLog,
}
