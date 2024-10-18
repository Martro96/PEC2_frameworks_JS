// Función findOne que busca un elemento en una lista basada en la clave y valor proporcionados.
// Ahora lo que hacemos es cambiar las callbacks onSuccess y onError por una promesa, que podrá ser resuelta con éxito o no. (resolve, reject)
const findOne = (list, { key, value }) => {
    return new Promise((resolve, reject) => { //Aquí añadimos la promesa
        setTimeout(() => {
        const element = list.find(element => element[key] === value);
        if (element) {
          resolve(element); // Resolvemos con el elemento encontrado.
        } else {
          reject({ msg: 'ERROR: Element Not Found' }); // Rechazamos con un mensaje de error.
        }
      }, 2000); // Espera de 2 segundos.
    });
};

// Array de usuarios con sus respectivos roles.
const users = [
{
    name: "Carlos",
    rol: "Teacher",
},
{
    name: "Ana",
    rol: "Boss",
},
];

// Ahora modificamos la llamada a findOne para que imprima el resultado correspondiente en caso de ser correcto o de haber error. 
console.log('findOne success');
findOne(users, { key: 'name', value: 'Carlos' })
.then(({ name }) => console.log(`user: ${name}`)) // Si se resuelve la promesa, imprime el nombre del usuario.
.catch(({ msg }) => console.log(msg)); // Si se rechaza la promesa, imprime el mensaje de error.

console.log('findOne error');
findOne(users, { key: 'name', value: 'Fermin' })
.then(({ name }) => console.log(`user: ${name}`)) // Si se resuelve la promesa, imprime el nombre del usuario.
.catch(({ msg }) => console.log(msg)); // Si se rechaza la promesa, imprime el mensaje de error.

/*
El resultado en la consola será:

findOne success
findOne error
// Tras 2 segundos:
user: Carlos
ERROR: Element Not Found
*/
