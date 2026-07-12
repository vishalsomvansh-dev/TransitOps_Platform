// Sample data for the application

let vehiclesData = [
    { id: 'V001', plate: 'TRN-001', type: 'Bus', model: 'Volvo B6', year: 2020, capacity: 45, registration: 'REG-001', status: 'active', driver: 'D001' },
    { id: 'V002', plate: 'TRN-002', type: 'Minibus', model: 'Mercedes Sprinter', year: 2021, capacity: 20, registration: 'REG-002', status: 'active', driver: 'D002' },
    { id: 'V003', plate: 'TRN-003', type: 'Bus', model: 'Tata Indica', year: 2019, capacity: 30, registration: 'REG-003', status: 'maintenance', driver: null },
];

let driversData = [
    { id: 'D001', name: 'John Smith', phone: '+91 9876543210', license: 'LIC-001', licenseExp: '2025-12-31', email: 'john@transitops.com', address: 'City Center', status: 'active' },
    { id: 'D002', name: 'Sarah Johnson', phone: '+91 9876543211', license: 'LIC-002', licenseExp: '2025-11-30', email: 'sarah@transitops.com', address: 'Suburbs', status: 'active' },
];

let tripsData = [
    { id: 'T001', vehicle: 'V001', driver: 'D001', from: 'Central Station', to: 'Business District', date: '2024-07-12', time: '08:00', passengers: 35, revenue: 2500, status: 'completed' },
    { id: 'T002', vehicle: 'V002', driver: 'D002', from: 'Airport Terminal', to: 'City Center', date: '2024-07-12', time: '10:30', passengers: 18, revenue: 1800, status: 'active' },
];

let maintenanceData = [
    { id: 'M001', vehicle: 'V003', type: 'Regular Service', date: '2024-07-10', cost: 5000, status: 'in-progress', notes: 'Routine maintenance' },
    { id: 'M002', vehicle: 'V001', type: 'Oil Change', date: '2024-06-15', cost: 1500, status: 'completed', notes: 'Oil and filter changed' },
];

let fuelLogsData = [
    { id: 'F001', vehicle: 'V001', date: '2024-07-12', liters: 50, cost: 4750, mileage: 45000 },
    { id: 'F002', vehicle: 'V002', date: '2024-07-11', liters: 30, cost: 2850, mileage: 32000 },
];

let expensesData = [
    { id: 'E001', date: '2024-07-12', category: 'Fuel', description: 'Fuel refill', amount: 4750, vehicle: 'V001' },
    { id: 'E002', date: '2024-07-12', category: 'Maintenance', description: 'Routine service', amount: 5000, vehicle: 'V003' },
];

// Helper functions
function getVehicleName(vehicleId) {
    const vehicle = vehiclesData.find(v => v.id === vehicleId);
    return vehicle ? vehicle.plate + ' (' + vehicle.type + ')' : 'Unknown';
}

function getDriverName(driverId) {
    if (!driverId) return 'Unassigned';
    const driver = driversData.find(d => d.id === driverId);
    return driver ? driver.name : 'Unknown';
}

function getTotalRevenue() {
    return tripsData.reduce((sum, trip) => sum + trip.revenue, 0);
}

function getTotalFuelCost() {
    return fuelLogsData.reduce((sum, log) => sum + log.cost, 0);
}

function getTotalExpenses() {
    return expensesData.reduce((sum, exp) => sum + exp.amount, 0);
}

function getMaintenanceCount() {
    return maintenanceData.filter(m => m.status !== 'completed').length;
}

function saveToLocalStorage() {
    localStorage.setItem('vehiclesData', JSON.stringify(vehiclesData));
    localStorage.setItem('driversData', JSON.stringify(driversData));
    localStorage.setItem('tripsData', JSON.stringify(tripsData));
    localStorage.setItem('maintenanceData', JSON.stringify(maintenanceData));
    localStorage.setItem('fuelLogsData', JSON.stringify(fuelLogsData));
    localStorage.setItem('expensesData', JSON.stringify(expensesData));
}

function loadFromLocalStorage() {
    const vehicles = localStorage.getItem('vehiclesData');
    const drivers = localStorage.getItem('driversData');
    const trips = localStorage.getItem('tripsData');
    const maintenance = localStorage.getItem('maintenanceData');
    const fuel = localStorage.getItem('fuelLogsData');
    const expenses = localStorage.getItem('expensesData');

    if (vehicles) vehiclesData = JSON.parse(vehicles);
    if (drivers) driversData = JSON.parse(drivers);
    if (trips) tripsData = JSON.parse(trips);
    if (maintenance) maintenanceData = JSON.parse(maintenance);
    if (fuel) fuelLogsData = JSON.parse(fuel);
    if (expenses) expensesData = JSON.parse(expenses);
}

// Store for dynamic data
let appState = {
    totalVehicles: 1250,
    activeVehicles: 847,
    completedRides: 12453,
    avgUtilization: 67.8,
};
