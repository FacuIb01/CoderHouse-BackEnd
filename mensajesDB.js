const {optionsSQLite } = require("./optionsSQLite/optionsMensajes.js");
const knex = require("knex")

class MensajeriaDB{
    constructor(config, tabla){
        this.knex = knex(config);  
        this.tabla = tabla;
    }
    async crearTabla(tabla){
        try {
            await this.knex.schema.createTable(this.tabla, table => {
                table.increments('id').primary();
                table.string('autor');
                table.string('mensaje');
                table.time('date');
            })
    }   catch (error) {
        console.log(error)
    }   finally{
        this.knex.destroy();
    }
    }
    save = async (objeto)=>{
        try{
            await this.knex(this.tabla).insert(objeto);
        }catch(error){
            console.log(error)
        }
    }
    getAll = async () => {
            const mensajes = await this.knex(this.tabla).select("*")
            .then(res => {return res})
            .catch(error => {console.log(error)});

            return mensajes;
        }
}

const mensajeria = new MensajeriaDB(optionsSQLite, 'mensajes');
// mensajeria.crearTabla('mensajes');
// mensajeria.save({autor: "Juan", mensaje: "Hola", date: Date.now().toString()});
// mensajeria.getAll();
//TODOS ESTAS FUNCIONES REALIZAN CORRECTAMENTE LA TAREA DESDE ESTE ARCHIVO

module.exports ={
    mensajeria
}