// Función findOne que busca un elemento en una lista basada en la clave y valor proporcionados.
// Además, recibe dos funciones (onSuccess y onError) que se ejecutarán según el resultado:
// - onSuccess se ejecuta si el elemento es encontrado.
// - onError se ejecuta si no se encuentra el elemento.
const findOne = (list, { key, value }, { onSuccess, onError }) => {

  // Utilizamos setTimeout para simular un retraso de 2 segundos antes de ejecutar la búsqueda.
setTimeout(() => {
    
    // Se busca en el array 'list' un elemento cuyo valor en la propiedad 'key' coincida con 'value'.
    const element = list.find(element => element[key] === value);
    
    // Si el elemento es encontrado, se ejecuta la función onSuccess, pasándole el elemento encontrado.
    // Si no se encuentra el elemento, se ejecuta la función onError, con un mensaje de error.
    element ? onSuccess(element) : onError({ msg: 'ERROR: Element Not Found' });

  }, 2000); // Retraso de 2 segundos antes de ejecutar el bloque de código.
};

// Función de callback onSuccess que recibe un objeto (usuario) y muestra el nombre del usuario.
const onSuccess = ({ name }) => console.log(`user: ${name}`);

// Función de callback onError que recibe un mensaje de error y lo imprime en la consola.
const onError = ({ msg }) => console.log(msg);

// Array de usuarios con sus respectivos roles.
const users = [
    {
    name: 'Carlos',
    rol: 'Teacher'
    },
    {
    name: 'Ana',
    rol: 'Boss'
    }
];

console.log('findOne success');
// Se realiza la búsqueda del usuario 'Carlos' en el array 'users'. Como existe, se ejecutará onSuccess.
findOne(users, { key: 'name', value: 'Carlos' }, { onSuccess, onError });

console.log('findOne error');
// Se realiza la búsqueda del usuario 'Fermin', que no existe en el array. Se ejecutará onError.
findOne(users, { key: 'name', value: 'Fermin' }, { onSuccess, onError });

/*
El resultado en la consola será:

findOne success
findOne error
// Tras 2 segundos:
user: Carlos
ERROR: Element Not Found
*/
