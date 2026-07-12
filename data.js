// Dashboard functionality

function updateDashboardMetrics() {
    const totalVehicles = vehiclesData.length;
    const activeVehicles = vehiclesData.filter(v => v.status === 'active').length;
    const activeTrips = tripsData.filter(t => t.status === 'active').length;
    const totalDrivers = driversData.length;
    const totalRevenue = getTotalRevenue();
    const totalFuel = getTotalFuelCost();
    const totalExpenses = getTotalExpenses();
    const maintenanceCount = getMaintenanceCount();

    document.getElementById('totalVehicles').textContent = totalVehicles;
    document.getElementById('activeVehicles').textContent = activeVehicles;
    document.getElementById('activeTrips').textContent = activeTrips;
    document.getElementById('totalDrivers').textContent = totalDrivers;
    document.getElementById('revenueStat').textContent = '₹' + totalRevenue.toLocaleString();
    document.getElementById('fuelStat').textContent = '₹' + totalFuel.toLocaleString();
    document.getElementById('expenseStat').textContent = '₹' + totalExpenses.toLocaleString();
    document.getElementById('maintenanceStat').textContent = maintenanceCount;
}

// Export functions
window.updateDashboardMetrics = updateDashboardMetrics;
