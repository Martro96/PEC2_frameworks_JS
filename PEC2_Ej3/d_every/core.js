// Check to see if all elements in an array
// are even numbers.

function allEven(input) {
  return input.every(num => num % 2 === 0);
}

// Check to see if all elements in an array
// are of the same type.

function allSameType(input) {
  return input.every(item => typeof item === typeof input[0]);
}

// Check to see if every element in the matrix is
// an array and that every element in the array is
// greater than 0.

function positiveMatrix(input) {
  return input.every(subArray => 
    Array.isArray (subArray) && subArray.every(num => num > 0));

}

// Check that all items in an array are strings
// and that they all only contain the same vowels.

function allSameVowels(input) {
  return input;
}

module.exports = {
  allEven,
  allSameType,
  positiveMatrix,
  allSameVowels
};
