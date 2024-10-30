let totalAmount = 0;
let expenses = [];
let editingIndex = null;  // Índice del gasto en edición

// Función para agregar o actualizar gasto
function addOrUpdateExpense() {
    const name = document.getElementById("expense-name").value;
    const amount = parseFloat(document.getElementById("expense-amount").value);

    // Validación de entrada
    if (name === "" || isNaN(amount) || amount <= 0) {
        alert("Por favor ingresa un nombre válido y un monto mayor a cero.");
        return;
    }

    if (editingIndex === null) {
        // Agregar nuevo gasto si no estamos en modo edición
        expenses.push({ name, amount });
        totalAmount += amount;
    } else {
        // Actualizar el gasto en edición
        const oldAmount = expenses[editingIndex].amount;
        expenses[editingIndex] = { name, amount };
        
        // Actualizamos el total
        totalAmount = totalAmount - oldAmount + amount;

        // Resetear el índice de edición
        editingIndex = null;
    }

    // Actualizar la lista y el total en la interfaz
    updateExpenseList();
    document.getElementById("total-amount").textContent = totalAmount.toFixed(2);

    // Limpiar los campos de entrada
    document.getElementById("expense-name").value = "";
    document.getElementById("expense-amount").value = "";
}

// Función para actualizar la lista de gastos en la interfaz
function updateExpenseList() {
    const expenseList = document.getElementById("expense-list");
    expenseList.innerHTML = "";  // Limpiar lista existente

    expenses.forEach((expense, index) => {
        const expenseItem = document.createElement("li");
        expenseItem.textContent = `${expense.name}: $${expense.amount.toFixed(2)}`;
        
        // Crear botón de edición
        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.classList.add("edit-button");
        editButton.onclick = () => editExpense(index);

        // Añadir el botón de edición al elemento de gasto
        expenseItem.appendChild(editButton);
        expenseList.appendChild(expenseItem);
    });
}

// Función para cargar el gasto seleccionado en los campos de entrada
function editExpense(index) {
    const expense = expenses[index];
    document.getElementById("expense-name").value = expense.name;
    document.getElementById("expense-amount").value = expense.amount;
    editingIndex = index;
}

// Función para descargar los gastos en un archivo de texto
function downloadExpenses() {
    let expenseText = "Gastos Diarios:\n\n";
    expenses.forEach(expense => {
        expenseText += `${expense.name}: $${expense.amount.toFixed(2)}\n`;
    });
    expenseText += `\nTotal: $${totalAmount.toFixed(2)}`;

    const blob = new Blob([expenseText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "gastos_diarios.txt";
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
