// Esto se mantiene igual
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
// Esto se mantiene igual

const findOne = (list, { key, value }) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const element = list.find((element) => element[key] === value);
            if (element) {
                resolve(element);
            } else {
                reject({ msg: "ERROR: Element Not Found" });
            }
        }, 2000);
    });
};

// Esto se mantiene igual
async function buscarUsuario(list, { key, value }) { //marcamos la función como asíncrona lo que nos permite usar await dentro de ella
    try { //Envolvemos el código en un bloque try para manejar posibles errores 
        const usuario = await findOne(list, { key, value }); //Usamos await para esperar a que la promesa retornada por findOne se resuelva. El resultado se asigna a la variable usuario.
        console.log(`user: ${usuario.name}`); // Imprimimos el resultado o el error por consola.
    } catch (error) { // Si se rechaza la promesa, imprime el mensaje de error.
        console.log(error.msg); // Imprimimos el error por consola.
    }
}
// Aquí es donde comenzamos los cambios para ejecutar en paralelo
async function buscarUsuariosEnParalelo(users, nombres) { // Creamos la función que nos permitirá buscar múltiples usuarios en paralelo, tomando el array de usuarios (users) y un array de nombres (nombres) a buscar.
    
    const promises = nombres.map(nombre => buscarUsuario(users, { key: "name", value: nombre }));// Creamos un array de promesas llamando a buscarUsuario para cada nombre en el array nombres.
    // La función map() aplica la función proporcionada a cada elemento de nombres, creando un nuevo array donde cada elemento es el resultado de buscarUsuario, que busca en el array users si hay un usuario
    // con el nombre correspondiente.

    const results = await Promise.allSettled(promises);// Para manejar los resultados de las promesas, usamos Promise.allSettled() para esperar a que todas las promesas en el array promises se completen.
    // La constante results contendrá un array de objetos que describen el estado (fulfilled o rejected) de cada promesa.


// Imprime el resultado de cada promesa, mostrando su estado y valor (o razón de rechazo).
console.log(results); 

// Llamada a la función buscarUsuariosEnParalelo con un array de nombres a buscar.
buscarUsuariosEnParalelo(users, ["Carlos", "Fermin", "Ana"]);}