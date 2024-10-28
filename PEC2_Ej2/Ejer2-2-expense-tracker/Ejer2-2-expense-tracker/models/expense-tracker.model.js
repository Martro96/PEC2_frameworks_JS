// Clase Expense que representa un gasto
class Expense {
    constructor({ id, text, amount, paid }) {
        this.id = id;          // Identificador del gasto
        this.text = text;      // Descripción del gasto
        this.amount = amount;  // Cantidad del gasto
        this.paid = paid;      // Estado de pago
    }
}

class Model {
    constructor() {
        // Un array de objetos que representan los gastos
        this.expenses = [
            new Expense({ id: 1, text: 'Comida en restaurante', amount: 30, paid: false }),
            new Expense({ id: 2, text: 'Compra de supermercado', amount: 50, paid: true }),
        ];
    }

    // Método para agregar un nuevo gasto
    addExpense(expenseText, amount) {
        const expense = new Expense({
            id: this.expenses.length > 0 ? this.expenses[this.expenses.length - 1].id + 1 : 1,
            text: expenseText,
            amount: amount,
            paid: false,
        });

        this.expenses.push(expense);
    }

    // Método para editar un gasto existente por su id
    editExpense(id, updatedText, updatedAmount) {
        // Usamos .map() para modificar el array
        this.expenses = this.expenses.map((expense) =>
            expense.id === id 
                ? new Expense({ id: expense.id, text: updatedText, amount: updatedAmount, paid: expense.paid }) // Crea una nueva instancia de Expense
                : expense // Si el id no coincide, el objeto se mantiene igual
        );
    }

    // Método para eliminar un gasto por su id
    deleteExpense(id) {
        this.expenses = this.expenses.filter((expense) => expense.id !== id);
    }

    // Método para cambiar el estado de pago de un gasto por su id
    togglePaid(id) {
        this.expenses = this.expenses.map((expense) =>
            expense.id === id 
                ? new Expense({ id: expense.id, text: expense.text, amount: expense.amount, paid: !expense.paid }) // Invierte el estado de pago
                : expense // Si el id no coincide, el objeto se mantiene igual
        );
    }
}