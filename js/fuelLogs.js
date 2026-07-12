// Fuel Logs page logic

function renderFuelLogsTable() {
    const tbody = document.getElementById('fuelLogsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    fuelLogsData.forEach(log => {
        const vehicle = vehiclesData.find(v => v.id === log.vehicle);
        const vehicleName = vehicle ? vehicle.plate : 'Unknown';
        const efficiency = (log.mileage / log.liters).toFixed(2);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${vehicleName}</td>
            <td>${log.date}</td>
            <td>${log.liters} L</td>
            <td>₹${log.cost.toLocaleString()}</td>
            <td>${log.mileage} km</td>
            <td>${efficiency} km/L</td>
            <td>
                <button class="btn-action" onclick="deleteFuelLog('${log.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function submitAddFuelLog(event) {
    event.preventDefault();
    
    const vehicle = document.getElementById('fuelVehicle').value;
    const date = document.getElementById('fuelDate').value;
    const liters = document.getElementById('fuelLiters').value;
    const cost = document.getElementById('fuelCost').value;
    const mileage = document.getElementById('fuelMileage').value;
    
    const newFuelLog = {
        id: 'F' + (fuelLogsData.length + 1).toString().padStart(3, '0'),
        vehicle: vehicle,
        date: date,
        liters: parseFloat(liters),
        cost: parseFloat(cost),
        mileage: parseInt(mileage)
    };
    
    fuelLogsData.push(newFuelLog);
    saveToLocalStorage();
    showNotification('Fuel log added successfully!', 'success');
    document.getElementById('addFuelLogForm').reset();
    navigateToPage('fuelLogs');
    renderFuelLogsTable();
}

function deleteFuelLog(fuelLogId) {
    if (confirm('Are you sure you want to delete this fuel log?')) {
        fuelLogsData = fuelLogsData.filter(f => f.id !== fuelLogId);
        saveToLocalStorage();
        showNotification('Fuel log deleted!', 'success');
        renderFuelLogsTable();
    }
}

// Export functions
window.renderFuelLogsTable = renderFuelLogsTable;
window.submitAddFuelLog = submitAddFuelLog;
window.deleteFuelLog = deleteFuelLog;
