const {options} = require('./optionsSQLite/optionsProductos.js');
const knex = require('knex')

class ProductosDB {
    constructor(config, tabla) {
        this.knex = knex(config);
        this.tabla = tabla;
    }

    async crearTabla(){
        try {
            await this.knex.schema.createTable(this.tabla, table => {
                table.increments('id').primary();
                table.string('nombre')
                table.decimal('precio')
                table.string('img')
            })
            .then(res => {console.log("tabla creada")})
        } catch (error) {
            console.log(error)
        }
    }

    save = async (objeto)=>{
        try{
            await this.knex(this.tabla).insert(objeto).then(res => {console.log("guardado")});
        }catch(error){
            console.log(error)
        }
    }

    async update(id, objetoNuevo){
        try {
            await this.knex(this.tabla).where("id", "=", id).update(objetoNuevo).then(res => {console.log("actualizado")});
            
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id){
        try {
            const producto = await this.knex(this.tabla).select("*").where("id", "=", id);
            return producto;
        } catch (error) {
            console.log(error)
        }
    }

    
    getAll = async () => {
        try {
            const productos = await this.knex(this.tabla).select("*")
            .then(res => {return res;})
            .catch(err => {console.log(err)});
            return productos;
        } catch (error) {
            console.error(error)
        }
    }
    
    async deleteById(id){
        try {
            await this.knex(this.tabla).where("id", "=", id).del();
        } catch (error) {
            console.log(error)
        }
    }

    async deleteAll(){
        try {
            this.knex(this.tabla).del();
        } catch (error) {
            console.log(error)
        }
    }
}


const productosDB = new ProductosDB(options, "productos")
// productosDB.save({nombre: "producto 8", precio: 100, img: "img1"})
// productosDB.update(4, {nombre: "carlos", precio: 500, img: "img1"})
// productosDB.getById(5)
// productosDB.deleteById(5)


module.exports = {productosDB};