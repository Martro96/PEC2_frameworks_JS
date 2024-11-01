const data = require('./data'); //si no ponía esta línea no podía pasar ningún test

function entryCalculator(entrants) {
  // Si no se pasan entrants o es un objeto vacío, devolvemos 0
  if (!entrants || Object.keys(entrants).length === 0) return 0;

  // Calcular el total usando los precios en data.prices
  return Object.keys(entrants).reduce((total, tipo) => { //total sería el acumulador y entrant el tipo de entrada, que tiene un precio correspondiente según su tipo
    // Obtenemos el tipo de entrada (Adult, Child, Senior) y su cantidad
    return total + (data.prices[tipo] * entrants[tipo]);
  }, 0); // Inicializamos total en 0 para que al sumarlo a total nos de el resultado esperado
}

function schedule(dayName) {
  const zoo = {
    // Horarios del zoológico por día, los ponemos para poder llamarlos después de la forma amigable
    hours: {
      Tuesday: 'Open from 8am until 6pm',
      Wednesday: 'Open from 8am until 6pm',
      Thursday: 'Open from 10am until 8pm',
      Friday: 'Open from 10am until 8pm',
      Saturday: 'Open from 8am until 10pm',
      Sunday: 'Open from 8am until 8pm',
      Monday: 'CLOSED'
    },

    // Método para obtener el horario
    schedule(dayName) {
      // Si no se proporciona un día, devolver el horario completo
      if (!dayName) {
        return this.hours;
      }

      // Usamos switch para devolver solo el horario para el día indicado. Esto es más fácil que usar los métodos. 
      switch (dayName) {
        case 'Tuesday':
        case 'Wednesday':
        case 'Thursday':
        case 'Friday':
        case 'Saturday':
        case 'Sunday':
          return { [dayName]: this.hours[dayName] };
        case 'Monday':
          return { [dayName]: 'CLOSED' };
        default:
          return { [dayName]: 'Invalid day' }; // Mensaje para días inválidos
      }
    }
  };

  // Llamar al método schedule del objeto zoo
  return zoo.schedule(dayName);
}


function animalCount(species) {  
  // Si no se pasa ninguna especie, devolveríamos un objeto con toda la información de cantidad de cada especie
  if (!species) {
    return data.animals.reduce((acc, animal) => { 
      acc[animal.name] = animal.residents.length;
      return acc;
    }, {});
  }

  // Si se pasa una especie específica, usamos filter para buscarla y devolver la cantidad de residentes
  const filteredSpecies = data.animals.filter(animal => animal.name === species);
  return filteredSpecies.length > 0 ? filteredSpecies[0].residents.length : 0;
  }


function animalMap(options) {
  // Inicializamos el mapa de ubicaciones, las dejamos vacías para irlas rellenando
  const map = {
    NE: [],
    NW: [],
    SE: [],
    SW: []
  };

  data.animals.forEach(animal => { //accedemos al array de animales de data y, para poder recorrerlo usamos un forEach

    //Yo aquí las opciones me las imagino como que se ha activado un filtro en la vista de la web del zoo:

    if (!options) { //Si no hay opciones marcadas, devolvemos el mapa de animales total y sus ubicaciones
      map[animal.location].push(animal.name);
    } else { //Con el else manejaremos las opciones sí seleccionadas (sexo y nombre de los animales)
      
      // Para agilizar y llamarlo más rápidamente, creamos el objeto residents para hacerle consultas después
      let residents = animal.residents;

      //Ahora bien, en las pruebas se pide que siempre se den los nombres de los animales según los filtros:
    
      // Si la opción sex está definida, filtramos los nombres por sexo
      if (options.sex) {
        residents = residents.filter(resident => resident.sex === options.sex);
      }

      // Si includeNames está definido, incluimos los nombres de los residentes en el array
      if (options.includeNames) {
        const names = residents.map(resident => resident.name); //con .map obtenemos un nuevo array con los nombres de los animales
        map[animal.location].push({ [animal.name]: names });
      } else {
        // Si no hay includeNames, solo añadimos el nombre de la especie
        map[animal.location].push(animal.name);
      }
    }
  });

  return map;
}


function animalPopularity(rating) {
    // Creo el objeto popularidad para almacenar los animales agrupados por popularidad
  const popularidad = {
    2: [], 
    3: [],
    4: [],
    5: []
  };
  
  //accedemos al array de animales de data y, para poder recorrerlo usamos un forEach
  data.animals.forEach(animal => { //para cada animal, sacamos su popularidad y añadimos el nombre al objeto con .push
    popularidad[animal.popularity].push(animal.name);
  });

  // Si no se pasa una calificación, devolvemos el objeto completo
  if (!rating) return popularidad;

  // Si se pasa una calificación específica, devolvemos solo las especies con esa calificación
  return popularidad[rating] || [];
}

function animalsByIds(ids) {
  if (!ids || ids.length === 0) return []; //Si no se proporciona un id o este es null, se devuelve el array [] vacío. 
  return data.animals.filter(animal => ids.includes(animal.id));   // Aquí filtramos el array data.animals para devolver un array con los animales cuyo ID coincide con alguno de los valores en ids.

}

