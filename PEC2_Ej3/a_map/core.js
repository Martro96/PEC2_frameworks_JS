function multiplyBy10(array) {
  return array.map(num => num * 10);
}
function shiftRight(array) {
  const lastElement = array[array.length - 1]; //guardamos el valor del último elemento (el de la derecha) para que cuando desplazemos no perdamos su valor

  for (let i = array.length - 1; i > 0; i--) { //recorremos el array a la inversa ya que empezamos en la última posición
    array[i] = array [i - 1]
  } //Con un bucle for recorremos el array para mover cada elemento a la derecha.
  array[0] = lastElement; //cambiamos el valor de la posición 0 del array para que el último pase al primer lugar.

  return array; // Devolver el array modificado
}

function onlyVowels(array) {  //Aquí si usamos map porque vamos a modificar las palabras del array actual
  return array.map(word => {  //primero usamos map para poder iterar sobre el array
    return word.split('')     // Después con split dividimos la palabra en caracteres individuales
               .filter(char => 'aeiouAEIOU'.includes(char)) // con filter conseguimos solo las vocales
               .join('');     // Une las vocales de nuevo en una cadena
  });
}

function doubleMatrix(array) { 
  return array.map(subArray => { //Aquí también usamos map porque tendremos que iterar sobre los elementos
    return subArray.map(num => num * 2); // Volvemos a usar map para poder duplicar cada número en el subarray
  });
}

module.exports = {
  multiplyBy10,
  shiftRight,
  onlyVowels,
  doubleMatrix
};
