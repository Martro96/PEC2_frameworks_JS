/**
 * @class ExpenseService
 *
 * Gestiona los datos de los gastos.
 */
class ExpenseService {
    constructor() {
        this.expenses = (JSON.parse(localStorage.getItem("expenses")) || []).map(
            expense => new Expense(expense)
        );
    }

    bindExpensesListChanged(callback) {
        this.onExpensesListChanged = callback;
    }

    _commit(expenses) {
        this.onExpensesListChanged(expenses); // Ejecuta el callback para actualizar la vista
        localStorage.setItem("expenses", JSON.stringify(expenses)); // Guarda en localStorage
    }

    addExpense(text, amount) {
        this.expenses.push(new Expense({ text, amount, paid: false }));
        this._commit(this.expenses); // Actualiza localStorage y la vista
    }

    editExpense(id, updatedText, updatedAmount) {
        this.expenses = this.expenses.map(expense =>
            expense.id === id
                ? new Expense({ ...expense, text: updatedText, amount: updatedAmount })
                : expense
        );
        this._commit(this.expenses); // Actualiza localStorage y la vista
    }

    deleteExpense(id) {
        this.expenses = this.expenses.filter(expense => expense.id !== id);
        this._commit(this.expenses); // Actualiza localStorage y la vista
    }

    togglePaid(id) {
        this.expenses = this.expenses.map(expense =>
            expense.id === id ? new Expense({ ...expense, paid: !expense.paid }) : expense
        );
        this._commit(this.expenses); // Actualiza localStorage y la vista
    }
}