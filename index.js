const fs = require('fs');
const { json } = require('stream/consumers');

class Contenedor {
    constructor(ruta) {
        this.id = 1,
        this.ruta = ruta;
    }

    save(objeto){
        let data = fs.readFileSync(this.ruta, 'utf8');
        objeto.id = this.id;
        if(data.length == 0){
            let array = [objeto];
            fs.writeFileSync(this.ruta, JSON.stringify(array,null,2));
        }
        else{
            let array = JSON.parse(data);
            array.push(objeto);
            fs.writeFileSync(this.ruta, JSON.stringify(array,null,2));
        }
        this.id++
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
            return array
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

let c = new Contenedor("./productos.json");







module.exports = c


