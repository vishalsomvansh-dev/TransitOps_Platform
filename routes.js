// Reports page logic

function generateFleetReport() {
    const totalVehicles = vehiclesData.length;
    const activeVehicles = vehiclesData.filter(v => v.status === 'active').length;
    const idleVehicles = vehiclesData.filter(v => v.status === 'idle').length;
    const maintenanceVehicles = vehiclesData.filter(v => v.status === 'maintenance').length;
    
    const report = `
FLEET REPORT
============
Total Vehicles: ${totalVehicles}
Active: ${activeVehicles}
Idle: ${idleVehicles}
Under Maintenance: ${maintenanceVehicles}
Utilization: ${((activeVehicles / totalVehicles) * 100).toFixed(1)}%
    `;
    
    alert(report);
}

function generateRevenueReport() {
    const totalRevenue = getTotalRevenue();
    const totalTrips = tripsData.length;
    const completedTrips = tripsData.filter(t => t.status === 'completed').length;
    const avgRevenuePerTrip = totalTrips > 0 ? (totalRevenue / totalTrips).toFixed(2) : 0;
    
    const report = `
REVENUE REPORT
==============
Total Revenue: ₹${totalRevenue.toLocaleString()}
Total Trips: ${totalTrips}
Completed Trips: ${completedTrips}
Average Revenue/Trip: ₹${avgRevenuePerTrip}
    `;
    
    alert(report);
}

function generateExpenseReport() {
    const totalExpenses = getTotalExpenses();
    const categories = {};
    
    expensesData.forEach(expense => {
        if (!categories[expense.category]) {
            categories[expense.category] = 0;
        }
        categories[expense.category] += expense.amount;
    });
    
    let report = `
EXPENSE REPORT
==============
Total Expenses: ₹${totalExpenses.toLocaleString()}

Breakdown by Category:
`;
    
    for (const [category, amount] of Object.entries(categories)) {
        report += `${category}: ₹${amount.toLocaleString()}\n`;
    }
    
    alert(report);
}

function generateDriverReport() {
    const totalDrivers = driversData.length;
    const activeDrivers = driversData.filter(d => d.status === 'active').length;
    const tripsPerDriver = {};
    
    driversData.forEach(driver => {
        const trips = tripsData.filter(t => t.driver === driver.id);
        tripsPerDriver[driver.name] = trips.length;
    });
    
    let report = `
DRIVER REPORT
=============
Total Drivers: ${totalDrivers}
Active Drivers: ${activeDrivers}

Trips by Driver:
`;
    
    for (const [driverName, tripCount] of Object.entries(tripsPerDriver)) {
        report += `${driverName}: ${tripCount} trips\n`;
    }
    
    alert(report);
}

function generateMaintenanceReport() {
    const totalRecords = maintenanceData.length;
    const completedRecords = maintenanceData.filter(m => m.status === 'completed').length;
    const pendingRecords = maintenanceData.filter(m => m.status === 'pending').length;
    const totalCost = maintenanceData.reduce((sum, m) => sum + m.cost, 0);
    
    const report = `
MAINTENANCE REPORT
==================
Total Records: ${totalRecords}
Completed: ${completedRecords}
Pending: ${pendingRecords}
In Progress: ${maintenanceData.filter(m => m.status === 'in-progress').length}
Total Cost: ₹${totalCost.toLocaleString()}
Average Cost/Record: ₹${(totalCost / totalRecords).toFixed(2)}
    `;
    
    alert(report);
}

function generateFuelReport() {
    const totalLiters = fuelLogsData.reduce((sum, f) => sum + f.liters, 0);
    const totalCost = getTotalFuelCost();
    const totalMileage = fuelLogsData.reduce((sum, f) => sum + f.mileage, 0);
    const avgEfficiency = (totalMileage / totalLiters).toFixed(2);
    const costPerKm = (totalCost / totalMileage).toFixed(2);
    
    const report = `
FUEL REPORT
===========
Total Liters Consumed: ${totalLiters.toFixed(2)} L
Total Fuel Cost: ₹${totalCost.toLocaleString()}
Total Mileage: ${totalMileage} km
Average Efficiency: ${avgEfficiency} km/L
Cost per KM: ₹${costPerKm}
    `;
    
    alert(report);
}

// Export functions
window.generateFleetReport = generateFleetReport;
window.generateRevenueReport = generateRevenueReport;
window.generateExpenseReport = generateExpenseReport;
window.generateDriverReport = generateDriverReport;
window.generateMaintenanceReport = generateMaintenanceReport;
window.generateFuelReport = generateFuelReport;
