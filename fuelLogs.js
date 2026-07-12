// Expenses page logic

function renderExpensesTable() {
    const tbody = document.getElementById('expensesTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    expensesData.forEach(expense => {
        const vehicle = vehiclesData.find(v => v.id === expense.vehicle);
        const vehicleName = vehicle ? vehicle.plate : '-';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.date}</td>
            <td><span class="status-badge status-${expense.category.toLowerCase()}">${expense.category}</span></td>
            <td>${expense.description}</td>
            <td>₹${expense.amount.toLocaleString()}</td>
            <td>${vehicleName}</td>
            <td>
                <button class="btn-action" onclick="deleteExpense('${expense.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function filterExpenses() {
    const categoryFilter = document.getElementById('expenseCategoryFilter').value;
    
    const tbody = document.getElementById('expensesTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    const filtered = categoryFilter === '' ? expensesData : expensesData.filter(e => e.category.toLowerCase() === categoryFilter);
    
    filtered.forEach(expense => {
        const vehicle = vehiclesData.find(v => v.id === expense.vehicle);
        const vehicleName = vehicle ? vehicle.plate : '-';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.date}</td>
            <td><span class="status-badge status-${expense.category.toLowerCase()}">${expense.category}</span></td>
            <td>${expense.description}</td>
            <td>₹${expense.amount.toLocaleString()}</td>
            <td>${vehicleName}</td>
            <td>
                <button class="btn-action" onclick="deleteExpense('${expense.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function submitAddExpense(event) {
    event.preventDefault();
    
    const date = document.getElementById('expenseDate').value;
    const category = document.getElementById('expenseCategory').value;
    const description = document.getElementById('expenseDescription').value;
    const amount = document.getElementById('expenseAmount').value;
    const vehicle = document.getElementById('expenseVehicle').value;
    
    const newExpense = {
        id: 'E' + (expensesData.length + 1).toString().padStart(3, '0'),
        date: date,
        category: category,
        description: description,
        amount: parseFloat(amount),
        vehicle: vehicle || null
    };
    
    expensesData.push(newExpense);
    saveToLocalStorage();
    showNotification('Expense added successfully!', 'success');
    document.getElementById('addExpenseForm').reset();
    navigateToPage('expenses');
    renderExpensesTable();
}

function deleteExpense(expenseId) {
    if (confirm('Are you sure you want to delete this expense?')) {
        expensesData = expensesData.filter(e => e.id !== expenseId);
        saveToLocalStorage();
        showNotification('Expense deleted!', 'success');
        renderExpensesTable();
    }
}

// Export functions
window.renderExpensesTable = renderExpensesTable;
window.filterExpenses = filterExpenses;
window.submitAddExpense = submitAddExpense;
window.deleteExpense = deleteExpense;
