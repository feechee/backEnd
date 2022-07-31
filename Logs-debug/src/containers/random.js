function randomNums(cant) {
    const numeros = [];
    const repetidos = {}
    for (let index = 0; index < cant; index++) {
      const random = Math.floor(Math.random() * 1000) + 1;
      numeros.push(random)
    }
  
    numeros.forEach(function(numero){
      repetidos[numero] = (repetidos[numero] || 0) + 1;
    });
  
    return repetidos
  }


process.on('message', msg => {
    const rndm = randomNums(msg)
    process.send(rndm)
    process.exit()
})