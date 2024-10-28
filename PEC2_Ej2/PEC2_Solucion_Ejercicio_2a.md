###### a. (0.50 puntos) Observa que se han creado funciones handle en el fichero controlador (todo.controller.js), las cuales son pasadas como parámetro. Esto es debido al problema con el cambio de contexto (this) que existe en JavaScript. Ahora mismo si no tienes muy claro que está sucediendo, revisa qué hacen las “fat-arrow” de ES6 sobre el objeto this, y prueba a cambiar el código para comprender qué está sucediendo cuando se modifica la siguiente línea:

this.view.bindAddTodo(this.handleAddTodo);
###### Por esta:
this.view.bindAddTodo(this.service.addTodo);

**¿Por qué es el valor de this es undefined?**

this devuelve undefined al cambiar de this.handleAddTodo (una fat-arrow function, como se describe en la línea 29 de todo.controller.js) a this.service.addTodo (una función normal). Esto sucede porque las fat-arrow functions heredan el contexto de this del lugar donde se definen, en este caso, la clase TodoController. Al usar una función normal como this.service.addTodo, el contexto de this depende de cómo se llame la función, y al ser invocada desde la vista, this no apunta al servicio ni al controlador, sino que queda como undefined. Por lo tanto, no puede acceder a las propiedades de TodoController fuera del contexto correcto.

Esto garantiza que las funciones flecha mantengan el valor de this vinculado al controlador, mientras que las funciones normales pueden perder este vínculo si se usan fuera de la clase.

###### A continuación, lo que se pide es que dentro de la carpeta PEC2_Ej2, crees una subcarpeta Ejer2-2-expense-tracker donde vas a ir modificando el código y estructura del proyecto para convertir un simple proyecto con html/css/js en una estructura MVC haciendo uso del potencial de ES6 y siguiendo el código de ejemplo (TODO) que se ha proporcionado.

###### En primer lugar, debes generar la estructura de directorios de nuestro proyecto (modelos-vistas-servicios-controladores) e ir pensando donde ubicar el contenido de los diferentes ficheros.

He creado esta estructura:
PEC2_Ej2
└── Ejer2-2-expense-tracker
    ├── controllers
    │   └── expense-tracker.controller.js
    ├── models
    │   └── expense-tracker.model.js
    ├── services
    │   └── expense-tracker.service.js
    ├── views
    │   └── expense-tracker.views.js
    └── app.js

###### b. (0.50 puntos) Construye las clases relativas a modelos, controladores, servicios, vistas y lanzador de la aplicación desde donde iras desarrollando la aplicación. En este punto sólo debes crear la estructura de ficheros que modelan nuestro problema. Es decir, organizar las clases relativas a modelos (expense.model.js), controladores (expense.controller.js), servicios (expense.service.js) y lanzadora (app.js).

Como comentaba anteriormente, la estructura de ficheros creada hasta el momento es: 
PEC2_Ej2
└── Ejer2-2-expense-tracker
    ├── controllers
    │   └── expense-tracker.controller.js
    ├── models
    │   └── expense-tracker.model.js
    ├── services
    │   └── expense-tracker.service.js
    ├── views
    │   └── expense-tracker.views.js
    └── app.js


###### c. (0.50 puntos) Construye la clase modelo (anémico) que sea necesaria para esta aplicación.

He creado la clase modelo en el fichero `expense-tracker.model.js`, siguiendo la lógica CRUD (Crear, Leer, Actualizar, Eliminar) para la gestión de gastos:

- **addExpense**: Agrega un nuevo gasto al array de gastos, con su descripción, cantidad y estado de pago (por defecto, no pagado).
- **editExpense**: Edita el texto (descripción) y la cantidad de un gasto en particular, identificado por su `id`.
- **deleteExpense**: Elimina un gasto del array, filtrando por su `id`.
- **togglePaid**: Cambia el estado de pago de un gasto (pagado/no pagado), también basado en su `id`.

Para la implementación:
- Uso `.map()` para recorrer el array y modificar los elementos, creando nuevos objetos con los cambios correspondientes.
- Uso `.filter()` para eliminar los elementos que no cumplen una condición, en este caso, eliminar un gasto por su `id`.


###### d. (1 punto) Construye la clase servicio que es la encargada de realizar todas las operaciones sobre una estructura de datos (donde se almacenará la información de todos los gastos).

He creado la clase  `ExpenseService` en el archivo correspondiente, que gestiona las operaciones sobre la estructura de datos que almacena la información de todos los gastos, siguiendo la lógica de almacenamiento y manipulación de datos:

