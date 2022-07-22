
const numeros = {
}

const numeroRandom = ( min = 1, max = 1000 ) => {
    return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}

const random = (valor) => {
    for(let i = 0; i < valor; i++){
        let number = numeroRandom();
        if(numeros.hasOwnProperty(`numero${number}`)){
            numeros[`numero${number}`].array.push(number);
            numeros[`numero${number}`].apariciones++
        }else{
            numeros[`numero${number}`] = {
                array: [number],
                apariciones: 1

            }

        }
    }
    return numeros;
}

process.on("message", (data) => {
    let numeros = random(data)
    process.send(numeros)
})

module.exports = random

