const fs = require('fs');

class Chat {
    constructor(ruta){
        this.ruta = ruta;
    }
    save(info){
        let data = fs.readFileSync(this.ruta, 'utf8');
        if(data.length === 0){
            let array = {autor: info.autor, mensaje: info.mensaje, date: new Date().toString()};
            fs.writeFileSync(this.ruta, JSON.stringify(array,null,2));
        }
        else{
            let array = JSON.parse(data);
            array.push({autor: info.autor, mensaje: info.mensaje, date: new Date().toString()});
            fs.writeFileSync(this.ruta, JSON.stringify(array,null,2));
        }
    }

    getAll(){
        let data = fs.readFileSync(this.ruta, 'utf8');
        let array = JSON.parse(data);
        return array;
    }
}


module.exports = Chat;