- **addExpense**: Agrega un nuevo gasto al array de gastos, creando un objeto `Expense` con su descripción, cantidad y estado de pago (por defecto, no pagado).
- **editExpense**: Edita un gasto específico, identificado por su `id`, actualizando su texto (descripción) y cantidad.
- **deleteExpense**: Elimina un gasto del array filtrando por su `id`.
- **togglePaid**: Cambia el estado de pago de un gasto (pagado/no pagado), basado en su `id`.

Además, incluye funcionalidades para gestionar el almacenamiento persistente:

- **bindExpensesListChanged**: Permite vincular una función de callback que se llama cada vez que la lista de gastos cambia, lo que facilita la actualización de la interfaz de usuario.
- **_commit**: Un método interno que actualiza `localStorage` con la lista de gastos actual y ejecuta el callback vinculado.

Para la implementación:

- Utilizo `.map()` para recorrer y modificar el array de gastos, creando nuevos objetos `Expense` según sea necesario.
- Uso `.filter()` para eliminar gastos que no cumplen con la condición de ser el `id` buscado.


###### e. (0.50 puntos) Construye la clase vista que controlará todas las operaciones relativas a la vista.

La clase ExpenseTrackerView se encarga de manejar la interfaz de usuario de nuestra aplicación de gestión de gastos. Sus principales funciones son:
- **Renderizado:**  Muestra la lista de gastos en la interfaz, actualizando la lista cada vez que se añaden, eliminan o modifican gastos.
- **Gestionar eventos:** Responde a las acciones del usuario, como hacer clic en un botón, editar un campo, etc.
- **Actualización:**  Modifica los elementos de la interfaz para reflejar los cambios en los datos.

**Características clave:**

- **`displayExpenses`:**  Muestra la lista completa de gastos, incluyendo la posibilidad de editar y eliminar gastos.
- **`createElement`**: Crea nuevos elementos HTML (como ` <li>, <span>, <button>`) para la interfaz.
- **`getElement`**: Obtiene referencias a elementos HTML existentes en el DOM.
- **Manejo de eventos:**  Utiliza addEventListener para escuchar eventos del usuario y actualizar la vista en consecuencia.

En resumen, esta clase es el puente entre la lógica de la aplicación (gestionada por otras clases, como el modelo) y la interfaz que ve el usuario. Se encarga de presentar los datos de forma clara y de permitir al usuario interactuar con la aplicación.

###### f. (0.50 puntos) Construye el controlador que es el encargado de poner en comunicación la vista con el servicio, en este proyecto.

He creado la clase `ExpenseTrackerController` en el archivo correspondiente, que actúa como intermediario entre la vista y el servicio de gastos. Su objetivo es gestionar las interacciones del usuario y mantener la sincronización entre la interfaz y los datos.

- **Constructor**: Inicializa el controlador, vincula los métodos de la vista con las funciones del controlador y muestra la lista de gastos inicial.
- **handleAddExpense**: Gestiona la adición de un nuevo gasto, llamando al método `addExpense` del servicio para actualizar la estructura de datos.
- **handleDeleteExpense**: Maneja la eliminación de un gasto específico, invocando `deleteExpense` en el servicio.
- **handleEditExpense**: Permite editar un gasto existente mediante la llamada a `editExpense` del servicio.
- **onExpensesListChanged**: Se ejecuta cada vez que cambia la lista de gastos, actualizando la vista con los nuevos datos y llamando a `updateBalances` para reflejar el balance actual.
- **updateBalances**: Calcula los totales de ingresos y gastos usando `reduce` y actualiza los elementos de la vista correspondientes.

El controlador asegura que las operaciones de adición, edición y eliminación de gastos se reflejen inmediatamente en la interfaz de usuario. Además, permite que la vista reaccione a los cambios en los datos.


###### g. (0.50 puntos) El proyecto entregado no tiene implementado la actualización de un gasto concreto. Añade esta nueva funcionalidad.

He implementado la funcionalidad de actualización de un gasto concreto al hacer que los elementos de la lista de gastos sean editables. En la interfaz de usuario, tanto la descripción del gasto como la cantidad son ahora campos editables, lo que permite a los usuarios modificar directamente la información de cada gasto.

Los eventos asociados a estos campos se encargan de llamar al método correspondiente en el servicio ExpenseService, permitiendo que cualquier cambio realizado se refleje inmediatamente en el almacenamiento persistente. Esto asegura que la actualización de los gastos se maneje de manera efectiva sin necesidad de añadir un formulario adicional para esta acción.