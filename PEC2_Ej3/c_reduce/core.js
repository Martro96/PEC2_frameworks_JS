function sum(array) {
  return array.reduce((sum, num) => sum + num, 0)
}

function productAll(array) {
  return array.flat() // Aplana la matriz de arrays en un solo array. 
  // Esto es posible porque el orden de los factores no altera el producto, lo que significa que podemos multiplicar todos los elementos en cualquier orden.
              .reduce((product, num) => product * num, 1);
}

function objectify(array) { //usamos .reduce porque nos permite transformar un array en otro tipo de estructura
  return array.reduce((obj, [key, value]) => {
    obj[key] = value; // Asignar la clave y el valor al objeto
    return obj; // Devolver el objeto acumulado
  }, {});
}

function luckyNumbers(array) {
  //En primer lugar, si no hay números en el array, devolvemos el mensaje predeterminado
  if (array.length === 0) {
    return "Your lucky numbers are: none";
  }
  //En caso de que sí que haya números en el array, usamos el reduce para acumular los números
  return array.reduce((accumulator, currentValue, index) => {
    // Si es el primer número, simplemente devolvemos el acumulador
    if (index === 0) {
      return `${accumulator}${currentValue}`;
    }

    // Si es el último número, agregamos "and" antes de él
    if (index === array.length - 1) {
      return `${accumulator}, and ${currentValue}`;
    }

    // Para los números que no son el último, simplemente agregamos el número actual
    return `${accumulator}, ${currentValue}`;
  }, "Your lucky numbers are: "); // Iniciamos con la frase inicial
}

module.exports = {
  sum,
  productAll,
  objectify,
  luckyNumbers
};
