const fs = require('fs');
const { json } = require('stream/consumers');
const { schema, normalize, } = require('normalizr');
const utils = require('util');

const schemaAuthor = new schema.Entity('author', {}, { idAttribute: 'email' });

// Definimos un esquema de mensaje
const schemaMensaje = new schema.Entity('post', { author: schemaAuthor }, { idAttribute: 'id' })

// Definimos un esquema de posts
const schemaMensajes = new schema.Entity('posts', { mensajes: [schemaMensaje] }, { idAttribute: 'id' })

const normalizarMensajes = (mensajesConId) => normalize(mensajesConId, schemaMensajes)


class Contenedor {
    constructor(ruta) {
        this.id = 1,
        this.ruta = ruta;
    }

    save(objeto){
            let data = fs.readFileSync(this.ruta, 'utf8');
            objeto.id = this.id;
            let array = JSON.parse(data);
            array[0].mensajes.push(objeto);
            fs.writeFileSync(this.ruta, JSON.stringify(array,null,2));
    }

    update(id, objetoNuevo){
        
        let data = fs.readFileSync(this.ruta, 'utf8');
        try{
            let array = JSON.parse(data);
            let objeto = array.find(obj => obj.id === id);
            if(objeto == undefined){
                throw "Ingrese un id valido"
            }else{
                let index = array.indexOf(objeto);
                let objetoViejo = array[index];
                objetoViejo.nombre = objetoNuevo.nombre;
                objetoViejo.precio = objetoNuevo.precio;
                objetoViejo.img = objetoNuevo.img;
                fs.writeFileSync(this.ruta, JSON.stringify(array,null,2));
            }
        }catch(err){
            return console.log("algo fallo!, solucionalo crack, te dejo el error: \n" + err);
        }
    }

    getById(id){
        let data = fs.readFileSync(this.ruta, 'utf8');
        try{
            let array = JSON.parse(data);
            let objeto = array.find(obj => obj.id == id);
            if(objeto === undefined){
                return undefined
            }
            return objeto
        }catch(err){
            return console.log("algo fallo!, solucionalo crack, te dejo el error: \n" + err);
        }
    }

    
    getAll(){
        try{
            let data = fs.readFileSync(this.ruta, 'utf8');
            let array = JSON.parse(data);
            let normalizado = normalizarMensajes(array[0], schemaMensajes);
            console.log(normalizado)
            return normalizado
        }catch(err){
            return console.log("algo fallo!, solucionalo crack, te dejo el error: \n" + err);
        }
    }
    
    deleteById(id){
        let data = fs.readFileSync(this.ruta, 'utf8');
        let array = JSON.parse(data);
        let objeto = array.find(obj => obj.id === id);
        if(objeto == undefined){
            return undefined
        }else{
            let index = array.indexOf(objeto);
            array.splice(index, 1);
            fs.writeFileSync(this.ruta, JSON.stringify(array,null,2));
        }
    }

    deleteAll(){
        fs.writeFileSync(this.ruta, '');
    }
}

let c = new Contenedor("restos/productos.json");


const chat = new Contenedor("restos/chat.json");

let mensaje1 ={
    author:{
        email: "rodrigo@gmail.com",
        nombre: "Rodrigo",
        apellido: "Perez",
        edad: "25",
        alias: "rodrigo",
        avatar: "https://randomuser.me/api/portraits/"
    },
    mensaje: "Hola, como estas?"
}

chat.getAll()



module.exports = c, chat;


