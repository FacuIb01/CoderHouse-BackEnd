const mongoose = require('mongoose');
const {MONGO_URI} = require('../config/config');



mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("connected to mongo")
    }
});

const UsuariosCollection = "usuarios";

const UsuariosSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true}
})


module.exports = mongoose.model(UsuariosCollection, UsuariosSchema);
