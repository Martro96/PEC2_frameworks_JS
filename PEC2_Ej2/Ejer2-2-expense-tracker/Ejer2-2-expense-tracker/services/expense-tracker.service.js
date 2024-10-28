/**
 * @class ExpenseService
 *
 * Gestiona los datos de los gastos.
 */
class ExpenseService {
constructor() {
    // Inicializa la lista de gastos, ya sea desde localStorage o con un array vacío
    this.expenses = (JSON.parse(localStorage.getItem("expenses")) || []).map(
    expense => new Expense(expense) // Recrea los objetos Expense
    );
}

// Vincula una función para ser llamada cuando la lista de gastos cambie
bindExpensesListChanged(callback) {
    this.onExpensesListChanged = callback;
}

// Método interno para actualizar el localStorage y ejecutar el callback
_commit(expenses) {
    this.onExpensesListChanged(expenses); // Ejecuta la función de callback vinculada
    localStorage.setItem("expenses", JSON.stringify(expenses)); // Guarda en localStorage
}

// Agrega un nuevo gasto y actualiza el estado
addExpense(text, amount) {
    this.expenses.push(new Expense({ text, amount, paid: false })); // Crea el gasto
    this._commit(this.expenses); // Guarda los cambios
}

// Edita un gasto existente por id
editExpense(id, updatedText, updatedAmount) {
    this.expenses = this.expenses.map(expense =>
    expense.id === id
        ? new Expense({
            ...expense, // Mantiene las propiedades del gasto original
            text: updatedText, // Actualiza el texto (descripción)
            amount: updatedAmount // Actualiza la cantidad
        })
        : expense // Mantiene el gasto sin cambios si no coincide el id
    );

    this._commit(this.expenses); // Guarda los cambios
}

// Elimina un gasto por id
deleteExpense(id) {
    this.expenses = this.expenses.filter(expense => expense.id !== id); // Filtra el gasto

    this._commit(this.expenses); // Guarda los cambios
}

// Cambia el estado de pago de un gasto por id
togglePaid(id) {
    this.expenses = this.expenses.map(expense =>
    expense.id === id
        ? new Expense({ ...expense, paid: !expense.paid }) // Invierte el estado de pago
        : expense
    );

    this._commit(this.expenses); // Guarda los cambios
}
}
