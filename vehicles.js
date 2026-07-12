// Trips page logic

function renderTripsTable() {
    const tbody = document.getElementById('tripsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    tripsData.forEach(trip => {
        const vehicle = vehiclesData.find(v => v.id === trip.vehicle);
        const driver = driversData.find(d => d.id === trip.driver);
        const vehicleName = vehicle ? vehicle.plate : 'Unknown';
        const driverName = driver ? driver.name : 'Unknown';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${trip.id}</td>
            <td>${vehicleName}</td>
            <td>${driverName}</td>
            <td>${trip.from} → ${trip.to}</td>
            <td><span class="status-badge status-${trip.status}">${trip.status.toUpperCase()}</span></td>
            <td>₹${trip.revenue.toLocaleString()}</td>
            <td>
                <button class="btn-action" onclick="updateTripStatus('${trip.id}')">Update</button>
                <button class="btn-action" onclick="deleteTrip('${trip.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function filterTrips() {
    const statusFilter = document.getElementById('tripStatusFilter').value;
    
    const tbody = document.getElementById('tripsTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = '';
    
    const filtered = statusFilter === '' ? tripsData : tripsData.filter(trip => trip.status === statusFilter);
    
    filtered.forEach(trip => {
        const vehicle = vehiclesData.find(v => v.id === trip.vehicle);
        const driver = driversData.find(d => d.id === trip.driver);
        const vehicleName = vehicle ? vehicle.plate : 'Unknown';
        const driverName = driver ? driver.name : 'Unknown';
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${trip.id}</td>
            <td>${vehicleName}</td>
            <td>${driverName}</td>
            <td>${trip.from} → ${trip.to}</td>
            <td><span class="status-badge status-${trip.status}">${trip.status.toUpperCase()}</span></td>
            <td>₹${trip.revenue.toLocaleString()}</td>
            <td>
                <button class="btn-action" onclick="updateTripStatus('${trip.id}')">Update</button>
                <button class="btn-action" onclick="deleteTrip('${trip.id}')">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function submitCreateTrip(event) {
    event.preventDefault();
    
    const vehicle = document.getElementById('tripVehicle').value;
    const driver = document.getElementById('tripDriver').value;
    const from = document.getElementById('tripFrom').value;
    const to = document.getElementById('tripTo').value;
    const date = document.getElementById('tripDate').value;
    const time = document.getElementById('tripTime').value;
    const passengers = document.getElementById('tripPassengers').value;
    const revenue = document.getElementById('tripRevenue').value;
    
    const newTrip = {
        id: 'T' + (tripsData.length + 1).toString().padStart(3, '0'),
        vehicle: vehicle,
        driver: driver,
        from: from,
        to: to,
        date: date,
        time: time,
        passengers: parseInt(passengers),
        revenue: parseFloat(revenue),
        status: 'pending'
    };
    
    tripsData.push(newTrip);
    saveToLocalStorage();
    showNotification('Trip created successfully!', 'success');
    document.getElementById('createTripForm').reset();
    navigateToPage('trips');
    renderTripsTable();
}

function updateTripStatus(tripId) {
    const trip = tripsData.find(t => t.id === tripId);
    if (trip) {
        const statuses = ['pending', 'active', 'completed', 'cancelled'];
        const currentIndex = statuses.indexOf(trip.status);
        const nextStatus = statuses[(currentIndex + 1) % statuses.length];
        trip.status = nextStatus;
        saveToLocalStorage();
        showNotification(`Trip status updated to ${nextStatus.toUpperCase()}!`, 'success');
        renderTripsTable();
    }
}

function deleteTrip(tripId) {
    if (confirm('Are you sure you want to delete this trip?')) {
        tripsData = tripsData.filter(t => t.id !== tripId);
        saveToLocalStorage();
        showNotification('Trip deleted!', 'success');
        renderTripsTable();
    }
}

// Export functions
window.renderTripsTable = renderTripsTable;
window.filterTrips = filterTrips;
window.submitCreateTrip = submitCreateTrip;
window.updateTripStatus = updateTripStatus;
window.deleteTrip = deleteTrip;
