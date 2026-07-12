// Maintenance page logic

function renderMaintenanceTable() {
    const tbody = document.getElementById('maintenanceTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    maintenanceData.forEach(maintenance => {
        const vehicle = vehiclesData.find(v => v.id === maintenance.vehicle);
        const vehicleName = vehicle ? vehicle.plate : 'Unknown';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${vehicleName}</td>
            <td>${maintenance.type}</td>
            <td>${maintenance.date}</td>
            <td>₹${maintenance.cost.toLocaleString()}</td>
            <td><span class="status-badge status-${maintenance.status}">${maintenance.status.toUpperCase()}</span></td>
            <td>${maintenance.notes || '-'}</td>
            <td>
                <button class="btn-action" onclick="updateMaintenanceStatus('${maintenance.id}')">Update</button>
                <button class="btn-action" onclick="deleteMaintenance('${maintenance.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function filterMaintenance() {
    const statusFilter = document.getElementById('maintenanceStatusFilter').value;
    
    const tbody = document.getElementById('maintenanceTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    const filtered = statusFilter === '' ? maintenanceData : maintenanceData.filter(m => m.status === statusFilter);
    
    filtered.forEach(maintenance => {
        const vehicle = vehiclesData.find(v => v.id === maintenance.vehicle);
        const vehicleName = vehicle ? vehicle.plate : 'Unknown';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${vehicleName}</td>
            <td>${maintenance.type}</td>
            <td>${maintenance.date}</td>
            <td>₹${maintenance.cost.toLocaleString()}</td>
            <td><span class="status-badge status-${maintenance.status}">${maintenance.status.toUpperCase()}</span></td>
            <td>${maintenance.notes || '-'}</td>
            <td>
                <button class="btn-action" onclick="updateMaintenanceStatus('${maintenance.id}')">Update</button>
                <button class="btn-action" onclick="deleteMaintenance('${maintenance.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function submitAddMaintenance(event) {
    event.preventDefault();
    
    const vehicle = document.getElementById('maintenanceVehicle').value;
    const type = document.getElementById('maintenanceType').value;
    const date = document.getElementById('maintenanceDate').value;
    const cost = document.getElementById('maintenanceCost').value;
    const notes = document.getElementById('maintenanceNotes').value;
    
    const newMaintenance = {
        id: 'M' + (maintenanceData.length + 1).toString().padStart(3, '0'),
        vehicle: vehicle,
        type: type,
        date: date,
        cost: parseFloat(cost),
        status: 'pending',
        notes: notes
    };
    
    maintenanceData.push(newMaintenance);
    saveToLocalStorage();
    showNotification('Maintenance record added successfully!', 'success');
    document.getElementById('addMaintenanceForm').reset();
    navigateToPage('maintenance');
    renderMaintenanceTable();
}

function updateMaintenanceStatus(maintenanceId) {
    const maintenance = maintenanceData.find(m => m.id === maintenanceId);
    if (maintenance) {
        const statuses = ['pending', 'in-progress', 'completed'];
        const currentIndex = statuses.indexOf(maintenance.status);
        const nextStatus = statuses[(currentIndex + 1) % statuses.length];
        maintenance.status = nextStatus;
        saveToLocalStorage();
        showNotification(`Maintenance status updated to ${nextStatus.toUpperCase()}!`, 'success');
        renderMaintenanceTable();
    }
}

function deleteMaintenance(maintenanceId) {
    if (confirm('Are you sure you want to delete this maintenance record?')) {
        maintenanceData = maintenanceData.filter(m => m.id !== maintenanceId);
        saveToLocalStorage();
        showNotification('Maintenance record deleted!', 'success');
        renderMaintenanceTable();
    }
}

// Export functions
window.renderMaintenanceTable = renderMaintenanceTable;
window.filterMaintenance = filterMaintenance;
window.submitAddMaintenance = submitAddMaintenance;
window.updateMaintenanceStatus = updateMaintenanceStatus;
window.deleteMaintenance = deleteMaintenance;
