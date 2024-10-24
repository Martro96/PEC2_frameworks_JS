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
            const element = list.find((element) => element[key] === value);
            if (element) {
                resolve(element);
            } else {
                reject({ msg: "ERROR: Element Not Found" });
            }
        }, 2000);
    });
};

//Reemplazo de función que utiliza promesas por función async/await para buscarUsuario
async function buscarUsuario(list, { key, value }) { //marcamos la función como asíncrona lo que nos permite usar await dentro de ella
    try { //Envolvemos el código en un bloque try para manejar posibles errores 
        const usuario = await findOne(list, { key, value }); //Usamos await para esperar a que la promesa retornada por findOne se resuelva. El resultado se asigna a la variable usuario.
        console.log(`user: ${usuario.name}`); // Imprimimos el resultado o el error por consola.
    } catch (error) { // Si se rechaza la promesa, imprime el mensaje de error.
        console.log(error.msg); // Imprimimos el error por consola.
    }
}
// Llamada a la función buscarUsuario con sus correspondientes parametros.
console.log("findOne success");
buscarUsuario(users, { key: "name", value: "Carlos" }); 

console.log("findOne error");
buscarUsuario(users, { key: "name", value: "Fermin" }); 

/* Explicación línea por línea:

function findOne(list, { key, value }): 
findOne: Esta función no es asíncrona, pero retorna una promesa que se resuelve o se rechaza después de 2 segundos, dependiendo de si encuentra el elemento que cumple la condición (list.find).

async function buscarUsuario(list, { key, value }): 
async: Esta función es asíncrona, ya que utiliza `await` para esperar a que la promesa retornada por findOne se resuelva. 

try { ... } catch (error) { ... }: 
try: Envolvemos el código en un bloque try/catch para manejar posibles errores. 
await findOne: Usamos await para esperar a que la promesa retornada por findOne se resuelva. El resultado se asigna a la variable usuario. 

console.log y console.error: 
Imprimimos el resultado o el error según corresponda. 

Ventajas de usar async/await: 
- Sintaxis más limpia: El código se lee de forma más secuencial, como si fuera código síncrono. 
- Mejor manejo de errores: El bloque try/catch facilita la gestión de errores. 
- Mayor legibilidad: Elimina la necesidad de encadenar múltiples .then() y .catch(). 

En resumen: Hemos creado una nueva función buscarUsuario que es asíncrona y utiliza await para esperar a que findOne se resuelva. Dentro de buscarUsuario, utilizamos try/catch para manejar cualquier error que pueda ocurrir durante la búsqueda. El código resultante es más fácil de leer y entender en comparación con la versión que utiliza únicamente promesas.
*/