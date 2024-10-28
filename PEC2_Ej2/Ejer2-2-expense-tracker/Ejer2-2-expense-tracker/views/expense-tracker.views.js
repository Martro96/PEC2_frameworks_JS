/**
 * @class ExpenseTrackerView
 *
 * Visual representation of the model.
 */
class ExpenseTrackerView {
constructor() {
    // Enlazamos los elementos del DOM a las propiedades de la clase para poder manejarlos más fácilmente
    this.balance = this.getElement("#balance"); // Muestra el balance total
    this.moneyPlus = this.getElement("#money-plus"); // Muestra los ingresos totales
    this.moneyMinus = this.getElement("#money-minus"); // Muestra los gastos totales
    this.expensesList = this.getElement("#list"); // Contenedor de la lista de gastos (ul)

    // Formulario para agregar nuevos gastos
    this.form = this.getElement("#form");
    this.inputText = this.getElement("#text"); // Campo de texto para el nombre/descripción del gasto
    this.inputAmount = this.getElement("#amount"); // Campo de número para la cantidad del gasto
    this.submitButton = this.getElement(".btn"); // Botón para agregar el gasto
}

// Método para obtener elementos del DOM de forma rápida y sencilla
getElement(selector) {
    return document.querySelector(selector); // Usamos document.querySelector para seleccionar elementos por su selector CSS
}

// Método para crear nuevos elementos HTML y asignarles una clase, si es necesario
createElement(tag, className) {
    const element = document.createElement(tag); // Creamos el elemento HTML especificado (por ejemplo, un li o un button)
    
    if (className) element.classList.add(className); // Si se pasa un nombre de clase, lo añadimos al elemento
    return element; // Devolvemos el nuevo elemento creado
}

// Método para mostrar la lista de gastos en la interfaz de usuario
displayExpenses(expenses, deleteHandler, editHandler) {
    // Limpiamos la lista de gastos antes de actualizarla, eliminando todos los elementos hijos del ul
    while (this.expensesList.firstChild) {
    this.expensesList.removeChild(this.expensesList.firstChild);
    }

    // Si no hay gastos en la lista, mostramos un mensaje predeterminado
    if (expenses.length === 0) {
    const p = this.createElement("p"); // Creamos un párrafo para el mensaje
    p.textContent = "Your accounts are at zero! Do you want to add an expense or an income?"; // Mensaje para cuando no haya gastos
    this.expensesList.append(p); // Añadimos el párrafo al contenedor de la lista de gastos
    } else {
    // Si ya hay gastos, los recorremos y los mostramos en la lista
    expenses.forEach(expense => {
        const li = this.createElement("li"); // Creamos un nuevo li para cada gasto
        li.id = expense.id; // Asignamos el id del gasto al li para identificarlo

        // Crear span para mostrar el texto o descripción del gasto
        const textSpan = this.createElement("span"); // Creamos el span que contendrá el texto del gasto
        textSpan.textContent = expense.text; // Insertamos el texto del gasto
        textSpan.contentEditable = true; // Hacemos que el texto sea editable para que el usuario pueda modificarlo directamente

        // Crear span para mostrar la cantidad del gasto
        const amountSpan = this.createElement("span"); // Creamos el span para la cantidad
        // Si la cantidad es positiva, agregamos un "+" antes del valor; si es negativa, se muestra tal cual
        amountSpan.textContent = expense.amount >= 0 ? `+${expense.amount}` : expense.amount;  
        amountSpan.contentEditable = true; // Permitimos que la cantidad también sea editable

        // Añadimos una clase dependiendo de si es un ingreso o un gasto
        if (expense.amount >= 0) {
        amountSpan.classList.add("plus"); // Si la cantidad es positiva, le añadimos la clase "plus"
        } else {
        amountSpan.classList.add("minus"); // Si la cantidad es negativa, le añadimos la clase "minus"
        }

        // Crear botón para eliminar el gasto
        const deleteButton = this.createElement("button", "delete"); // Creamos el botón "Delete" con la clase "delete"
        deleteButton.textContent = "Delete"; // Añadimos el texto del botón

        //Eventos: acciones que el usuario podrá hacer:

        // Evento para eliminar el gasto
        deleteButton.addEventListener("click", () => { //evento clic
        const id = expense.id; // Tomamos el id del gasto que queremos eliminar
        deleteHandler(id); // Llamamos al controlador para eliminar el gasto
        });

        // Evento para editar el texto del gasto (nombre/descripción)
        textSpan.addEventListener("focusout", () => { //Usamos el evento focusout en el span del texto. Este evento se dispara cuando el usuario deja de editar.
        const newText = textSpan.textContent; // Obtener el nuevo texto después de la edición
        console.log("Editing Text:", newText); // Debugging
        editHandler(expense.id, newText, expense.amount); // Llamar al controlador para actualizar el texto
        });

        // Evento para editar la cantidad del gasto
        amountSpan.addEventListener("focusout", () => { //Usamos el evento focusout en el span de la cantidad. 
        const newAmount = parseFloat(amountSpan.textContent); // Obtener el nuevo monto después de la edición
        console.log("Editing Amount:", newAmount); // Debugging
        // Si es un número válido, llamamos al controlador para actualizar la cantidad
        if (!isNaN(newAmount)) {
            editHandler(expense.id, expense.text, newAmount); // Actualizar la cantidad en el controlador
        }
        });

        // Añadir los spans (texto y cantidad) y el botón al li
        li.append(textSpan, amountSpan, deleteButton);

        // Añadir el li (con los gastos y el botón de eliminar) a la lista de gastos
        this.expensesList.append(li);
    });
    }
}
//Método para actualizar los balances
updateBalance(totalIncome, totalExpenses, balance) {
    this.balance.textContent = `Balance: ${balance}`; // Actualiza el balance
    this.moneyPlus.textContent = `Ingresos: ${totalIncome}`; // Actualiza los ingresos totales
    this.moneyMinus.textContent = `Gastos: ${totalExpenses}`; // Actualiza los gastos totales
}
}
