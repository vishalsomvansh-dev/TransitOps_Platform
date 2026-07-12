// Vehicles page logic

function renderVehiclesTable() {
    const tbody = document.getElementById('vehiclesTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    vehiclesData.forEach(vehicle => {
        const driverName = getDriverName(vehicle.driver);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${vehicle.plate}</strong></td>
            <td>${vehicle.type}</td>
            <td>${vehicle.model}</td>
            <td><span class="status-badge status-${vehicle.status}">${vehicle.status.toUpperCase()}</span></td>
            <td>${driverName}</td>
            <td>
                <button class="btn-action" onclick="editVehicle('${vehicle.id}')">Edit</button>
                <button class="btn-action" onclick="deleteVehicle('${vehicle.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function filterVehicles() {
    const statusFilter = document.getElementById('vehicleStatusFilter').value;
    const searchInput = document.getElementById('vehicleSearch').value.toLowerCase();
    
    const tbody = document.getElementById('vehiclesTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    const filtered = vehiclesData.filter(vehicle => {
        const statusMatch = statusFilter === '' || vehicle.status === statusFilter;
        const searchMatch = vehicle.plate.toLowerCase().includes(searchInput);
        return statusMatch && searchMatch;
    });
    
    filtered.forEach(vehicle => {
        const driverName = getDriverName(vehicle.driver);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${vehicle.plate}</strong></td>
            <td>${vehicle.type}</td>
            <td>${vehicle.model}</td>
            <td><span class="status-badge status-${vehicle.status}">${vehicle.status.toUpperCase()}</span></td>
            <td>${driverName}</td>
            <td>
                <button class="btn-action" onclick="editVehicle('${vehicle.id}')">Edit</button>
                <button class="btn-action" onclick="deleteVehicle('${vehicle.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function submitAddVehicle(event) {
    event.preventDefault();
    
    const plate = document.getElementById('vehiclePlate').value;
    const type = document.getElementById('vehicleType').value;
    const model = document.getElementById('vehicleModel').value;
    const year = document.getElementById('vehicleYear').value;
    const capacity = document.getElementById('vehicleCapacity').value;
    const registration = document.getElementById('vehicleReg').value;
    
    const newVehicle = {
        id: 'V' + (vehiclesData.length + 1).toString().padStart(3, '0'),
        plate: plate,
        type: type,
        model: model,
        year: parseInt(year),
        capacity: parseInt(capacity),
        registration: registration,
        status: 'idle',
        driver: null
    };
    
    vehiclesData.push(newVehicle);
    saveToLocalStorage();
    showNotification('Vehicle added successfully!', 'success');
    document.getElementById('addVehicleForm').reset();
    navigateToPage('vehicles');
    renderVehiclesTable();
}

function editVehicle(vehicleId) {
    alert('Edit functionality coming soon!');
}

function deleteVehicle(vehicleId) {
    if (confirm('Are you sure you want to delete this vehicle?')) {
        vehiclesData = vehiclesData.filter(v => v.id !== vehicleId);
        saveToLocalStorage();
        showNotification('Vehicle deleted!', 'success');
        renderVehiclesTable();
    }
}

// Export functions
window.renderVehiclesTable = renderVehiclesTable;
window.filterVehicles = filterVehicles;
window.submitAddVehicle = submitAddVehicle;
window.editVehicle = editVehicle;
window.deleteVehicle = deleteVehicle;
