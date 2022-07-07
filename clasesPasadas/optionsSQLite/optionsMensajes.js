const optionsSQLite = {
    client: "sqlite3",
    connection: {
        filename: "./DB/mensajes.sqlite"
    }
    , useNullAsDefault: true
}

module.exports = {optionsSQLite}