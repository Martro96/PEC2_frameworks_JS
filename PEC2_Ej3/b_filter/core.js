function onlyEven(array) {
  return array.filter(num => num % 2 === 0);
}

function onlyOneWord(array) {
  return array.filter(word => !word.includes(" "));
}

function positiveRowsOnly(array) {
  return array.filter(subArray => subArray.every(num => num > 0));
  }

function allSameVowels(array) {
  return array.filter(word => {    // Filtramos el array por palabras
    //Creamos una constante para las vocales, filtrando la palabra separando cada caracter e indicando que cada una de estas letras sea una vocal
    const vowels = word.split('').filter(char => 'aeiouAEIOU'.includes(char));

    // Priemro comprobamos que haya una vocal, y luego comprobamos que si hay más vocales, las siguientes sean iguales a la primera (posición [0] del array de letras)
    return vowels.length > 0 && vowels.every(vowel => vowel === vowels[0]);
  });
}

module.exports = {
  onlyEven,
  onlyOneWord,
  positiveRowsOnly,
  allSameVowels
};
