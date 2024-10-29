document.addEventListener("DOMContentLoaded", () => {
    const service = new ExpenseService(); // Asegúrate de crear una instancia de ExpenseService
    const view = new ExpenseTrackerView();
    const controller = new ExpenseTrackerController(view, service); // Pasa la instancia de service al controlador
});