function animalByName(animalName) {
  // Si no se pasa un nombre, devolvemos un objeto vacío
  if (!animalName) return {}; // Comprobamos si animalName no está definido y, de ser así, retornamos un objeto vacío.

  // Buscamos el animal que tiene residentes con el nombre proporcionado
  const animal = data.animals.find(animal => 
    animal.residents.some(res => res.name === animalName) // Usamos find para buscar el primer animal que tiene un residente con el nombre dado.Esto lo sabemos con some
  );

  // Si encontramos un animal, devolvemos sus datos junto con la especie
  return animal ? { 
    ...animal.residents.find(res => res.name === animalName), // Usamos el operador de propagación para incluir las propiedades del residente encontrado.Se hace como una copia de sus características
    species: animal.name // Añadimos la propiedad species con el nombre del animal.
  } : {}; // Si no encontramos el animal, retornamos un objeto vacío.
}
function employeesByIds(ids) {
  // Comprobamos si no hay IDs proporcionados y, en ese caso, retornamos un array vacío
  if (!ids || ids.length === 0) return []; // Verificamos si ids no está definido o su longitud es cero.

  // Filtramos los empleados que tienen IDs en el array proporcionado
  return data.employees.filter(employee => 
    ids.includes(employee.id) // Filtramos los empleados cuyos IDs están en el array ids.
  );
}

function employeeByName(employeeName) {
  // Si no se pasa un nombre, devolvemos un objeto vacío
  if (!employeeName) return {};

  // Buscamos el primer empleado cuyo nombre o apellido coincide con el proporcionado.
  return (
    data.employees.find(employee => // Usamos find para buscar en el array de empleados.
      employee.firstName === employeeName || employee.lastName === employeeName // Verificamos si el nombre o apellido coincide.
    ) || {} // Si no encontramos ningún empleado, retornamos un objeto vacío.
  );
}

function managersForEmployee(idOrName) {
  // Encontramos al empleado por id o por nombre
  const employee = data.employees.find( // Usamos find para localizar al empleado. Esto me lo imagino como cuando con meter cualquier valor que esté en su ficha, te sale a quien buscas en un bbdd
    emp =>
      emp.id === idOrName || // Comparamos el ID del empleado con idOrName.
      emp.firstName === idOrName || // Comparamos el primer nombre del empleado.
      emp.lastName === idOrName // Comparamos el apellido del empleado.
  );

  // Si no encontramos el empleado, devolvemos un objeto vacío
  if (!employee) return {}; // Si employee no está definido, retornamos un objeto vacío.

  // Creamos un array con los nombres completos de los managers del empleado
  const managerNames = employee.managers.map(managerId => { // Usamos map para transformar los IDs de los managers en sus nombres completos.
    const manager = data.employees.find(emp => emp.id === managerId); // Buscamos el manager correspondiente.
    return `${manager.firstName} ${manager.lastName}`; // Retornamos el nombre completo del manager.
  });

  // Retornamos el empleado con sus managers
  return {
    id: employee.id, // Retornamos el ID del empleado.
    firstName: employee.firstName, // Retornamos el primer nombre del empleado.
    lastName: employee.lastName, // Retornamos el apellido del empleado.
    managers: managerNames, // Incluimos el array de nombres de los managers.
    responsibleFor: employee.responsibleFor // Retornamos los IDs de los animales de los que es responsable.
  };
}

function employeeCoverage(idOrName) {
  // Definimos una función interna para obtener la cobertura de un empleado
  const getEmployeeCoverage = employee => {
    // Mapeamos los IDs de los animales que tiene a su cargo al nombre de cada especie
    const animals = employee.responsibleFor.map(id => // Usamos map para transformar los IDs de animales en nombres.
      data.animals.find(animal => animal.id === id).name // Buscamos el nombre del animal correspondiente a cada ID.
    );
    return { [`${employee.firstName} ${employee.lastName}`]: animals }; // Retornamos un objeto con el nombre completo del empleado y los nombres de los animales.
  };

  if (!idOrName) {
    // Si no se pasa id o nombre, devolvemos todos los empleados y sus coberturas
    const listaCompleta = {};
    data.employees.forEach(emp => {
      const coverage = getEmployeeCoverage(emp);
      for (const key in coverage) {
        listaCompleta[key] = coverage[key]; // Añadimos las propiedades de coverage al objeto listaCompleta
      }
    });
    return listaCompleta; // Retornamos el objeto combinado
  }

  // Si se pasa id o nombre, buscamos el empleado y devolvemos su cobertura
  const employee = data.employees.find(
    emp =>
      emp.id === idOrName ||
      emp.firstName === idOrName ||
      emp.lastName === idOrName
  );

  return employee ? getEmployeeCoverage(employee) : {}; // Si encontramos al empleado, retornamos su cobertura; de lo contrario, retornamos un objeto vacío.
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalPopularity,
  animalsByIds,
  animalByName,
  employeesByIds,
  employeeByName,
  managersForEmployee,
  employeeCoverage
};
