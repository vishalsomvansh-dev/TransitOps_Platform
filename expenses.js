// Drivers page logic

function renderDriversTable() {
    const tbody = document.getElementById('driversTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    driversData.forEach(driver => {
        const vehicle = vehiclesData.find(v => v.driver === driver.id);
        const vehicleName = vehicle ? vehicle.plate : 'Unassigned';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${driver.name}</strong></td>
            <td>${driver.license}</td>
            <td>${driver.phone}</td>
            <td><span class="status-badge status-${driver.status}">${driver.status.toUpperCase()}</span></td>
            <td>${vehicleName}</td>
            <td>
                <button class="btn-action" onclick="editDriver('${driver.id}')">Edit</button>
                <button class="btn-action" onclick="deleteDriver('${driver.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function filterDrivers() {
    const statusFilter = document.getElementById('driverStatusFilter').value;
    const searchInput = document.getElementById('driverSearch').value.toLowerCase();
    
    const tbody = document.getElementById('driversTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    const filtered = driversData.filter(driver => {
        const statusMatch = statusFilter === '' || driver.status === statusFilter;
        const searchMatch = driver.name.toLowerCase().includes(searchInput) || driver.license.toLowerCase().includes(searchInput);
        return statusMatch && searchMatch;
    });
    
    filtered.forEach(driver => {
        const vehicle = vehiclesData.find(v => v.driver === driver.id);
        const vehicleName = vehicle ? vehicle.plate : 'Unassigned';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${driver.name}</strong></td>
            <td>${driver.license}</td>
            <td>${driver.phone}</td>
            <td><span class="status-badge status-${driver.status}">${driver.status.toUpperCase()}</span></td>
            <td>${vehicleName}</td>
            <td>
                <button class="btn-action" onclick="editDriver('${driver.id}')">Edit</button>
                <button class="btn-action" onclick="deleteDriver('${driver.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function submitAddDriver(event) {
    event.preventDefault();
    
    const name = document.getElementById('driverName').value;
    const phone = document.getElementById('driverPhone').value;
    const license = document.getElementById('driverLicense').value;
    const licenseExp = document.getElementById('driverLicenseExp').value;
    const email = document.getElementById('driverEmail').value;
    const address = document.getElementById('driverAddress').value;
    
    const newDriver = {
        id: 'D' + (driversData.length + 1).toString().padStart(3, '0'),
        name: name,
        phone: phone,
        license: license,
        licenseExp: licenseExp,
        email: email,
        address: address,
        status: 'active'
    };
    
    driversData.push(newDriver);
    saveToLocalStorage();
    showNotification('Driver added successfully!', 'success');
    document.getElementById('addDriverForm').reset();
    navigateToPage('drivers');
    renderDriversTable();
}

function editDriver(driverId) {
    alert('Edit functionality coming soon!');
}

function deleteDriver(driverId) {
    if (confirm('Are you sure you want to delete this driver?')) {
        driversData = driversData.filter(d => d.id !== driverId);
        saveToLocalStorage();
        showNotification('Driver deleted!', 'success');
        renderDriversTable();
    }
}

// Export functions
window.renderDriversTable = renderDriversTable;
window.filterDrivers = filterDrivers;
window.submitAddDriver = submitAddDriver;
window.editDriver = editDriver;
window.deleteDriver = deleteDriver;
