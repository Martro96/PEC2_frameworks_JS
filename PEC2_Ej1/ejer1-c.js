// Por buenas prácticas, reordenamos los bloques y colocamos primero el array de usuarios con sus respectivos roles.
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
    


const findOne = (list, { key, value }) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        const element = list.find(element => element[key] === value);
        if (element) {
        resolve(element); 
        } else {
        reject({ msg: 'ERROR: Element Not Found' }); 
        }
        }, 2000); 
    });
};

//creamos una función asíncrona para ejecutar findOne cuando tengamos los datos
async function executeFind() {
    try {
        const result = await findOne(users, { key: 'name', value: 'Carlos' });
        console.log(`user: ${result.name}`);
    } catch (error) {
        console.log(error);
    }   
}

//Creamos una segunda función asíncrona para manejar el error
async function executeFindError() {
    try {
        const result = await findOne(users, { key: 'name', value: 'Fermin' });
        console.log(`user: ${result.name}`);
    } catch (error) {
        console.log(error);
    }   
}


// Ahora modificamos la llamada a executeFind para que imprima el resultado
console.log('findOne success');
executeFind(); // Solo llamamos a executeFind sin argumentos.

console.log('findOne error');
executeFindError(); // Llamamos a executeFindError para manejar el error.

/*
El resultado en la consola será:

findOne success
findOne error
// Tras 2 segundos:
user: Carlos
ERROR: Element Not Found
*/
