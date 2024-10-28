/**
 * @class Controller
 *
 * Links the user input and the view output.
 *
 * @param model
 * @param view
 */
class ExpenseTrackerController {
    constructor(view, service) {
        this.view = view; // La vista de la aplicación
        this.service = service; // El servicio que maneja los datos

        // Vincular eventos de la vista con los métodos del controlador
        this.service.bindExpensesListChanged(this.onExpensesListChanged);
        this.view.bindAddExpense(this.handleAddExpense);
        this.view.bindDeleteExpense(this.handleDeleteExpense);
        this.view.bindEditExpense(this.handleEditExpense);

        // Mostrar gastos iniciales
        this.onExpensesListChanged(this.service.expenses);
    }

    // Método para manejar la adición de un gasto
    handleAddExpense = (text, amount) => {
        this.service.addExpense(text, amount); // Llama al servicio para agregar un gasto
    };

    // Método para manejar la eliminación de un gasto
    handleDeleteExpense = (id) => {
        this.service.deleteExpense(id); // Llama al servicio para eliminar un gasto
    };

    // Método para manejar la edición de un gasto
    handleEditExpense = (id, newText, newAmount) => {
        this.service.editExpense(id, newText, newAmount); // Llama al servicio para editar un gasto
    };
 // Método para actualizar la vista cuando la lista de gastos cambia
    onExpensesListChanged = (expenses) => {
        this.view.displayExpenses(expenses); // Muestra los gastos en la vista

        // Calcular balances
        const totalIncome = expenses.reduce((total, expense) => {
            return expense.amount > 0 ? total + expense.amount : total;
        }, 0);

        const totalExpenses = expenses.reduce((total, expense) => {
            return expense.amount < 0 ? total + Math.abs(expense.amount) : total;
        }, 0);

        const balance = totalIncome - totalExpenses;

        // Actualizar la vista con los balances
        this.view.updateBalance(totalIncome, totalExpenses, balance);
    };
}

