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

        /* Actualizar la vista con los gastos actuales
        this.view.displayExpenses(this.service.expenses, this.handleDeleteExpense, this.handleEditExpense);
        this.updateBalance();*/
    }

    // Método para manejar la adición de un gasto
    handleAddExpense = (text, amount) => {
        console.log("Adding expense:", text, amount); // Debugging, lo añado porque estoy teniendo problemas con la actualización de la lista al añadir un gasto
        this.service.addExpense(text, amount); // Llama al servicio para agregar un gasto
        /*this.updateBalance(); // Actualiza el balance después de agregar
        this.view.displayExpenses(this.service.expenses, this.handleDeleteExpense, this.handleEditExpense); // Muestra los gastos actualizados*/
    };
    // Método para manejar la eliminación de un gasto
    handleDeleteExpense = (id) => {
        this.service.deleteExpense(id); // Llama al servicio para eliminar un gasto
    };
    // Método para manejar la edición de un gasto
    handleEditExpense = (id, newText, newAmount) => {
        this.service.editExpense(id, newText, newAmount); // Llama al servicio para editar un gasto
    };

    // Actualizar la vista cada vez que la lista de gastos cambie
    onExpensesListChanged = (expenses) => {
        this.view.displayExpenses(expenses, this.handleDeleteExpense, this.handleEditExpense); // Muestra los gastos en la vista
        this.updateBalance(); // Actualiza el balance con la lista actualizada
    };

    updateBalance() {
        const totalIncome = this.service.expenses
            .filter(expense => expense.amount >= 0)
            .reduce((acc, expense) => acc + expense.amount, 0);
    
        const totalExpenses = this.service.expenses
            .filter(expense => expense.amount < 0)
            .reduce((acc, expense) => acc + Math.abs(expense.amount), 0);
    
        const balance = totalIncome - totalExpenses;
    
        // Actualiza los valores en la vista
        this.view.updateBalance(totalIncome, totalExpenses, balance);
    }
}
